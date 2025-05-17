---
sidebar_position: 2
---

# Backend SDK Documentation

Welcome to the **Mileston Payments JavaScript/TypeScript Backend SDK**—your ultimate tool to manage payment links, payouts, invoices, and recurring payments! Whether you’re building a simple checkout system or a full-blown payment management solution, we’ve got your back with a developer-friendly, secure, and lightweight SDK.

---

## 🚀 Features

- **Create and Manage Payment Links:** Let your customers pay with ease!
- **Send Payouts:** Transfer funds directly to recipients' wallets.
- **Generate and Update Invoices:** From client billing to reminders, stay on top of your payments.
- **Handle Recurring Payments:** Automate those monthly, weekly, or even daily payments like a pro.
- **Secure and Reliable:** Sleep soundly knowing your payments are safe.
- **Developer-Friendly:** Simple, intuitive, and just works out of the box.

---

## 🛠️ Installation

First things first, install the SDK using `npm`:

```bash
npm install mileston-payments
```

---

## 🏁 Getting Started

Import the SDK and initialize it with your **API Key** and **Business ID**.

```typescript
import {
  PaymentLink,
  PayoutAPI,
  Invoice,
  RecurringPayment,
} from "mileston-payments";

const apiKey = "your-api-key"; // Get this from your dashboard
const businessId = "your-business-id"; // Get this from the modal that pops when you click your profile

const paymentLink = new PaymentLink(apiKey, businessId);
const payout = new PayoutAPI(apiKey, businessId);
const invoice = new Invoice(apiKey, businessId);
const recurringPayment = new RecurringPayment(apiKey, businessId);
```

---

## 🔥 Usage Examples

### 🧾 1. **Creating a Payment Link**

Need a quick way to collect payments? Payment links to the rescue!

```javascript
const createPaymentPayload = {
  amount: "100.00",
  description: "Purchase of premium subscription",
  customerEmail: "customer@example.com",
};

const paymentLinkResponse = await paymentLink.create(createPaymentPayload);
console.log("Payment Link:", paymentLinkResponse.paymentLink);
// Output: https://checkout.mileston.co/payment-link/ahddjdjdjd8848bc123
```

Imagine sending that link via email or embedding it in your website. So smooth, right? 😌

---

### 💸 2. **Sending a Payout**

Send payments directly to recipients.

```typescript
const sendPayoutPayload = {
  amount: "100.00",
  recipientAddress: "0xRecipientWalletAddress",
  walletType: "eth", // Supported wallet types: "sui", "eth", "avax", "pol", "base", "arb"
  secretPhrase: "optional-secret-phrase", // Optional: Use for wallets with copied secrets
};

const payoutResponse = await payout.sendPayment(sendPayoutPayload);
console.log("Payout Response:", payoutResponse);
// Output: { statusCode: 200, message: "Payout successful" }
```

#### Supported Wallet Types for Payouts

- **`sui`**: Sui blockchain wallet.
- **`eth`**: Ethereum wallet.
- **`avax`**: Avalanche wallet.
- **`pol`**: Polygon wallet.
- **`base`**: Base blockchain wallet.
- **`arb`**: Arbitrum wallet.

#### Optional Field: `secretPhrase`

- **`secretPhrase`**: Use this field if the recipient's wallet requires a secret phrase for transactions. This is optional and only needed for wallets with copied secrets.

---

### 📜 3. **Generating an Invoice**

Because looking professional matters!

```javascript
const createInvoicePayload = {
  amount: "200.00",
  itemName: "Service Fee",
  customerEmail: "client@example.com",
  dueDate: new Date(),
  addPdf: true, // Include a PDF version of the invoice
};

const businessName = "Acme Corporation"; // Your business name

const invoiceResponse = await invoice.create(
  businessName,
  createInvoicePayload
);
console.log("Invoice Link:", invoiceResponse.invoiceLink);
// Output: https://checkout.mileston.co/invoice/ahddjdjdjd8848bc123
```

Invoices have never been this elegant! Your users automatically get emails immediately you create the invoice. Who knew you could look cool while chasing payments? 😎

---

### 🔄 4. **Handling Recurring Payments**

Set it and forget it! Automate subscription payments effortlessly.

```javascript
const createRecurringPaymentPayload = {
  amount: "50.00",
  subscriberFullName: "John Doe",
  subscriberEmail: "john.doe@example.com",
  recurringDate: new Date("2025-01-01"),
  recurringInterval: 30, // Days between payments
  addPdf: true, // Include a PDF version of the recurring payment details
};

const recurringPaymentResponse = await recurringPayment.create(
  businessName,
  createRecurringPaymentPayload
);
console.log("Recurring Payment Created:", recurringPaymentResponse);
// Output: https://checkout.mileston.co/recurring-payment/ahddjdjdjd8848bc123
```

Your users automatically receive an email to pay up and a follow up email when their subscription is due! John won’t miss a single payment, and neither will you! 💸

---

### 🛠️ 5. **Updating a Payment Link**

Did the customer change their mind? No problem—update the payment link on the fly.

