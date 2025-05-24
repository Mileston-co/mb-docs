---
sidebar_position: 2
---

# Components Documentation

This document provides an in-depth overview of the React components available in the Mileston Payment Client SDK. **Note:** All components require the `MilestonPaymentProvider` to provide `apikey (checkout api key)` and `businessid` via context.

---

## MilestonPaymentProvider

A React context provider for managing API key and business ID. This provider is required to wrap your component tree to provide the necessary context for other components in the SDK.

### Usage

```typescript
import { MilestonPaymentProvider } from "mileston-payment-client";

function App() {
  return (
    <MilestonPaymentProvider
      apikey="your-api-key"
      businessid="your-business-id"
    >
      {/* Your application components */}
    </MilestonPaymentProvider>
  );
}
```

### Props

| Prop Name    | Type      | Description                                         |
| ------------ | --------- | --------------------------------------------------- |
| `apikey`     | string    | Your API key for authentication.                    |
| `businessid` | string    | Your business ID for identifying your business.     |
| `children`   | ReactNode | The child components that will consume the context. |

### Notes

- Ensure this provider wraps your entire application or the components that require access to the `apikey` and `businessid`.
- This provider is required for components like `PayButton`, `InvoiceCheckout`, `SubscriptionCheckout`, etc.

---

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
        onPaymentError={(error) => console.error("Payment error:", error)}
        paymentUrl="https://checkout.mileston.co/payment"
        paymentId="payment-id"
        paymentType="invoice"
        theme="light"
        style={{ backgroundColor: "green", color: "white" }}
        className="custom-class"
      >
        Pay Now
      </PayButton>
    </MilestonPaymentProvider>
  );
}
```

### Props

| Prop Name           | Type      | Description                                                     |
| ------------------- | --------- | --------------------------------------------------------------- |
| `onPaymentComplete` | function  | Callback triggered when the payment is complete.                |
| `onPaymentError`    | function  | Callback triggered when payment fails.                          |
| `paymentUrl`        | string    | URL of the payment page.                                        |
| `paymentId`         | string    | ID of the payment (e.g., invoice, payment link).                |
| `paymentType`       | string    | Type of payment (e.g., "invoice", "payment-link", "recurring"). |
| `theme`             | string    | Theme for the payment popup (e.g., "light", "dark").            |
| `style`             | object    | Custom styles for the button.                                   |
| `className`         | string    | CSS class for the button.                                       |
| `children`          | ReactNode | The content to display inside the button (e.g., "Pay Now").     |

### Notes

- Ensure the `MilestonPaymentProvider` wraps your component tree to provide the necessary context.
- Customize the button's appearance using the `style` and `className` props.
- The `theme` prop allows you to set the visual theme for the payment popup.

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
    walletConnectButtonText="Subscribe with Wallet"
    qrCodeButtonText="Generate Subscription QR"
    cardButtonText="Subscribe with Card"
    buttonClassName="custom-button-class"
    dialogTitle="Card Subscription"
    dialogDescription="Set up your recurring payment using the secure form"
    className="custom-class"
    footerText="Thank you for subscribing!"
    cancelText="You can cancel your subscription at any time"
    paymentLinkId="subscription123"
    env="test"
    onWalletConnectPaymentComplete={() =>
      console.log("Wallet subscription payment complete")
    }
    onWalletConnectPaymentError={(error) =>
      console.error("Wallet subscription payment error:", error)
    }
    onQrCodePaymentComplete={() =>
      console.log("QR Code subscription payment complete")
    }
    onQrCodePaymentError={(error) =>
      console.error("QR Code subscription payment error:", error)
    }
    onCardPaymentComplete={() =>
      console.log("Card subscription payment complete")
    }
    onCardPaymentError={(error) =>
      console.error("Card subscription payment error:", error)
    }
    amount={19.99}
    recipientWalletAddress="0x123456789abcdef"
  />
</MilestonPaymentProvider>;
```

### Props

