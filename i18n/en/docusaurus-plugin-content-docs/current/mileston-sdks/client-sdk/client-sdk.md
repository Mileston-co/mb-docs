---
sidebar_position: 1
---

# 🛠️ Mileston Payment Client SDK

Welcome to the **Mileston Payment JavaScript/TypeScript Client SDK** docs! Whether you're a JavaScript guru or a framework fanatic, this SDK is here to make crypto payments a breeze. Let's jump in and start building something awesome! 🚀

---

## 📂 SDK Structure

The Mileston Client SDK is divided into the following sections:

- **Components**: React components for seamless integration.
- **Hooks**: React hooks for real-time data fetching.
- **Functions**: Core utility functions for payment operations.

Refer to the respective documentation for detailed usage.

---

## 📦 Installation

Get started by installing the SDK in your project. Open your terminal and run:

```bash
npm install mileston-payment-client
```

Or, if you're using Yarn:

```bash
yarn add mileston-payment-client
```

---

## ⚙️ Core Class (Vanilla JavaScript)

For those using plain JavaScript, the SDK provides the `MilestonPayButton` class for direct integration.

### Example

```javascript
import { MilestonPayButton } from "mileston-payment-client";

const container = document.getElementById("payment-button-container");

const payButton = new MilestonPayButton(container, {
  buttonText: "Pay Now",
  onPaymentComplete: () => {
    console.log("Payment complete!");
  },
  onPaymentDataReceived: (data) => {
    console.log("Payment data received:", data);
  },
  onPaymentError: (error) => {
    console.error("Payment error:", error);
  },
  paymentUrl: "https://example.com/payment",
});

// Optional: Update button text or styles later
payButton.updateButtonText("Checkout");
payButton.updateButtonStyle({ backgroundColor: "blue", color: "white" });
```

---

## ⚛️ React Integration

The SDK offers a dedicated React component for smooth integration.

### Example

```jsx
import React from "react";
import { PayButton } from "mileston-payment-client";

function App() {
  return (
    <div>
      <PayButton
        onPaymentComplete={() => console.log("Payment complete!")}
        onPaymentDataReceived={(data) =>
          console.log("Payment data received:", data)
        }
        onPaymentError={(error) => console.error("Payment error:", error)}
        paymentUrl="https://checkout.mileston.co/payment"
        style={{ backgroundColor: "green", color: "white" }}
      >
        Pay Now
      </PayButton>
    </div>
  );
}

export default App;
```

---

## Angular Integration

For Angular projects, you can use the `MilestonPayButton` class directly.

### Example

```typescript
import { Component } from "@angular/core";
import { MilestonPayButton } from "mileston-payment-client";

@Component({
  selector: "app-root",
  template: `<div id="payment-button-container"></div>`,
})
export class AppComponent {
  ngOnInit() {
    const container = document.getElementById("payment-button-container");

    const payButton = new MilestonPayButton(container, {
      buttonText: "Pay Now",
      onPaymentComplete: () => {
        console.log("Payment complete!");
      },
      onPaymentDataReceived: (data) => {
        console.log("Payment data received:", data);
      },
      onPaymentError: (error) => {
        console.error("Payment error:", error);
      },
      paymentUrl: "https://example.com/payment",
    });
  }
}
```

---

## Vue Integration

Vue developers can integrate using the `MilestonPayButton` class.

### Example

```vue
<template>
  <div id="payment-button-container"></div>
</template>

<script>
import { MilestonPayButton } from "mileston-payment-client";

export default {
  name: "App",
  mounted() {
    const container = this.$el.querySelector("#payment-button-container");

    const payButton = new MilestonPayButton(container, {
      buttonText: "Pay Now",
      onPaymentComplete: () => {
        console.log("Payment complete!");
      },
      onPaymentDataReceived: (data) => {
        console.log("Payment data received:", data);
      },
      onPaymentError: (error) => {
        console.error("Payment error:", error);
      },
      paymentUrl: "https://example.com/payment",
    });
  },
};
</script>
```

---

## Component Highlight

### Wrap Your Application with the Payment Provider

Use the `MilestonPaymentProvider` to provide global payment-related data (e.g., API key, business ID) to your application. The `apikey` passed to the provider should be the **Checkout API Key**.

```javascript
import { MilestonPaymentProvider } from "mileston-payment-client";

function App() {
  return (
    <MilestonPaymentProvider
      apikey="your-api-key" // Use your Checkout API Key here
      businessid="your-business-id"
    >
      <YourComponent />
    </MilestonPaymentProvider>
  );
}
```

