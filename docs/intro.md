---
sidebar_position: 1
---

# 🚀 Quick Start

Welcome to **Mileston Payments Integration**! 🎉 We’re thrilled to have you onboard! Integrating Mileston Payments is simple, fun, and opens your app to the world of crypto payments. Let’s dive in and create your **first crypto payment link** in just a few steps!

---

## 🌟 Create Your First Crypto Payment Link

### 📝 Step 1: Create an Account

Head over to [**business.mileston.co**](https://business.mileston.co) and sign up for your Mileston Business account.

This will give you access to our powerful dashboard where all the magic happens. ✨

---

### 🔑 Step 2: Get Your API Key

Navigate to the **Developers** tab in the dashboard to generate your **API key**. You’ll find three types of keys:

- **Test API Key** (for testnet, no real money involved):  
  `Mileston_TEST_hshshs7y373djdsdj...`
- **Live API Key** (for mainnet, real monetary value):  
  `Mileston_LIVE_773hsiakakgddh...`

⚠️ **Pro Tip:**

- Use the **Test API Key** for testing purposes in your development environment.
- Use the **Live API Key** for production environments to process real payments.

---

### 🛠️ Step 3: Install the Backend SDK

Install our backend SDK to start creating payment links like a pro. Here's how:

```bash
npm install mileston-payments
```

Then, write some magic code like this:

```javascript
import { PaymentLink } from "mileston-payments";

const apiKey = "your-api-key"; // Your API key
const businessId = "your-business-id"; // Your business ID

// Initialize PaymentLink, Invoice, or RecurringPayment as needed
const paymentLink = new PaymentLink(apiKey, businessId);

// Generate a payment link
const link = await paymentLink.create({
  amount: 100, // Amount in your preferred currency
  currency: "USD",
  description: "Crypto Payment Example",
});
console.log("Payment link created:", link);
```

🔍 **Where to find your `businessId`?**  
You can grab your Business ID from the dropdown menu under your business logo in the dashboard.

---

### ✨ Step 4: Use the Payment Link in Your Frontend

Now that you’ve created a payment link, let’s add it to your frontend!

You can either:

1. Build your own custom button, or
2. Use our **mileston-payment-client SDK** for seamless integration.

First, install the client SDK:

```bash
npm install mileston-payment-client
```

Then, use our prebuilt payment button:

```jsx
import { PayButton } from "mileston-payment-client";

const App = () => (
  <PayButton
    paymentUrl="https://checkout.mileston.co/payment"
    onPaymentComplete={() => console.log("Payment complete!")}
    onPaymentDataReceived={(data) =>
      console.log("Payment data received:", data)
    }
    onPaymentError={(error) => console.error("Payment error:", error)}
    style={{ backgroundColor: "green", color: "white" }}
  >
    Pay Now
  </PayButton>
);
```

👀 **Why use the `PayButton`?**  
It handles everything: payment, verification, and an awesome user experience. You just sit back and sip coffee. ☕

---

### 🛡️ Step 5: Keep API Keys Safe

**Important:** Always use the backend SDK for API keys. Never expose your keys in the frontend, or you’ll have a bad time.

---

## 📂 GitHub Repos

Check out our SDKs for more details and examples:

- [**mileston-payments (Backend SDK)**](https://github.com/Mileston-co/mileston-payments)
- [**mileston-payment-client (Frontend SDK)**](https://github.com/Mileston-co/mileston-payment-client)

---

🎉 **Congrats!**  
You’ve just created your first crypto payment link with Mileston Payments! High five! 🙌

---

## Real-World Use Cases

### Use Case 1: Subscription Management

**Scenario**: A SaaS company wants to automate monthly subscription payments for its users.

**Code Example**:

```javascript
import { SubscriptionCheckout } from "mileston-payment-client";

<SubscriptionCheckout
  businessName="SaaS Pro"
  businessLogo="https://example.com/logo.png"
  plan={{
    name: "Pro Plan",
    description: "Access all premium features",
    amount: 29.99,
    currency: "USD",
    interval: "monthly",
    intervalCount: 1,
  }}
  onWalletConnectPaymentComplete={(networkId, tokenId) =>
    console.log("Payment Complete", networkId, tokenId)
  }
  onWalletConnectPaymentError={(error) => console.error("Payment Error", error)}
  paymentLinkId="subscription-link-id"
  env="test"
/>;
```

### Use Case 2: Invoice Generation

**Scenario**: A freelancer needs to send invoices to clients for completed projects.

**Code Example**:

```javascript
import { InvoiceCheckout } from "mileston-payment-client";

<InvoiceCheckout
  businessName="Freelance Studio"
  businessLogo="https://example.com/logo.png"
  description="Invoice #4567 for Web Design Project"
  amount={500}
  recipientWalletAddress="0x123456789abcdef"
  onQrCodePaymentComplete={() => console.log("QR Code Payment Complete")}
  onQrCodePaymentError={(error) =>
    console.error("QR Code Payment Error", error)
  }
  paymentLinkId="invoice-id"
  env="test"
/>;
```

### Use Case 3: Payment Link Integration

**Scenario**: An e-commerce store wants to provide a seamless checkout experience.

**Code Example**:

```javascript
import { PaymentLinkCheckout } from "mileston-payment-client";

<PaymentLinkCheckout
  businessName="E-Shop"
  businessLogo="https://example.com/logo.png"
  bannerImage="https://example.com/banner.png"
  title="Order Payment"
  description="Pay for your order"
  amount={150}
  recipientWalletAddress="0x123456789abcdef"
  onCardPaymentComplete={() => console.log("Card Payment Complete")}
  onCardPaymentError={(error) => console.error("Card Payment Error", error)}
  paymentLinkId="order-payment-link"
  env="test"
/>;
```

---

## Need Help?

If you need assistance, join our Discord community: [https://discord.gg/JT3BhUCy](https://discord.gg/JT3BhUCy)