| Prop Name                        | Type     | Description                                                                  |
| -------------------------------- | -------- | ---------------------------------------------------------------------------- |
| `businessName`                   | string   | Name of the business.                                                        |
| `businessLogo`                   | string   | URL of the business logo.                                                    |
| `plan`                           | object   | Subscription plan details.                                                   |
| `plan.name`                      | string   | Plan name.                                                                   |
| `plan.description`               | string   | Plan description.                                                            |
| `plan.amount`                    | number   | Subscription amount.                                                         |
| `plan.currency`                  | string   | Currency code (e.g., USD, EUR).                                              |
| `plan.interval`                  | string   | Billing interval (e.g., daily, weekly, monthly, yearly).                     |
| `plan.intervalCount`             | number   | Number of intervals between billings (e.g., 1 for monthly, 3 for quarterly). |
| `walletConnectButtonText`        | string   | Text for the Wallet Connect button.                                          |
| `qrCodeButtonText`               | string   | Text for the QR Code button.                                                 |
| `cardButtonText`                 | string   | Text for the Card button.                                                    |
| `buttonClassName`                | string   | CSS class for styling buttons.                                               |
| `dialogTitle`                    | string   | Title for the card payment dialog.                                           |
| `dialogDescription`              | string   | Description for the card payment dialog.                                     |
| `className`                      | string   | CSS class for the main component.                                            |
| `footerText`                     | string   | Footer text for the component.                                               |
| `cancelText`                     | string   | Text for the cancel subscription message.                                    |
| `paymentLinkId`                  | string   | ID of the payment link.                                                      |
| `env`                            | string   | Environment (e.g., test, production).                                        |
| `onWalletConnectPaymentComplete` | function | Callback for successful Wallet Connect payments.                             |
| `onWalletConnectPaymentError`    | function | Callback for Wallet Connect payment errors.                                  |
| `onQrCodePaymentComplete`        | function | Callback for successful QR Code payments.                                    |
| `onQrCodePaymentError`           | function | Callback for QR Code payment errors.                                         |
| `onCardPaymentComplete`          | function | Callback for successful Card payments.                                       |
| `onCardPaymentError`             | function | Callback for Card payment errors.                                            |
| `amount`                         | number   | Subscription amount.                                                         |
| `recipientWalletAddress`         | string   | Wallet address of the recipient.                                             |

### Notes

- Use this component to streamline subscription management.
- Customize the subscription plan details using the `plan` prop.
- Ensure the `recipientWalletAddress` is valid to avoid payment failures.
- The `cancelText` prop allows you to display a message about subscription cancellation.

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
    currency="USD"
    description="Invoice #12345"
    walletConnectButtonText="Connect Wallet & Pay"
    qrCodeButtonText="Generate Payment QR"
    cardButtonText="Pay with Card"
    buttonClassName="custom-button-class"
    dialogTitle="Pay Invoice"
    dialogDescription="Complete your payment securely"
    className="custom-class"
    footerText="Thank you for your business!"
    paymentLinkId="invoice123"
    env="test"
    onWalletConnectPaymentComplete={() =>
      console.log("Wallet payment complete")
    }
    onWalletConnectPaymentError={(error) =>
      console.error("Wallet payment error:", error)
    }
    onQrCodePaymentComplete={() => console.log("QR Code payment complete")}
    onQrCodePaymentError={(error) =>
      console.error("QR Code payment error:", error)
    }
    onCardPaymentComplete={() => console.log("Card payment complete")}
    onCardPaymentError={(error) => console.error("Card payment error:", error)}
    amount={200}
    recipientWalletAddress="0x123456789abcdef"
  />
</MilestonPaymentProvider>;
```

### Props

| Prop Name                        | Type     | Description                                      |
| -------------------------------- | -------- | ------------------------------------------------ |
| `businessName`                   | string   | Name of the business.                            |
| `businessLogo`                   | string   | URL of the business logo.                        |
| `currency`                       | string   | Currency code (e.g., USD).                       |
| `description`                    | string   | Invoice description.                             |
| `walletConnectButtonText`        | string   | Text for the Wallet Connect button.              |
| `qrCodeButtonText`               | string   | Text for the QR Code button.                     |
| `cardButtonText`                 | string   | Text for the Card button.                        |
| `buttonClassName`                | string   | CSS class for styling buttons.                   |
| `dialogTitle`                    | string   | Title for the card payment dialog.               |
| `dialogDescription`              | string   | Description for the card payment dialog.         |
| `className`                      | string   | CSS class for the main component.                |
| `footerText`                     | string   | Footer text for the component.                   |
| `paymentLinkId`                  | string   | ID of the payment link.                          |
| `env`                            | string   | Environment (e.g., test, production).            |
| `onWalletConnectPaymentComplete` | function | Callback for successful Wallet Connect payments. |
| `onWalletConnectPaymentError`    | function | Callback for Wallet Connect payment errors.      |
| `onQrCodePaymentComplete`        | function | Callback for successful QR Code payments.        |
| `onQrCodePaymentError`           | function | Callback for QR Code payment errors.             |
| `onCardPaymentComplete`          | function | Callback for successful Card payments.           |
| `onCardPaymentError`             | function | Callback for Card payment errors.                |
| `amount`                         | number   | Invoice amount.                                  |
| `recipientWalletAddress`         | string   | Wallet address of the recipient.                 |

### Notes

- Use this component for one-time payments such as invoices.
- Ensure the `recipientWalletAddress` is valid to avoid payment failures.
- Customize the appearance and behavior using the provided props.

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
    currency="USD"
    description="Pay for your order"
    walletConnectButtonText="Connect Wallet & Pay"
    qrCodeButtonText="Generate Payment QR"
    cardButtonText="Pay with Card"
    buttonClassName="custom-button-class"
    dialogTitle="Pay Securely"
    dialogDescription="Complete your payment using the secure form"
    className="custom-class"
    footerText="Thank you for your payment!"
    paymentLinkId="payment123"
    env="test"
    onWalletConnectPaymentComplete={() =>
      console.log("Wallet payment complete")
    }
    onWalletConnectPaymentError={(error) =>
      console.error("Wallet payment error:", error)
    }
    onQrCodePaymentComplete={() => console.log("QR Code payment complete")}
    onQrCodePaymentError={(error) =>
      console.error("QR Code payment error:", error)
    }
    onCardPaymentComplete={() => console.log("Card payment complete")}
    onCardPaymentError={(error) => console.error("Card payment error:", error)}
    amount={100}
    recipientWalletAddress="0x123456789abcdef"
  />
</MilestonPaymentProvider>;
```

