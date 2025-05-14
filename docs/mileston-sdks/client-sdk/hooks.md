# Hooks Documentation

This document provides an in-depth overview of the hooks available in the Mileston Payment Client SDK. **Note:** All hooks require the `MilestonPaymentProvider` to provide `apikey (checkout api key)` and `businessid` via context.

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

- `options` (object): The options for fetching payment details.
  - `paymentId` (string): The ID of the payment to fetch.
  - `paymentType` (string): The type of payment (e.g., "invoice", "payment-link", "recurring").

### Returns

- `data`: The fetched payment details.
- `error`: Any error that occurred during the fetch.
- `isLoading`: A boolean indicating whether the fetch is in progress.

### Notes

- Ensure the `MilestonPaymentProvider` wraps your component tree to provide the necessary context.
- Handle errors gracefully to improve user experience.

---

## useGetOnRampData

Fetches onramp data for payments. This hook is useful for integrating onramp services into your application.

### Usage

```typescript
import { useGetOnRampData } from "mileston-payment-client";

const { data, error, isLoading } = useGetOnRampData();

await fetchOnRampData({
  amount: "100",
  recipientWalletAddress: "0xRecipientAddress",
  chain: "eth",
});
```

### Parameters

- `params` (object): The parameters for fetching onramp data.
  - `amount` (string): The amount for the onramp.
  - `recipientWalletAddress` (string): The recipient's wallet address.
  - `chain` (string): The blockchain network (e.g., "eth").

### Returns

- `data`: The fetched onramp data.
- `error`: Any error that occurred during the fetch.
- `isLoading`: A boolean indicating whether the fetch is in progress.

### Notes

- This hook depends on the `MilestonPaymentProvider` for context.
- Validate the `params` object to ensure all required fields are provided.

---

## useGetOnRampPaymentStatus

Fetches the status of an onramp payment. This hook is essential for tracking payment progress.

### Usage

```typescript
import { useGetOnRampPaymentStatus } from "mileston-payment-client";

const { status, error, isLoading } = useGetOnRampPaymentStatus();

await fetchOnRampPaymentStatus({
  id: "payment-id",
  amount: "100",
  chain: "eth",
  recipientWalletAddress: "0xRecipientAddress",
});
```

### Parameters

- `params` (object): The parameters for fetching payment status.
  - `id` (string): The ID of the payment.
  - `amount` (string): The amount for the payment.
  - `chain` (string): The blockchain network (e.g., "eth").
  - `recipientWalletAddress` (string): The recipient's wallet address.

### Returns

- `status`: The status of the payment.
- `error`: Any error that occurred during the fetch.
- `isLoading`: A boolean indicating whether the fetch is in progress.

### Notes

- Ensure the `MilestonPaymentProvider` wraps your component tree.
- Use this hook to provide real-time updates to users.

---

## useGetUserDetails

Fetches user details using a React hook. This hook is useful for retrieving user-specific information.

### Usage

```typescript
import { useGetUserDetails } from "mileston-payment-client";

const { user, error, isLoading } = useGetUserDetails("business-id");
```

### Parameters

- `businessId` (string, optional): The business ID to include in the URL path.

### Returns

- `user`: The fetched user details.
- `error`: Any error that occurred during the fetch.
- `isLoading`: A boolean indicating whether the fetch is in progress.

### Notes

- This hook depends on the `MilestonPaymentProvider` for context.
- Use this hook to verify user information before initiating sensitive operations.

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

- `options` (object): The options for initiating a payment.
  - `type` (string): The type of payment (e.g., "invoice", "payment-link", "recurring").
  - `body` (object): The payment details.
  - `nativeTokens` (string, optional): Native tokens for the payment.

### Returns

- `initiatePayment`: A function to start the payment process.
- `error`: Any error that occurred during the payment process.
- `isProcessing`: A boolean indicating whether the payment is in progress.

### Notes

- Ensure the `MilestonPaymentProvider` wraps your component tree.
- Handle errors gracefully to improve user experience.

---

## useSavePayment

Saves payment details using a React hook. This hook is useful for storing payment information securely.

### Usage

```typescript
import { useSavePayment } from "mileston-payment-client";

const { save, error, isSaving } = useSavePayment();

await save({
  type: "invoice", // or "payment-link", "recurring"
  body: {
    /* payment details */
  },
  nativeTokens: "optional-native-tokens",
});
```

### Parameters

- `options` (object): The options for saving payment details.
  - `type` (string): The type of payment (e.g., "invoice", "payment-link", "recurring").
  - `body` (object): The payment details.
  - `nativeTokens` (string, optional): Native tokens for the payment.

### Returns

- `save`: A function to save the payment data.
- `error`: Any error that occurred during the save process.
- `isSaving`: A boolean indicating whether the save is in progress.

### Notes

- This hook depends on the `MilestonPaymentProvider` for context.
- Use this hook to securely store payment data.
