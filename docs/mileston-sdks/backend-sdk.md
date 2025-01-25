---
sidebar_position: 2
---

# Backend SDK Documentation  

Welcome to the **Mileston Payments JavaScript/Typescript Backend SDK**—your ultimate tool to manage payment links, invoices, and recurring payments like a boss! 😎 Whether you’re building a simple checkout system or a full-blown payment management solution, we’ve got your back with a developer-friendly, secure, and lightweight SDK.  

---

## 🚀 Features  
- **Create and Manage Payment Links:** Let your customers pay with ease!  
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

```javascript
import { PaymentLink, Invoice, RecurringPayment } from 'mileston-payments';

const apiKey = 'your-api-key';             // Get this from your dashboard
const businessId = 'your-business-id';     // Unique ID for your business

const paymentLink = new PaymentLink(apiKey, businessId);
const invoice = new Invoice(apiKey, businessId);
const recurringPayment = new RecurringPayment(apiKey, businessId);
```

---

## 🔥 Usage Examples  

### 🧾 1. **Creating a Payment Link**  
Need a quick way to collect payments? Payment links to the rescue!  

```javascript
const createPaymentPayload = {
  amount: '100.00',
  description: 'Purchase of premium subscription',
  customerEmail: 'customer@example.com',
};

const paymentLinkResponse = await paymentLink.create(createPaymentPayload);
console.log('Payment Link:', paymentLinkResponse.paymentLink);
// Output: https://checkout.mileston.co/payment-link/ahddjdjdjd8848bc123
```  
Imagine sending that link via email or embedding it in your website. So smooth, right? 😌  

---

### 📜 2. **Generating an Invoice**  
Because looking professional matters!  

```javascript
const createInvoicePayload = {
  amount: '200.00',
  itemName: 'Service Fee',
  customerEmail: 'client@example.com',
  dueDate: new Date(),
};

const businessName = 'Acme Corporation'; // Your business name

const invoiceResponse = await invoice.create(businessName, createInvoicePayload);
console.log('Invoice Link:', invoiceResponse.invoiceLink);
// Output: https://checkout.mileston.co/invoice/ahddjdjdjd8848bc123
```  
Invoices have never been this elegant! Your users automatically get emails immediately you create the invoice. Who knew you could look cool while chasing payments? 😎  

---

### 🔄 3. **Handling Recurring Payments**  
Set it and forget it! Automate subscription payments effortlessly.  

```javascript
const createRecurringPaymentPayload = {
  amount: '50.00',
  subscriberFullName: 'John Doe',
  subscriberEmail: 'john.doe@example.com',
  recurringDate: new Date('2025-01-01'),
  recurringInterval: 30, // Days between payments
};

const recurringPaymentResponse = await recurringPayment.create(
  businessName,
  createRecurringPaymentPayload
);
console.log('Recurring Payment Created:', recurringPaymentResponse);
// Output: https://checkout.mileston.co/recurring-payment/ahddjdjdjd8848bc123
```  
Your users automatically receive an email to pay up and a follow up email when their subscription is due! John won’t miss a single payment, and neither will you! 💸  

---

### 🛠️ 4. **Updating a Payment Link**  
Did the customer change their mind? No problem—update the payment link on the fly.  

```javascript
const updatePayload = {
  amount: '120.00',
  description: 'Updated subscription fee',
};

const updatedPaymentLink = await paymentLink.update('paymentLinkId', updatePayload);
console.log('Updated Payment Link:', updatedPaymentLink);
// Output: { id: 'pl123', amount: '120.00', description: 'Updated subscription fee' }
```  
You’re in full control—no more “Oops!” moments.  

---

### 💥 Bonus: Fetching & Deleting Data  

- **Get Payment Link:**  

```javascript
const paymentData = await paymentLink.get('paymentLinkId');
console.log(paymentData);
```  

- **Delete Payment Link:**  

```javascript
await paymentLink.delete('paymentLinkId');
console.log('Payment link deleted.');
```  

- Similar methods exist for invoices and recurring payments. Go wild! 🎉  

---

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