### Props

| Prop Name                        | Type     | Description                                      |
| -------------------------------- | -------- | ------------------------------------------------ |
| `businessName`                   | string   | Name of the business.                            |
| `businessLogo`                   | string   | URL of the business logo.                        |
| `bannerImage`                    | string   | URL of the banner image for the payment page.    |
| `title`                          | string   | Title of the payment request.                    |
| `currency`                       | string   | Currency code (e.g., USD).                       |
| `description`                    | string   | Description of the payment request.              |
| `walletConnectButtonText`        | string   | Text for the Wallet Connect button.              |
| `qrCodeButtonText`               | string   | Text for the QR Code button.                     |
| `cardButtonText`                 | string   | Text for the Card button.                        |
| `buttonClassName`                | string   | CSS class for styling buttons.                   |
| `dialogTitle`                    | string   | Title for the card payment dialog.               |
| `dialogDescription`              | string   | Description for the card payment dialog.         |
| `className`                      | string   | CSS class for the main component.                |
| `footerText`                     | string   | Footer text for the component.                   |
| `paymentLinkId`                  | string   | ID of the payment link.                          |
| `env`                            | string   | Environment (e.g., test, production).            |
| `onWalletConnectPaymentComplete` | function | Callback for successful Wallet Connect payments. |
| `onWalletConnectPaymentError`    | function | Callback for Wallet Connect payment errors.      |
| `onQrCodePaymentComplete`        | function | Callback for successful QR Code payments.        |
| `onQrCodePaymentError`           | function | Callback for QR Code payment errors.             |
| `onCardPaymentComplete`          | function | Callback for successful Card payments.           |
| `onCardPaymentError`             | function | Callback for Card payment errors.                |
| `amount`                         | number   | Payment amount.                                  |
| `recipientWalletAddress`         | string   | Wallet address of the recipient.                 |

### Notes

- Use this component to generate payment links for customers.
- Customize the payment page appearance using the `bannerImage` and `title` props.
- Ensure the `recipientWalletAddress` is valid to avoid payment failures.

---

## PaymentOptions

A React component for displaying available payment options. This component provides tabs for Wallet Connect, QR Code, and Card payment methods.

### Usage

```typescript
import { PaymentOptions } from "mileston-payment-client";

function App() {
  return (
    <PaymentOptions
      walletConnectButtonText="Connect Wallet & Pay"
      qrCodeButtonText="Generate Payment QR"
      cardButtonText="Pay with Card"
      buttonClassName="custom-button-class"
      dialogTitle="Pay Securely"
      dialogDescription="Complete your payment using the secure form"
      defaultTab="wallet"
      onTabChange={(tab) => console.log("Selected Tab:", tab)}
      onWalletConnectPaymentComplete={(networkId, tokenId) =>
        console.log("Wallet payment complete:", networkId, tokenId)
      }
      onWalletConnectPaymentError={(error) =>
        console.error("Wallet payment error:", error)
      }
      onQrCodePaymentComplete={(networkId, tokenId) =>
        console.log("QR Code payment complete:", networkId, tokenId)
      }
      onQrCodePaymentError={(error) =>
        console.error("QR Code payment error:", error)
      }
      onCardPaymentComplete={() => console.log("Card payment complete")}
      onCardPaymentError={(error) =>
        console.error("Card payment error:", error)
      }
      amount={100}
      env="test"
      recipientWalletAddress="0x123456789abcdef"
      paymentType="invoice"
      paymentLinkId="payment123"
    />
  );
}
```