---

## Components Overview

### Subscription Checkout

```javascript
import { SubscriptionCheckout } from "mileston-payment-client";

<SubscriptionCheckout
  businessName="My Business"
  businessLogo="https://example.com/logo.png"
  plan={{
    name: "Premium Plan",
    description: "Access all premium features",
    amount: 19.99,
    currency: "USD",
    interval: "monthly",
    intervalCount: 1,
  }}
  onWalletConnectPaymentComplete={(networkId, tokenId) =>
    console.log("Payment Complete", networkId, tokenId)
  }
  onWalletConnectPaymentError={(error) => console.error("Payment Error", error)}
  amount={19.99}
  recipientWalletAddress="0x123456789abcdef"
/>;
```

---

### Invoice Checkout

```javascript
import { InvoiceCheckout } from "mileston-payment-client";

<InvoiceCheckout
  businessName="My Business"
  businessLogo="https://example.com/logo.png"
  description="Invoice #12345"
  amount={200}
  recipientWalletAddress="0x123456789abcdef"
  onQrCodePaymentComplete={() => console.log("QR Code Payment Complete")}
  onQrCodePaymentError={(error) =>
    console.error("QR Code Payment Error", error)
  }
/>;
```

---

### Payment Link Checkout

```javascript
import { PaymentLinkCheckout } from "mileston-payment-client";

<PaymentLinkCheckout
  businessName="My Business"
  businessLogo="https://example.com/logo.png"
  bannerImage="https://example.com/banner.png"
  title="Payment Request"
  description="Pay for your order"
  amount={100}
  recipientWalletAddress="0x123456789abcdef"
  onCardPaymentComplete={() => console.log("Card Payment Complete")}
  onCardPaymentError={(error) => console.error("Card Payment Error", error)}
/>;
```

---

## 🛠️ Configuration Options

The SDK is highly customizable! Here's a list of options and props you can use for various components:

### MilestonPayButton

| **Option**              | **Type**                                                | **Required** | **Description**                                         |
| ----------------------- | ------------------------------------------------------- | ------------ | ------------------------------------------------------- |
| `container`             | `HTMLElement`                                           | Yes          | The DOM element to attach the button to (Core only).    |
| `buttonText`            | `string`                                                | Yes          | Text displayed on the button.                           |
| `onPaymentComplete`     | `() => void`                                            | Yes          | Callback triggered when the payment is complete.        |
| `onPaymentDataReceived` | `(data: { walletAddress: string, id: string }) => void` | Yes          | Callback triggered when payment data is received.       |
| `onPaymentError`        | `(error: Error) => void`                                | Yes          | Callback triggered when payment fails.                  |
| `paymentUrl`            | `string`                                                | No           | URL of the payment page.                                |
| `paymentType`           | `"payment-link" \| "invoice" \| "recurring-payment"`    | No           | Type of payment (used to auto-generate `paymentUrl`).   |
| `paymentId`             | `string`                                                | No           | ID of the payment (used to auto-generate `paymentUrl`). |
| `buttonStyle`           | `Partial<CSSStyleDeclaration>`                          | No           | Custom styles for the button.                           |

### SubscriptionCheckout

| **Prop**                         | **Type**                                       | **Required** | **Description**                                  |
| -------------------------------- | ---------------------------------------------- | ------------ | ------------------------------------------------ |
| `businessName`                   | `string`                                       | Yes          | Name of the business.                            |
| `businessLogo`                   | `string`                                       | Yes          | URL of the business logo.                        |
| `plan`                           | `object`                                       | Yes          | Subscription plan details.                       |
| `plan.name`                      | `string`                                       | Yes          | Plan name.                                       |
| `plan.description`               | `string`                                       | Yes          | Plan description.                                |
| `plan.amount`                    | `number`                                       | Yes          | Subscription amount.                             |
| `plan.currency`                  | `string`                                       | Yes          | Currency code (e.g., USD).                       |
| `plan.interval`                  | `string`                                       | Yes          | Billing interval (e.g., daily, monthly).         |
| `plan.intervalCount`             | `number`                                       | Yes          | Number of intervals (e.g., every 2 months).      |
| `onWalletConnectPaymentComplete` | `(networkId: string, tokenId: string) => void` | No           | Callback for successful Wallet Connect payments. |
| `onWalletConnectPaymentError`    | `(error: Error) => void`                       | No           | Callback for Wallet Connect payment errors.      |
| `onQrCodePaymentComplete`        | `() => void`                                   | No           | Callback for successful QR Code payments.        |
| `onQrCodePaymentError`           | `(error: Error) => void`                       | No           | Callback for QR Code payment errors.             |
| `onCardPaymentComplete`          | `() => void`                                   | No           | Callback for successful Card payments.           |
| `onCardPaymentError`             | `(error: Error) => void`                       | No           | Callback for Card payment errors.                |
| `amount`                         | `number`                                       | Yes          | Subscription amount.                             |
| `recipientWalletAddress`         | `string`                                       | Yes          | Wallet address of the recipient.                 |
| `paymentLinkId`                  | `string`                                       | Yes          | ID of the payment link.                          |

