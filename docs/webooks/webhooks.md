# Webhooks

---

## Overview

Webhooks allow you to receive real-time notifications when specific events occur in the Mileston Business platform. You can use webhooks to automate workflows, update your database, or trigger other actions in your application.

The **Developers Tab** in the Mileston Business dashboard provides an interface to manage your webhooks, including registering new webhooks, viewing existing ones, and deleting them.

---

## Accessing the Developers Tab

1. Log in to your Mileston Business account.
2. Navigate to the **Developers Tab** in the sidebar menu.
3. Under the **Webhooks** section, you will find options to manage your webhooks.

---

## Setting Up Webhooks

### **Step 1: Register a Webhook**

1. In the **Developers Tab**, go to the **Webhooks** section.
2. Click on the **Register Webhook** button.
3. Fill in the following details:

   - **Endpoint URL**: The URL of your webhook endpoint where events will be sent.
   - **Verification Token**: A token that will be used to verify the authenticity of webhook requests.
   - **Events**: Select the events you want to subscribe to. If no events are selected, the default events (`invoice-paid`, `paymentlink-paid`, `recurring-paid`) will be used.

4. Click **Save** to register the webhook.

---

### **Step 2: View Registered Webhooks**

In the **Webhooks** section of the **Developers Tab**, you will see a list of all registered webhooks.

---

### **Step 3: Delete a Webhook**

1. Locate the webhook you want to delete in the list of registered webhooks.
2. Click the **Delete** button next to the webhook.

---

## Webhook Events

The following events are supported:

- **`invoice-paid`**: Triggered when an invoice is paid.
- **`paymentlink-paid`**: Triggered when a payment link is paid.
- **`recurring-paid`**: Triggered when a recurring payment is paid.

---

## Webhook Payload

When an event is triggered, the webhook sends a `POST` request to your configured endpoint with the following payload structure:

### Example Payload for `paymentlink-paid`

```json
{
  "event": "paymentlink-paid",
  "payload": {
    "paymentLinkId": "id",
    "payer": "0x2.................",
    "recipientWalletAddress": "0x4..............",
    "amount": "1",
    "userUUID": "id",
    "transactionSignature": "0xc................",
    "feeSignature": "0x1....................",
    "chain": "pol",
    "env": "test",
    "status": "paid",
    "createdAt": "2025-05-16T20:38:25.343Z"
  }
}
```

### Field Descriptions

- **`event`**: The name of the event that was triggered (`paymentlink-paid` in this case).
- **`payload`**: The data associated with the event, which includes:
  - **`paymentLinkId`**: The unique identifier of the payment link.
  - **`payer`**: The wallet address of the payer.
  - **`recipientWalletAddress`**: The wallet address of the recipient.
  - **`amount`**: The amount paid.
  - **`userUUID`**: The unique identifier of the user associated with the payment link.
  - **`transactionSignature`**: The transaction signature for the payment.
  - **`feeSignature`**: The signature for the fee associated with the transaction.
  - **`chain`**: The blockchain network where the transaction occurred (e.g., `pol` for Polygon).
  - **`env`**: The environment in which the transaction occurred (`test` or `prod`).
  - **`status`**: The status of the payment (e.g., `paid`).
  - **`createdAt`**: The timestamp when the payment was created.

---

## Consuming Webhooks: Example Endpoint Implementation

To receive and process webhook events, you need to create an HTTP endpoint in your application. The webhook service will send a POST request to this endpoint whenever an event you subscribed to is triggered.

### **Verifying the Webhook Signature**

Each webhook request includes an `X-Webhook-Signature` header. This header contains the verification token you provided when registering the webhook. You must verify this token in your endpoint to ensure the request is authentic.

### **Example: Node.js/Express Endpoint**

```javascript
const express = require("express");
const app = express();
app.use(express.json());

// Replace with your actual verification token from the dashboard
const VERIFICATION_TOKEN = "your-verification-token";

app.post("/your-webhook-endpoint", (req, res) => {
  const signature = req.headers["x-webhook-signature"];
  if (signature !== VERIFICATION_TOKEN) {
    // Invalid token, reject the request
    return res.status(401).json({ error: "Invalid webhook signature" });
  }

  // Process the webhook event
  const { event, payload } = req.body;
  // ... your logic here ...

  // Always return 200 OK after successful processing
  res.status(200).json({ received: true });
});

app.listen(3000, () => console.log("Webhook endpoint listening on port 3000"));
```

**Important:**

- Always verify the `X-Webhook-Signature` header matches your verification token.
- Always return HTTP 200 after successfully processing the webhook. If you return a non-200 status, the webhook will be retried.
- Make sure your endpoint is accessible from the public internet.

## Support

If you encounter any issues or have questions, please join our discord community: https://discord.gg/JT3BhUCy