### Props

| Prop Name                        | Type     | Description                                                     |
| -------------------------------- | -------- | --------------------------------------------------------------- |
| `walletConnectButtonText`        | string   | Text for the Wallet Connect button.                             |
| `qrCodeButtonText`               | string   | Text for the QR Code button.                                    |
| `cardButtonText`                 | string   | Text for the Card button.                                       |
| `buttonClassName`                | string   | CSS class for styling buttons.                                  |
| `dialogTitle`                    | string   | Title for the card payment dialog.                              |
| `dialogDescription`              | string   | Description for the card payment dialog.                        |
| `defaultTab`                     | string   | The default selected tab (e.g., "wallet", "qrcode", "card").    |
| `onTabChange`                    | function | Callback triggered when the selected tab changes.               |
| `onWalletConnectPaymentComplete` | function | Callback for successful Wallet Connect payments.                |
| `onWalletConnectPaymentError`    | function | Callback for Wallet Connect payment errors.                     |
| `onQrCodePaymentComplete`        | function | Callback for successful QR Code payments.                       |
| `onQrCodePaymentError`           | function | Callback for QR Code payment errors.                            |
| `onCardPaymentComplete`          | function | Callback for successful Card payments.                          |
| `onCardPaymentError`             | function | Callback for Card payment errors.                               |
| `amount`                         | number   | Payment amount.                                                 |
| `env`                            | string   | Environment (e.g., test, production).                           |
| `recipientWalletAddress`         | string   | Wallet address of the recipient.                                |
| `paymentType`                    | string   | Type of payment (e.g., "invoice", "payment-link", "recurring"). |
| `paymentLinkId`                  | string   | ID of the payment link.                                         |

### Notes

- Use this component to provide multiple payment options to users.
- Customize the appearance of the buttons using the `buttonClassName` prop.
- The `defaultTab` prop allows you to set the initial selected payment method.
- Ensure the `recipientWalletAddress` is valid to avoid payment failures.

---

## SuiWalletProvider

A React context provider for integrating Sui blockchain wallets. This provider sets up the necessary configurations for connecting to Sui networks and managing wallet connections.

### Usage

```typescript
import SuiWalletProvider from "mileston-payment-client";

function App() {
  return (
    <SuiWalletProvider>{/* Your application components */}</SuiWalletProvider>
  );
}
```

### Props

| Prop Name  | Type      | Description                                                |
| ---------- | --------- | ---------------------------------------------------------- |
| `children` | ReactNode | The child components that will consume the wallet context. |

### Notes

- The default network is set to `testnet`, but it also supports `mainnet`.

### Features

- **Network Configuration**: Configures Sui networks (`testnet` and `mainnet`) using `createNetworkConfig`.
- **Auto Connection**: Automatically connects to the wallet when the provider is initialized.
- **Query Management**: Uses `QueryClientProvider` for managing queries and caching.

---

## WalletConnectPayment

A React component for handling payments via WalletConnect. It supports multiple blockchain networks and tokens.

### Usage

```typescript
import { WalletConnectPayment } from "mileston-payment-client";

function App() {
  return (
    <WalletConnectPayment
      onPaymentComplete={(networkId, tokenId) =>
        console.log("Payment complete:", networkId, tokenId)
      }
      onPaymentError={(error) => console.error("Payment error:", error)}
      buttonText="Connect Wallet & Pay"
      buttonClassName="custom-class"
      recipientWalletAddress={{
        eth: "0x123456789abcdef",
        sui: "sui-address",
        solana: "solana-address",
      }}
      amount={100}
      paymentLinkId="payment123"
      env="test"
      paymentType="invoice"
      userUUID="user-uuid"
    />
  );
}
```

### Props

| Prop Name                | Type     | Description                                 |
| ------------------------ | -------- | ------------------------------------------- |
| `onPaymentComplete`      | function | Callback for successful payments.           |
| `onPaymentError`         | function | Callback for payment errors.                |
| `buttonText`             | string   | Text for the payment button.                |
| `buttonClassName`        | string   | CSS class for styling the button.           |
| `recipientWalletAddress` | object   | Wallet addresses for different blockchains. |
| `amount`                 | number   | Payment amount.                             |
| `paymentLinkId`          | string   | ID of the payment link.                     |
| `env`                    | string   | Environment (e.g., test, production).       |
| `paymentType`            | string   | Type of payment (e.g., invoice, recurring). |
| `userUUID`               | string   | User UUID for tracking payments.            |