---

### InvoiceCheckout

| **Prop**                  | **Type**                 | **Required** | **Description**                           |
| ------------------------- | ------------------------ | ------------ | ----------------------------------------- |
| `businessName`            | `string`                 | Yes          | Name of the business.                     |
| `businessLogo`            | `string`                 | Yes          | URL of the business logo.                 |
| `description`             | `string`                 | Yes          | Invoice description.                      |
| `amount`                  | `number`                 | Yes          | Invoice amount.                           |
| `recipientWalletAddress`  | `string`                 | Yes          | Wallet address of the recipient.          |
| `onQrCodePaymentComplete` | `() => void`             | No           | Callback for successful QR Code payments. |
| `onQrCodePaymentError`    | `(error: Error) => void` | No           | Callback for QR Code payment errors.      |
| `onCardPaymentComplete`   | `() => void`             | No           | Callback for successful Card payments.    |
| `onCardPaymentError`      | `(error: Error) => void` | No           | Callback for Card payment errors.         |
| `paymentLinkId`           | `string`                 | Yes          | ID of the invoice payment link.           |

---

### PaymentLinkCheckout

| **Prop**                         | **Type**                                       | **Required** | **Description**                                  |
| -------------------------------- | ---------------------------------------------- | ------------ | ------------------------------------------------ |
| `businessName`                   | `string`                                       | Yes          | Name of the business.                            |
| `businessLogo`                   | `string`                                       | Yes          | URL of the business logo.                        |
| `bannerImage`                    | `string`                                       | No           | URL of the banner image for the payment page.    |
| `title`                          | `string`                                       | Yes          | Title of the payment request.                    |
| `description`                    | `string`                                       | Yes          | Description of the payment request.              |
| `amount`                         | `number`                                       | Yes          | Payment amount.                                  |
| `recipientWalletAddress`         | `string`                                       | Yes          | Wallet address of the recipient.                 |
| `onWalletConnectPaymentComplete` | `(networkId: string, tokenId: string) => void` | No           | Callback for successful Wallet Connect payments. |
| `onWalletConnectPaymentError`    | `(error: Error) => void`                       | No           | Callback for Wallet Connect payment errors.      |
| `onQrCodePaymentComplete`        | `() => void`                                   | No           | Callback for successful QR Code payments.        |
| `onQrCodePaymentError`           | `(error: Error) => void`                       | No           | Callback for QR Code payment errors.             |
| `onCardPaymentComplete`          | `() => void`                                   | No           | Callback for successful Card payments.           |
| `onCardPaymentError`             | `(error: Error) => void`                       | No           | Callback for Card payment errors.                |
| `paymentLinkId`                  | `string`                                       | Yes          | ID of the payment link.                          |

---

### Error Handling

Always provide error callbacks for checkout components (`onWalletConnectPaymentError`, `onQrCodePaymentError`, `onCardPaymentError`) to handle payment failures gracefully. This ensures a better user experience and allows you to debug issues effectively.

---

### Integration with Backend SDK

Combine the Client SDK with the Backend SDK for a complete payment solution.

---

## 🛡️ Common Issues

### TypeScript Errors

Make sure your `tsconfig.json` includes:

```json
{
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### JSX Error

If you encounter JSX errors, ensure your `tsconfig.json` has:

```json
{
  "jsx": "react-jsx"
}
```

---

🎉 And that's it, folks! You're now ready to integrate the **Mileston Payment Client SDK** like a pro. Got questions? Reach out, and let's keep building amazing things! ✨

## Wrapping Up

And there you have it! With the **Mileston Payment Client SDK**, integrating crypto payments into your app is a walk in the park. If you have any questions or run into issues, don't hesitate to reach out. Happy coding, and may your coffee mugs sell like hotcakes! ☕🛍️

---

_Note: For more detailed information and refs, check out the [Mileston Payment Client SDK GitHub Repository](https://github.com/Mileston-co/mileston-payment-client). Plus, the SDK is open sourced feel free to open a PR!_
