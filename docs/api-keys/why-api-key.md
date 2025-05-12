---
sidebar_position: 1
---

# Why Use API Keys?

**API Keys** are essential for integrating with Mileston's APIs. They play a crucial role in enabling secure and efficient communication between your application and our services. Here's why we use API keys:

- **Programmatically Create Payments**: API keys allow your application to create payment links, invoices, and recurring payments programmatically, making your workflows seamless and automated.
- **Business Authorization**: Each API key is unique to your business, ensuring that only authorized applications can interact with your account.
- **Enhanced Security**: API keys provide a secure way to authenticate requests, protecting sensitive data and ensuring only verified calls are processed.
- **Simplified Integration**: With API keys, there’s no need for complex authentication mechanisms. It’s straightforward to use across various platforms.

### Combine API Keys with Your Business ID

Alongside your API key, you’ll also need your **Business ID** to authorize API requests. Your Business ID can be found in the dropdown menu beside your business logo in the dashboard.

Once you have your API key and Business ID, you're all set to use our APIs! 🚀

---

### Types of API Keys

Mileston provides two types of API keys, each designed for specific use cases:

1. **Normal API Key**:

   - Used in backend integrations.
   - Enables secure operations like creating payment links, invoices, and recurring payments.
   - Must be stored securely in your backend environment.
   - **Format**:
     - Test: `Mileston_TEST_abcdefgh1234567890...`
     - Live: `Mileston_LIVE_abcdefgh1234567890...`

2. **Checkout API Key**:
   - Used in frontend integrations.
   - Enables secure payment initiation and status retrieval in client-side SDKs like `mileston-payment-client`.
   - Designed with limited scope to ensure security in frontend environments.
   - **Format**:
     - Test: `Mileston_TEST_CHECKOUTKEY_abcdefgh1234567890`
     - Live: `Mileston_LIVE_CHECKOUTKEY_abcdefgh1234567890`

---

### How to Get Your API Keys

To access your API keys:

1. Go to the dashboard at [business.mileston.co](https://business.mileston.co).
2. Navigate to the **Developers** tab.
3. You’ll find the following keys:
   - **Normal API Key**: For backend operations.
   - **Checkout API Key**: For frontend integrations.

---

### Checkout API Key: What and Why?

The **Checkout API Key** is a specialized API key designed for use in client-side applications. It enables secure interactions with the Mileston API for payment initiation and status retrieval.

#### Key Features:

- **Limited Scope**: Restricted to specific actions like initiating payments and fetching payment statuses, ensuring no sensitive backend operations can be performed.
- **Frontend-Friendly**: Designed to be safely used in client-side SDKs like `mileston-payment-client`.
- **Ease of Use**: Simplifies integration by allowing direct use in the frontend.

#### Security Considerations:

- Always pair the Checkout API Key with HTTPS to ensure secure communication.
- Avoid hardcoding the key directly in your codebase. Use environment variables or secure build tools to inject it during deployment.

---

### Want to Learn More About Mileston?

Visit our [website](https://mileston.co) to explore all the amazing tools and features we offer.
