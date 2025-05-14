# Functions Documentation

This document provides an in-depth overview of the core functions available in the Mileston Payment Client SDK. Each function is designed to handle specific tasks related to payments, user management, and wallet operations.

## fetchPayment

Fetches payment details from the server. This function is versatile and supports fetching details for invoices, payment links, and recurring payments.

### Usage

```typescript
import { fetchPayment } from "mileston-payment-client";

const paymentDetails = await fetchPayment({
  apikey: "your-api-key", // Use your Checkout API Key here
  businessid: "your-business-id",
  paymentId: "payment-id",
  paymentType: "invoice", // or "payment-link", "recurring"
});
console.log(paymentDetails);
```

### Parameters

- `options` (object): The options for fetching payment details.
  - `apikey` (string): Your API key. This is required for authentication.
  - `businessid` (string): Your business ID. This identifies your business in the system.
  - `paymentId` (string): The ID of the payment to fetch. This is unique for each payment.
  - `paymentType` (string): The type of payment. Supported values are:
    - `"invoice"`: For invoice payments.
    - `"payment-link"`: For payment link-based payments.
    - `"recurring"`: For recurring payments.

### Returns

- A promise that resolves to the payment details. The structure of the response depends on the `paymentType`.

### Notes

- Ensure that the `apikey` and `businessid` are valid; otherwise, the request will fail.
- Handle errors gracefully by wrapping the function call in a `try-catch` block.

---

## getUserDetails

Fetches user details from the server. This function is useful for retrieving information about a specific user associated with your business.

### Usage

```typescript
import { getUserDetails } from "mileston-payment-client";

const userDetails = await getUserDetails("your-api-key", "business-id");
console.log(userDetails);
```

### Parameters

- `apikey` (string): Your API key. This is required for authentication.
- `businessId` (string): The business ID to include in the headers. This is mandatory.

### Returns

- A promise that resolves to the user details. The response includes user-specific information such as name, email, and roles.

### Notes

- This function throws an error if the `apikey` or `businessId` is missing.
- Use this function to verify user information before initiating sensitive operations.

---

## MilestonPayButton

A class for creating and managing payment buttons. This class provides a customizable button that integrates seamlessly with the Mileston Payment system.

### Usage

```typescript
import { MilestonPayButton } from "mileston-payment-client";

const container = document.getElementById("payment-button-container");
const payButton = new MilestonPayButton(container, {
  buttonText: "Pay Now",
  onPaymentComplete: () => console.log("Payment complete!"),
  onPaymentError: (error) => console.error("Payment error:", error),
});
```

### Methods

- `updateButtonText(text: string): void`: Updates the button's text. Use this to dynamically change the button label.
- `updateButtonStyle(styles: Partial<CSSStyleDeclaration>): void`: Updates the button's styles. This allows for custom styling.
- `destroy(): void`: Removes the button from the DOM and cleans up event listeners.

### Notes

- The `onPaymentComplete` and `onPaymentError` callbacks are critical for handling payment events.
- Ensure the container element exists in the DOM before initializing the button.

---

## getOnRampData

Fetches onramp data for payments. This function is used to retrieve information required for initiating onramp transactions.

### Usage

```typescript
import { getOnRampData } from "mileston-payment-client";

const data = await getOnRampData(
  {
    amount: "100",
    recipientWalletAddress: "0xRecipientAddress",
    chain: "eth",
  },
  "your-api-key",
  "your-business-id"
);
console.log(data);
```

### Parameters

- `params` (object): The parameters for fetching onramp data.
  - `amount` (string): The amount for the onramp.
  - `recipientWalletAddress` (string): The recipient's wallet address.
  - `chain` (string): The blockchain network (e.g., "eth").
- `apikey` (string): Your API key.
- `businessid` (string): Your business ID.

### Returns

- A promise that resolves to the onramp data. The response includes details such as payment links and transaction metadata.

### Notes

- This function is essential for integrating onramp services into your application.
- Validate the `params` object to ensure all required fields are provided.

---

## getPaymentWallet

Manages wallet-related payment operations. This function retrieves information about a specific wallet type.

### Usage

```typescript
import { getPaymentWallet } from "mileston-payment-client";

const walletData = await getPaymentWallet({
  apikey: "your-api-key",
  businessid: "your-business-id",
  walletType: "", //wallet type
});
console.log(walletData);
```

### Parameters

- `params` (object): The parameters for fetching wallet data.
  - `apikey` (string): Your API key.
  - `businessid` (string): Your business ID.
  - `walletType` (string): The type of wallet.

### Returns

- A promise that resolves to the wallet data. The response includes wallet-specific details such as balance and transaction history.

### Notes

- Use this function to verify wallet information before initiating transactions.
- Handle errors gracefully to provide a better user experience.

---

## savePayment

Saves payment details to the server. This function is used to store payment information for future reference or processing.

### Usage

```typescript
import { savePayment } from "mileston-payment-client";

const response = await savePayment({
  apikey: "your-api-key",
  businessid: "your-business-id",
  type: "invoice", // or "payment-link", "recurring"
  body: {
    /* payment details */
  },
  nativeTokens: "optional-native-tokens",
});
console.log(response);
```

### Parameters

- `options` (object): The options for saving payment details.
  - `apikey` (string): Your API key.
  - `businessid` (string): Your business ID.
  - `type` (string): The type of payment (e.g., "invoice", "payment-link", "recurring").
  - `body` (object): The payment details.
  - `nativeTokens` (string, optional): Native tokens for the payment.

### Returns

- A promise that resolves to the server response. The response includes a confirmation of the saved payment.

### Notes

- Ensure the `body` object contains all required fields for the payment type.
- This function is critical for storing payment data securely.
