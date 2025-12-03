# Telco Churn Prediction – Frontend

## Overview

This repository contains the **frontend for the Telco Churn Prediction system**, providing a web interface for users to input customer data and receive churn predictions from the backend API.  

The frontend is a **static website** hosted on **AWS S3** and served via **CloudFront**. It communicates with the backend **AWS Lambda API** to fetch churn predictions.

---

## Features

- **User-friendly interface** for entering customer information  
- Sections for **demographics, account info, services, and contract/billing**  
- **Form validation** to ensure all required fields are filled  
- Sends **POST requests** to the backend API endpoint for churn prediction  
- Displays results with **prediction label** and **churn probability**  
- Allows users to **predict multiple customers** without reloading the page  
- Includes a **persistent banner** linking to project architecture or documentation  

---

## Tech Stack

- **HTML5, CSS3, JavaScript**  
- Static site hosted on **AWS S3**  
- Served via **AWS CloudFront CDN**  
- Communicates with backend **AWS Lambda API**  

---

## Architecture Diagram

![AWS Architecture](https://github.com/AlFrancis-Dagaang/churn-prediction-frontend/blob/main/telco-churn-architecture.drawio.png?raw=true)  

---

## Pages / Sections

### Welcome Page

- Hero section with project title and description  
- Buttons to **Get Started** (navigate to form) or **Learn More** (scroll to banner)  
- Shows **AWS architecture diagram**  

### How It Works Section

- Explains the steps of the prediction process:
  1. Input Data  
  2. Model Analysis  
  3. View Results  

### Form Page

- Form sections:
  - **Demographics:** Gender, Senior Citizen, Partner, Dependents  
  - **Account Information:** Tenure, Monthly Charges, Total Charges  
  - **Services:** Phone, Internet, Tech Support, Streaming, etc.  
  - **Contract & Billing:** Contract type, Paperless billing, Payment method  
- Validates input before sending request  
- Submits **JSON payload** to backend API  

### Result Page

- Displays **prediction result**:
  - Churn Probability  
  - Prediction Label (`CHURN` / `NO CHURN`)  
- Option to **predict another customer**  

---