```javascript
const updatePayload = {
  amount: "120.00",
  description: "Updated subscription fee",
};

const updatedPaymentLink = await paymentLink.update(
  "paymentLinkId",
  updatePayload
);
console.log("Updated Payment Link:", updatedPaymentLink);
// Output: { id: 'pl123', amount: '120.00', description: 'Updated subscription fee' }
```

You’re in full control—no more “Oops!” moments.

---

### 🛠️ 6. **Updating an Invoice**

Need to make changes to an invoice? No problem—update it easily.

```javascript
const updateInvoicePayload = {
  amount: "250.00",
  itemName: "Updated Service Fee",
  dueDate: new Date("2025-01-15"),
};

const updatedInvoice = await invoice.update("invoiceId", updateInvoicePayload);
console.log("Updated Invoice:", updatedInvoice);
// Output: { id: 'inv123', amount: '250.00', itemName: 'Updated Service Fee', dueDate: '2025-01-15' }
```

---

### 🛠️ 7. **Fetching an Invoice**

Retrieve details of a specific invoice.

```javascript
const invoiceData = await invoice.get("invoiceId");
console.log("Invoice Data:", invoiceData);
// Output: { id: 'inv123', amount: '200.00', itemName: 'Service Fee', ... }
```

---

### 🛠️ 8. **Deleting an Invoice**

Remove an invoice when it's no longer needed.

```javascript
await invoice.delete("invoiceId");
console.log("Invoice deleted.");
```

---

### 🛠️ 9. **Updating a Recurring Payment**

Modify the details of an existing recurring payment.

```javascript
const updateRecurringPaymentPayload = {
  amount: "60.00",
  recurringInterval: 15, // Update interval to 15 days
};

const updatedRecurringPayment = await recurringPayment.update(
  "recurringPaymentId",
  updateRecurringPaymentPayload
);
console.log("Updated Recurring Payment:", updatedRecurringPayment);
// Output: { id: 'rp123', amount: '60.00', recurringInterval: 15, ... }
```

---

### 🛠️ 10. **Fetching a Recurring Payment**

Retrieve details of a specific recurring payment.

```javascript
const recurringPaymentData = await recurringPayment.get("recurringPaymentId");
console.log("Recurring Payment Data:", recurringPaymentData);
// Output: { id: 'rp123', amount: '50.00', recurringInterval: 30, ... }
```

---

### 🛠️ 11. **Deleting a Recurring Payment**

Cancel a recurring payment when it's no longer needed.

```javascript
await recurringPayment.delete("recurringPaymentId");
console.log("Recurring payment deleted.");
```

---

### 💥 Bonus: Fetching & Deleting Data

- **Get Payment Link:**

```javascript
const paymentData = await paymentLink.get("paymentLinkId");
console.log(paymentData);
```

- **Delete Payment Link:**

```javascript
await paymentLink.delete("paymentLinkId");
console.log("Payment link deleted.");
```

- Similar methods exist for invoices and recurring payments. Go wild! 🎉

---

## 🌟 Real-World Example

You can check how this app [https://sui-invoice.vercel.app/](https://sui-invoice.vercel.app/) uses Mileston to manage invoices for freelancers.

## 📚 API Reference

### **`PaymentLink` Class**

- **`create(payload: CreatePaymentLinkPayload): Promise<CreatePaymentLinkResponse>`**  
  Create a new payment link.
- **`update(id: string, payload: UpdatePaymentLinkPayload): Promise<UpdatePaymentLinkResponse>`**  
  Update an existing payment link.
- **`get(id: string): Promise<UpdatePaymentLinkResponse>`**  
  Retrieve details of a specific payment link.
- **`delete(id: string): Promise<DeletePaymentLinkResponse>`**  
  Delete a payment link.

### **`PayoutAPI` Class**

- **`sendPayment(payload: SendPayoutRequest): Promise<SendPayoutResponse>`**  
  Send a payout to a recipient.

### **`Invoice` Class**

- Similar methods for creating, updating, fetching, and deleting invoices.

### **`RecurringPayment` Class**

- **`create(payload: CreateRecurringPaymentPayload): Promise<CreateRecurringPaymentResponse>`**  
  Set up a recurring payment.
- **`update(id: string, payload: UpdateRecurringPaymentPayload): Promise<UpdateRecurringPaymentResponse>`**  
  Update recurring payment details.
- **`getAll(): Promise<GetAllRecurringPaymentResponse>`**  
  Retrieve all active recurring payments.

---

## 🛡️ Pro Tips

- **Secure your API key!** Don’t hardcode it in your codebase—use environment variables.
- **Error Handling:** Wrap all calls in try-catch blocks for a smoother experience.

---

## 🤝 Contributing

Got ideas to make this SDK better? Fork the repo, submit pull requests, and let’s make this tool even more awesome together.

---

## 🎉 Start Now!

Say goodbye to payment chaos and hello to streamlined success. Install the SDK, write some code, and watch the magic happen. ✨

```bash
npm install mileston-payments
```

What are you waiting for? Go build something amazing! 🚀
