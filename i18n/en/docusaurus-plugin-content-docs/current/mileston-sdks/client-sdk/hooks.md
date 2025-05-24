# Hooks Documentation

This document provides an in-depth overview of the hooks available in the Mileston Payment Client SDK. **Note:** All hooks require the `MilestonPaymentProvider` to provide `apikey (checkout api key)` and `businessid` via context.

---

## Example: Using the Provider with Hooks

To use any of the hooks in this SDK, you must wrap your application or component tree with the `MilestonPaymentProvider`. Here's an example:

```typescript
import React from "react";
import {
  MilestonPaymentProvider,
  useFetchPayment,
} from "mileston-payment-client";

function PaymentDetails() {
  const { data, error, isLoading } = useFetchPayment({
    paymentId: "12345",
    paymentType: "invoice",
  });

  if (isLoading) return <p>Loading payment details...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Payment Details</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default function App() {
  return (
    <MilestonPaymentProvider
      apikey="your-api-key"
      businessid="your-business-id"
    >
      <PaymentDetails />
    </MilestonPaymentProvider>
  );
}
```

---

## useFetchPayment

Fetches payment details using a React hook. This hook is ideal for retrieving payment information in real-time.

### Usage

```typescript
import { useFetchPayment } from "mileston-payment-client";

const { data, error, isLoading } = useFetchPayment({
  paymentId: "payment-id",
  paymentType: "invoice", // or "payment-link", "recurring"
});
```

### Parameters

| Parameter Name | Type   | Description                                                         |
| -------------- | ------ | ------------------------------------------------------------------- |
| `paymentId`    | string | The ID of the payment to fetch.                                     |
| `paymentType`  | string | The type of payment (e.g., "invoice", "payment-link", "recurring"). |

### Returns

| Return Name | Type    | Description                                            |
| ----------- | ------- | ------------------------------------------------------ |
| `data`      | object  | The fetched payment details.                           |
| `error`     | object  | Any error that occurred during the fetch.              |
| `isLoading` | boolean | A boolean indicating whether the fetch is in progress. |

### Notes

- Ensure the `MilestonPaymentProvider` wraps your component tree to provide the necessary context.
- Handle errors gracefully to improve user experience.

---

## useGetOnRampData

Fetches onramp data for payments. This hook is useful for integrating onramp services into your application.

### Usage

```typescript
import { useGetOnRampData } from "mileston-payment-client";

const { fetchOnRampData, data, error, loading } = useGetOnRampData();

await fetchOnRampData({
  amount: "100",
  recipientWalletAddress: "0xRecipientAddress",
  chain: "eth", // or "avax", "base", "pol", "arb"
});
```

### Parameters

| Parameter Name           | Type   | Description                           |
| ------------------------ | ------ | ------------------------------------- |
| `amount`                 | string | The amount for the onramp.            |
| `recipientWalletAddress` | string | The recipient's wallet address.       |
| `chain`                  | string | The blockchain network (e.g., "eth"). |

### Returns

| Return Name       | Type                         | Description                                            |
| ----------------- | ---------------------------- | ------------------------------------------------------ |
| `fetchOnRampData` | function                     | A function to fetch onramp data.                       |
| `data`            | `OnRampLinkResponse \| null` | The fetched onramp data.                               |
| `error`           | `string \| null`             | Any error that occurred during the fetch.              |
| `loading`         | boolean                      | A boolean indicating whether the fetch is in progress. |

### Notes

- This hook depends on the `MilestonPaymentProvider` for context, which provides `apikey` and `businessid`.
- Validate the `params` object to ensure all required fields are provided.
- Handle errors gracefully to improve user experience.

---

## useGetOnRampPaymentStatus

Fetches the status of an onramp payment. This hook is essential for tracking payment progress.

### Usage

```typescript
import { useGetOnRampPaymentStatus } from "mileston-payment-client";

const { fetchOnRampPaymentStatus, data, error, loading } =
  useGetOnRampPaymentStatus();

await fetchOnRampPaymentStatus({
  id: "payment-id",
  amount: "100",
  chain: "eth", // or "avax", "base", "pol", "arb"
  recipientWalletAddress: "0xRecipientAddress",
});
```

### Parameters

| Parameter Name           | Type   | Description                           |
| ------------------------ | ------ | ------------------------------------- |
| `id`                     | string | The ID of the payment.                |
| `amount`                 | string | The amount for the payment.           |
| `chain`                  | string | The blockchain network (e.g., "eth"). |
| `recipientWalletAddress` | string | The recipient's wallet address.       |

### Returns

| Return Name                | Type                                  | Description                                            |
| -------------------------- | ------------------------------------- | ------------------------------------------------------ |
| `fetchOnRampPaymentStatus` | function                              | A function to fetch the onramp payment status.         |
| `data`                     | `OnRampPaymentStatusResponse \| null` | The fetched payment status data.                       |
| `error`                    | `string \| null`                      | Any error that occurred during the fetch.              |
| `loading`                  | boolean                               | A boolean indicating whether the fetch is in progress. |