### Notes

- Supports multiple blockchain networks like Ethereum, Sui, and Solana.
- Automatically handles wallet connections and payment processing.

---

## QrCodePayment

A React component for generating and verifying QR code-based payments.

### Usage

```typescript
import { QrCodePayment } from "mileston-payment-client";

function App() {
  return (
    <QrCodePayment
      onPaymentComplete={(networkId, tokenId) =>
        console.log("Payment complete:", networkId, tokenId)
      }
      onPaymentError={(error) => console.error("Payment error:", error)}
      buttonText="Generate Payment QR"
      buttonClassName="custom-class"
      recipientWalletAddress={{
        eth: "0x123456789abcdef",
        sui: "sui-address",
        solana: "solana-address",
      }}
      amount={100}
      paymentLinkId="payment123"
      env="test"
      paymentType="invoice"
      userUUID="user-uuid"
    />
  );
}
```

### Props

| Prop Name                | Type     | Description                                 |
| ------------------------ | -------- | ------------------------------------------- |
| `onPaymentComplete`      | function | Callback for successful payments.           |
| `onPaymentError`         | function | Callback for payment errors.                |
| `buttonText`             | string   | Text for the QR code generation button.     |
| `buttonClassName`        | string   | CSS class for styling the button.           |
| `recipientWalletAddress` | object   | Wallet addresses for different blockchains. |
| `amount`                 | number   | Payment amount.                             |
| `paymentLinkId`          | string   | ID of the payment link.                     |
| `env`                    | string   | Environment (e.g., test, production).       |
| `paymentType`            | string   | Type of payment (e.g., invoice, recurring). |
| `userUUID`               | string   | User UUID for tracking payments.            |

### Notes

- Generates a QR code for payment and verifies the transaction via polling.
- Supports multiple blockchain networks and tokens.

---

## CardPayment

A React component for handling card-based payments. It integrates with onramp services to process payments.

### Usage

```typescript
import { CardPayment } from "mileston-payment-client";

function App() {
  return (
    <CardPayment
      onPaymentComplete={() => console.log("Payment complete")}
      onPaymentError={(error) => console.error("Payment error:", error)}
      buttonText="Pay with Card"
      buttonClassName="custom-class"
      recipientWalletAddress={{
        eth: "0x123456789abcdef",
        sui: "sui-address",
        solana: "solana-address",
      }}
      amount={100}
      paymentLinkId="payment123"
      env="test"
      paymentType="invoice"
      userUUID="user-uuid"
    />
  );
}
```

### Props

| Prop Name                | Type     | Description                                 |
| ------------------------ | -------- | ------------------------------------------- |
| `onPaymentComplete`      | function | Callback for successful payments.           |
| `onPaymentError`         | function | Callback for payment errors.                |
| `buttonText`             | string   | Text for the payment button.                |
| `buttonClassName`        | string   | CSS class for styling the button.           |
| `recipientWalletAddress` | object   | Wallet addresses for different blockchains. |
| `amount`                 | number   | Payment amount.                             |
| `paymentLinkId`          | string   | ID of the payment link.                     |
| `env`                    | string   | Environment (e.g., test, production).       |
| `paymentType`            | string   | Type of payment (e.g., invoice, recurring). |
| `userUUID`               | string   | User UUID for tracking payments.            |

### Notes

- Opens a popup for processing card payments via onramp services.
- Tracks the payment status and updates the UI accordingly.

---

## SolanaWalletProvider

A React context provider for integrating Solana blockchain wallets. This provider sets up the necessary configurations for connecting to Solana networks and managing wallet connections.

### Usage

```typescript
import SolanaWalletProvider from "mileston-payment-client";

function App() {
  return (
    <SolanaWalletProvider env="test">
      {/* Your application components */}
    </SolanaWalletProvider>
  );
}
```

### Props

| Prop Name  | Type      | Description                                                |
| ---------- | --------- | ---------------------------------------------------------- |
| `children` | ReactNode | The child components that will consume the wallet context. |
| `env`      | string    | The environment (e.g., "test", "prod").                    |

### Notes

- The `env` prop determines whether the provider connects to the mainnet or devnet.

### Features

- **Network Configuration**: Configures Solana networks (`mainnet` and `devnet`) using `clusterApiUrl`.
- **Auto Connection**: Automatically connects to the wallet when the provider is initialized.
- **Wallet Modal**: Provides a wallet modal for selecting and connecting wallets.

---
