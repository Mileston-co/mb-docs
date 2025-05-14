---
sidebar_position: 2
---

# Components Documentation

This document provides an in-depth overview of the React components available in the Mileston Payment Client SDK. **Note:** All components require the `MilestonPaymentProvider` to provide `apikey (checkout api key)` and `businessid` via context.

## PayButton

A React component for initiating payments. This component provides a customizable button that opens a popup for processing payments.

### Usage

```typescript
import { MilestonPaymentProvider, PayButton } from "mileston-payment-client";

function App() {
  return (
    <MilestonPaymentProvider
      apikey="your-api-key"
      businessid="your-business-id"
    >
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
    </MilestonPaymentProvider>
  );
}
```

### Props

- `onPaymentComplete` (function): Callback triggered when the payment is complete.
- `onPaymentDataReceived` (function): Callback triggered when payment data is received.
- `onPaymentError` (function): Callback triggered when payment fails.
- `paymentUrl` (string): URL of the payment page.
- `style` (object): Custom styles for the button.

### Notes

- Ensure the `MilestonPaymentProvider` wraps your component tree to provide the necessary context.
- Customize the button's appearance using the `style` prop.

---

## SubscriptionCheckout

A React component for subscription-based payments. This component simplifies the process of setting up recurring payments.

### Usage

```typescript
import {
  MilestonPaymentProvider,
  SubscriptionCheckout,
} from "mileston-payment-client";

<MilestonPaymentProvider apikey="your-api-key" businessid="your-business-id">
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
    onWalletConnectPaymentError={(error) =>
      console.error("Payment Error", error)
    }
  />
</MilestonPaymentProvider>;
```

### Props

- `businessName` (string): Name of the business.
- `businessLogo` (string): URL of the business logo.
- `plan` (object): Subscription plan details.
  - `name` (string): Plan name.
  - `description` (string): Plan description.
  - `amount` (number): Subscription amount.
  - `currency` (string): Currency code (e.g., USD).
  - `interval` (string): Billing interval (e.g., daily, monthly).
  - `intervalCount` (number): Number of intervals (e.g., every 2 months).
- `onWalletConnectPaymentComplete` (function): Callback for successful Wallet Connect payments.
- `onWalletConnectPaymentError` (function): Callback for Wallet Connect payment errors.

### Notes

- Use this component to streamline subscription management.
- Customize the subscription plan details using the `plan` prop.

---

## InvoiceCheckout

A React component for invoice-based payments. This component is ideal for handling one-time payments.

### Usage

```typescript
import {
  MilestonPaymentProvider,
  InvoiceCheckout,
} from "mileston-payment-client";

<MilestonPaymentProvider apikey="your-api-key" businessid="your-business-id">
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
  />
</MilestonPaymentProvider>;
```

### Props

- `businessName` (string): Name of the business.
- `businessLogo` (string): URL of the business logo.
- `description` (string): Invoice description.
- `amount` (number): Invoice amount.
- `recipientWalletAddress` (string): Wallet address of the recipient.
- `onQrCodePaymentComplete` (function): Callback for successful QR Code payments.
- `onQrCodePaymentError` (function): Callback for QR Code payment errors.

### Notes

- Use this component for one-time payments such as invoices.
- Ensure the `recipientWalletAddress` is valid to avoid payment failures.

---

## PaymentLinkCheckout

A React component for payment link-based payments. This component is useful for generating payment links for customers.

### Usage

```typescript
import {
  MilestonPaymentProvider,
  PaymentLinkCheckout,
} from "mileston-payment-client";

<MilestonPaymentProvider apikey="your-api-key" businessid="your-business-id">
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
  />
</MilestonPaymentProvider>;
```

### Props

- `businessName` (string): Name of the business.
- `businessLogo` (string): URL of the business logo.
- `bannerImage` (string): URL of the banner image for the payment page.
- `title` (string): Title of the payment request.
- `description` (string): Description of the payment request.
- `amount` (number): Payment amount.
- `recipientWalletAddress` (string): Wallet address of the recipient.
- `onCardPaymentComplete` (function): Callback for successful Card payments.
- `onCardPaymentError` (function): Callback for Card payment errors.

### Notes

- Use this component to generate payment links for customers.
- Customize the payment page appearance using the `bannerImage` and `title` props.
