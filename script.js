const pages = {
  welcome: document.getElementById("welcome-page"),
  form: document.getElementById("form-page"),
  result: document.getElementById("result-page"),
};

const form = document.getElementById("churn-form");
let currentPage = "welcome";

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  showPage("welcome");
  form.addEventListener("submit", handleFormSubmit);
});

function navigateTo(pageName) {
  if (pages[pageName]) {
    showPage(pageName);
    window.scrollTo(0, 0);
  }
}

function showPage(pageName) {
  Object.values(pages).forEach((page) => page.classList.remove("active"));
  if (pages[pageName]) {
    pages[pageName].classList.add("active");
    currentPage = pageName;
  }
}

function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

function setLoading(isLoading) {
  const submitButton = form.querySelector('button[type="submit"]');
  if (isLoading) {
    submitButton.disabled = true;
    submitButton.textContent = "Predicting...";
  } else {
    submitButton.disabled = false;
    submitButton.textContent = "Predict Churn";
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();

  // Validate form
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  setLoading(true);

  // Collect form data
  const formData = new FormData(form);
  const customerData = Object.fromEntries(formData.entries());

  // Convert string values to appropriate types
  const payload = {
    gender: customerData.gender,
    SeniorCitizen: Number.parseInt(customerData.senior_citizen),
    Partner: customerData.partner,
    Dependents: customerData.dependents,
    tenure: Number.parseInt(customerData.tenure),
    PhoneService: customerData.phone_service,
    MultipleLines: customerData.multiple_lines,
    InternetService: customerData.internet_service,
    OnlineSecurity: customerData.online_security,
    OnlineBackup: customerData.online_backup,
    DeviceProtection: customerData.device_protection,
    TechSupport: customerData.tech_support,
    StreamingTV: customerData.streaming_tv,
    StreamingMovies: customerData.streaming_movies,
    Contract: customerData.contract,
    PaperlessBilling: customerData.paperless_billing,
    PaymentMethod: customerData.payment_method,
    MonthlyCharges: Number.parseFloat(customerData.monthly_charges),
    TotalCharges: Number.parseFloat(customerData.total_charges),
  };

  console.log("[v1] Sending prediction request:", payload);

  try {
    // Replace with your actual API endpoint
    const response = await fetch(
      "https://y90ssj4kx1.execute-api.us-east-1.amazonaws.com/prod/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    console.log("[v1] Prediction response:", result);

    displayResult(result);
    navigateTo("result");
  } catch (error) {
    console.error("[v1] Error:", error);
    alert("Failed to get prediction from API. Please try again later.");
  } finally {
    setLoading(false);
  }
}

function displayResult(result) {
  const resultContent = document.getElementById("prediction-result");
  const isChurn = result.prediction === "CHURN";
  const probability = result.churn_probability ?? 0;

  const churnClass = isChurn ? "churn" : "no-churn";
  const predictionText = isChurn ? "CHURN" : "NO CHURN";
  const probabilityText = `${(probability * 100).toFixed(2)}%`; // show at least 2 decimals

  resultContent.innerHTML = `
        <div class="prediction-item ${churnClass}">
            <div class="prediction-label">Churn Probability</div>
            <div class="prediction-value">${probabilityText}</div>
        </div>
        <div class="prediction-item ${churnClass}">
            <div class="prediction-label">Prediction</div>
            <div class="prediction-value">${predictionText}</div>
        </div>
    `;
}

function resetAndNavigate() {
  form.reset();
  navigateTo("form");
}