### Notes

- This hook depends on the `MilestonPaymentProvider` for context, which provides `apikey` and `businessid`.
- Use this hook to provide real-time updates to users.
- Handle errors gracefully to improve user experience.

---

## useUserDetails

Fetches user details using a React hook. This hook is useful for retrieving user-specific information.

### Usage

```typescript
import { useUserDetails } from "mileston-payment-client";

const { data, loading, error } = useUserDetails("business-id");
```

### Parameters

| Parameter Name   | Type   | Description                                            |
| ---------------- | ------ | ------------------------------------------------------ |
| `pathBusinessId` | string | The business ID to include in the URL path (optional). |

### Returns

| Return Name | Type               | Description                                            |
| ----------- | ------------------ | ------------------------------------------------------ |
| `data`      | `IGetUser \| null` | The fetched user details.                              |
| `loading`   | boolean            | A boolean indicating whether the fetch is in progress. |
| `error`     | `Error \| null`    | Any error that occurred during the fetch.              |

### Notes

- This hook depends on the `MilestonPaymentProvider` for context, which provides `apikey` and `businessid`.
- Use this hook to verify user information before initiating sensitive operations.
- Handle errors gracefully to improve user experience.

---

## usePayment

Handles payment operations using a React hook. This hook simplifies the process of initiating payments.

### Usage

```typescript
import { usePayment } from "mileston-payment-client";

const { initiatePayment, error, isProcessing } = usePayment();

await initiatePayment({
  type: "invoice", // or "payment-link", "recurring"
  body: {
    /* payment details */
  },
  nativeTokens: "optional-native-tokens",
});
```

### Parameters

| Parameter Name | Type   | Description                                                         |
| -------------- | ------ | ------------------------------------------------------------------- |
| `type`         | string | The type of payment (e.g., "invoice", "payment-link", "recurring"). |
| `body`         | object | The payment details.                                                |
| `nativeTokens` | string | Native tokens for the payment (e.g., AVAX, POL, ETH). (optional).   |

### Returns

| Return Name       | Type     | Description                                              |
| ----------------- | -------- | -------------------------------------------------------- |
| `initiatePayment` | function | A function to start the payment process.                 |
| `error`           | object   | Any error that occurred during the payment process.      |
| `isProcessing`    | boolean  | A boolean indicating whether the payment is in progress. |

### Notes

- Ensure the `MilestonPaymentProvider` wraps your component tree.
- Handle errors gracefully to improve user experience.

---

## useSavePayment

Saves payment details using a React hook. This hook is useful for storing payment information securely.

### Usage

```typescript
import { useSavePayment } from "mileston-payment-client";

const { triggerSavePayment, data, error, loading } = useSavePayment();

await triggerSavePayment(
  "invoice", // or "payment-link", "recurring"
  {
    /* payment details */
  },
  "optional-native-tokens"
);
```

### Parameters

| Parameter Name | Type   | Description                                                         |
| -------------- | ------ | ------------------------------------------------------------------- |
| `type`         | string | The type of payment (e.g., "invoice", "payment-link", "recurring"). |
| `body`         | object | The payment details.                                                |
| `nativeTokens` | string | Native tokens for the payment (e.g., AVAX, POL, ETH). (optional).   |

### Returns

| Return Name          | Type                          | Description                                           |
| -------------------- | ----------------------------- | ----------------------------------------------------- |
| `triggerSavePayment` | function                      | A function to save the payment data.                  |
| `data`               | `SavePaymentResponse \| null` | The response from the save operation.                 |
| `error`              | `string \| null`              | Any error that occurred during the save process.      |
| `loading`            | boolean                       | A boolean indicating whether the save is in progress. |

### Notes

- This hook depends on the `MilestonPaymentProvider` for context, which provides `apikey` and `businessid`.
- Use this hook to securely store payment data.
- Handle errors gracefully to improve user experience.

---

## useSuiPayment

A React hook for handling Sui blockchain payments.

### Usage

```typescript
import { useSuiPayment } from "mileston-payment-client";

const { handleSuiPayment } = useSuiPayment("test");

handleSuiPayment({
  amount: "100",
  recipientWalletAddress: "0xRecipientAddress",
});
```

### Parameters

| Parameter Name           | Type   | Description                             |
| ------------------------ | ------ | --------------------------------------- |
| `env`                    | string | The environment (e.g., "test", "prod"). |
| `amount`                 | string | The amount for the payment.             |
| `recipientWalletAddress` | string | The recipient's wallet address.         |

### Returns

| Return Name        | Type     | Description                        |
| ------------------ | -------- | ---------------------------------- |
| `handleSuiPayment` | function | Function to initiate Sui payments. |

