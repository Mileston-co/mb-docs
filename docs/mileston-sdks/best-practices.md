---
sidebar_position: 2
---

# Best Practices

The **Mileston Payments SDKs** are designed to make your payment integrations seamless, secure, and developer-friendly. By following these best practices, you’ll ensure efficient use of both the **Client SDK** and **Backend SDK**, while maintaining security and best development practices.

---

## 🚀 Why Use Both SDKs?

### Frontend + Backend = Seamless Integration

By combining the **Mileston Client SDK** for user-facing payment workflows and the **Backend SDK** for secure backend operations, you create a robust, reliable payment solution. Whether you're generating a payment link, creating invoices, or handling recurring payments, these SDKs work together perfectly.

For instance:

- Use the **Client SDK** to present payment links, forms, or payment statuses to users.
- Use the **Backend SDK** to securely generate and manage payment links, invoices, or recurring payment configurations.

---

## ⚙️ Example Workflow: Combining SDKs for a Payment Flow

### Step 1: Generate Payment Link in the Backend

Use the **Backend SDK** to generate a secure payment link.

```typescript
import { PaymentLink } from 'mileston-payments';

const apiKey = process.env.MILESTON_API_KEY; // Never hardcode your API keys!
const businessId = process.env.BUSINESS_ID;

const paymentLink = new PaymentLink(apiKey, businessId);

const createPaymentPayload = {
  amount: '100.00',
  description: 'Premium Subscription',
  customerEmail: 'user@example.com',
};

const paymentLinkResponse = await paymentLink.create(createPaymentPayload);
console.log('Payment Link:', paymentLinkResponse.paymentLink);
```

### Step 2: Use the Payment Link in the Frontend

Pass the generated payment link to your frontend. With the **Client SDK**, you can make the user experience smoother by embedding or displaying the link.

```javascript
import React from 'react';
import { PayButton } from 'mileston-payment-client';

const paymentLink = "https://checkout.mileston.co/payment"; // Link generated in the backend

<PayButton
    onPaymentComplete={() => console.log('Payment complete!')}
    onPaymentDataReceived={(data) => console.log('Payment data received:', data)}
    onPaymentError={(error) => console.error('Payment error:', error)}
    paymentUrl={paymentLink}
    style={{ backgroundColor: 'green', color: 'white' }}
>
    Pay Now
</PayButton>
```

---

## 🛡️ Security Best Practices

1. **Keep Your API Keys Safe**
   - Store API keys and sensitive information in environment variables (`process.env`).
   - Use services like AWS Secrets Manager, HashiCorp Vault, or Azure Key Vault for managing secrets.

   🚫 **Never hardcode API keys or secrets in your codebase!**

2. **Restrict API Key Access**
   - Limit API key permissions to necessary actions.
   - Rotate keys periodically to reduce risk in case of leaks.

3. **Use HTTPS**
   - Always ensure secure communication between your client, server, and the Mileston API.

4. **Tokenize Sensitive Data**
   - Avoid exposing sensitive user or payment information. Use tokens provided by Mileston APIs.

---

## 📦 Real-World Use Case: Payment Dashboard Integration

Mileston also offers a **Business Dashboard** to create and manage payment links manually. These links can then be plugged directly into the **Client SDK** to integrate them into your app without requiring backend processing.

**Example: Using a Dashboard-Generated Link**

```javascript
import { MilestonClient } from 'mileston-client-sdk';

const dashboardGeneratedLink = ""https://checkout.mileston.co/payment"";

<PayButton
    onPaymentComplete={() => console.log('Payment complete!')}
    onPaymentDataReceived={(data) => console.log('Payment data received:', data)}
    onPaymentError={(error) => console.error('Payment error:', error)}
    paymentUrl={dashboardGeneratedLink}
    style={{ backgroundColor: 'green', color: 'white' }}
    >
    Pay Now
</PayButton>
```

---

## 🧰 Advanced Example: Recurring Payments Made Simple

### Backend: Create a Recurring Payment

```typescript
import { RecurringPayment } from 'mileston-payments';

const recurringPayment = new RecurringPayment(apiKey, businessId);

const recurringPayload = {
  amount: '50.00',
  subscriberFullName: 'John Doe',
  subscriberEmail: 'john.doe@example.com',
  recurringDate: new Date('2025-02-01'),
  recurringInterval: 30,
};

const recurringResponse = await recurringPayment.create('Acme Corp', recurringPayload);
console.log('Recurring Payment Created:', recurringResponse);
```

### Frontend: Notify the User

```javascript
const subscriptionDetails = {
  amount: "50.00",
  nextPaymentDate: "2025-02-01",
};

console.log(`Hey John, your next payment of $${subscriptionDetails.amount} is due on ${subscriptionDetails.nextPaymentDate}.`);
```

---

## 🏆 Pro Tips for Developers

1. **Test in Sandbox Mode**
   - Always test your integration in a sandbox environment before going live.

2. **Log Responses for Debugging**
   - Log API responses in your backend (but avoid sensitive details!) to debug issues quickly.

3. **Documentation Is Your Friend**
   - Refer to the [Mileston API Documentation](https://docs.mileston.co) for detailed API references and advanced use cases.

4. **Think Modular**
   - Keep your payment logic modular to make updates and scaling easier.

---

## 💡 Final Words

Using the **Mileston SDKs** is a game-changer for any business looking to simplify payments. Whether you're a solo developer or part of a team, integrating both frontend and backend SDKs ensures a seamless, secure, and developer-friendly experience.

Happy coding! 🚀

---