---

## useGetPaymentWallet

Fetches wallet details for a specific wallet type using a React hook. This hook is useful for retrieving wallet information such as balance and transaction history.

### Usage

```typescript
import { useGetPaymentWallet } from "mileston-payment-client";

const { fetchWallet, wallet, error, loading } = useGetPaymentWallet();

await fetchWallet("sui"); // or "evm"
```

### Parameters

| Parameter Name | Type         | Description                              |
| -------------- | ------------ | ---------------------------------------- |
| `walletType`   | `WalletType` | The type of wallet (e.g., "sui", "evm"). |

### Returns

| Return Name   | Type                       | Description                                            |
| ------------- | -------------------------- | ------------------------------------------------------ |
| `fetchWallet` | function                   | A function to fetch wallet details.                    |
| `wallet`      | `GetPaymentWallet \| null` | The fetched wallet details.                            |
| `error`       | `string \| null`           | Any error that occurred during the fetch.              |
| `loading`     | boolean                    | A boolean indicating whether the fetch is in progress. |

### Notes

- This hook depends on the `MilestonPaymentProvider` for context, which provides `apikey` and `businessid`.
- Use this hook to retrieve wallet information before initiating wallet-based transactions.
- Handle errors gracefully to improve user experience.

---

## useVerifyPaymentWithWallet

Verifies a payment using a wallet. This hook is useful for confirming payments made via wallets.

### Usage

```typescript
import { useVerifyPaymentWithWallet } from "mileston-payment-client";

const { verify, data, error, loading } = useVerifyPaymentWithWallet();

await verify(
  "invoice", // or "payment-link", "recurring"
  {
    /* payment details */
  },
  "optional-native-tokens"
);
```

### Parameters

| Parameter Name | Type   | Description                                                         |
| -------------- | ------ | ------------------------------------------------------------------- |
| `type`         | string | The type of payment (e.g., "invoice", "payment-link", "recurring"). |
| `body`         | object | The payment details.                                                |
| `nativeTokens` | string | Native tokens for the payment (optional).                           |

### Returns

| Return Name | Type                              | Description                                                   |
| ----------- | --------------------------------- | ------------------------------------------------------------- |
| `verify`    | function                          | A function to verify the payment.                             |
| `data`      | `VerifyPaymentWithWallet \| null` | The response from the verification process.                   |
| `error`     | `string \| null`                  | Any error that occurred during the verification.              |
| `loading`   | boolean                           | A boolean indicating whether the verification is in progress. |

### Notes

- This hook depends on the `MilestonPaymentProvider` for context, which provides `apikey` and `businessid`.
- Use this hook to verify payments securely.
- Handle errors gracefully to improve user experience.

---

## usePaymentContext

Provides access to the `PaymentContext`, which contains the `apikey` and `businessid` passed to the `MilestonPaymentProvider`. This hook is essential for accessing these values in components or other hooks.

### Usage

```typescript
import { usePaymentContext } from "mileston-payment-client";

function MyComponent() {
  const { apikey, businessid } = usePaymentContext();

  return (
    <div>
      <p>API Key: {apikey}</p>
      <p>Business ID: {businessid}</p>
    </div>
  );
}
```

### Returns

| Return Name  | Type   | Description                                                |
| ------------ | ------ | ---------------------------------------------------------- |
| `apikey`     | string | The API key provided to the `MilestonPaymentProvider`.     |
| `businessid` | string | The business ID provided to the `MilestonPaymentProvider`. |

### Notes

- This hook must be used within a component wrapped by the `MilestonPaymentProvider`.
- If used outside the provider, it will throw an error.

---

## useSolanaPayment

A React hook for handling Solana blockchain payments.

### Usage

```typescript
import { useSolanaPayment } from "mileston-payment-client";

const { handleSolanaPayment } = useSolanaPayment("test");

handleSolanaPayment({
  amount: "100",
  recipientWalletAddress: "RecipientAddress",
  token: "SOL", // or "USDC", "USDT"
});
```

### Parameters

| Parameter Name           | Type   | Description                             |
| ------------------------ | ------ | --------------------------------------- |
| `env`                    | string | The environment (e.g., "test", "prod"). |
| `amount`                 | string | The amount for the payment.             |
| `recipientWalletAddress` | string | The recipient's wallet address.         |
| `token`                  | string | The token type (e.g., "SOL", "USDC").   |

### Returns

| Return Name           | Type     | Description                           |
| --------------------- | -------- | ------------------------------------- |
| `handleSolanaPayment` | function | Function to initiate Solana payments. |

### Notes

- The `env` parameter determines whether the hook operates in a test or production environment.
- Ensure the `recipientWalletAddress` is valid to avoid payment failures.
- Use the `token` parameter to specify the token type for the payment.

---
