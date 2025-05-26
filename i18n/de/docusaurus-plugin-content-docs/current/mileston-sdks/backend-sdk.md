---
sidebar_position: 2
---

# Backend SDK Dokumentation

Willkommen beim **Mileston Payments JavaScript/TypeScript Backend SDK** – Ihrem ultimativen Tool zur Verwaltung von Zahlungslinks, Auszahlungen, Rechnungen und wiederkehrenden Zahlungen! Egal, ob Sie ein einfaches Checkout-System oder eine vollständige Zahlungsmanagement-Lösung entwickeln, dieses SDK ist sicher, leichtgewichtig und entwicklerfreundlich.

---

## 🚀 Funktionen

- **Zahlungslinks erstellen und verwalten:** Lassen Sie Ihre Kunden einfach bezahlen!
- **Auszahlungen senden:** Überweisen Sie Gelder direkt an die Wallets der Empfänger.
- **Rechnungen generieren und aktualisieren:** Von der Kundenabrechnung bis zu Erinnerungen – behalten Sie Ihre Zahlungen im Griff.
- **Wiederkehrende Zahlungen verwalten:** Automatisieren Sie monatliche, wöchentliche oder sogar tägliche Zahlungen wie ein Profi.
- **Sicher und zuverlässig:** Schlafen Sie ruhig, Ihre Zahlungen sind geschützt.
- **Entwicklerfreundlich:** Einfach, intuitiv und funktioniert direkt nach der Installation.

---

## 🛠️ Installation

Installieren Sie das SDK mit `npm`:

```bash
npm install mileston-payments
```

---

## 🏁 Erste Schritte

Importieren Sie das SDK und initialisieren Sie es mit Ihrem **API-Schlüssel** und Ihrer **Business-ID**.

```typescript
import {
  PaymentLink,
  PayoutAPI,
  Invoice,
  RecurringPayment,
} from "mileston-payments";

const apiKey = "your-api-key"; // Aus dem Dashboard
const businessId = "your-business-id"; // Im Profil-Dropdown

const paymentLink = new PaymentLink(apiKey, businessId);
const payout = new PayoutAPI(apiKey, businessId);
const invoice = new Invoice(apiKey, businessId);
const recurringPayment = new RecurringPayment(apiKey, businessId);
```

---

## 🔥 Anwendungsbeispiele

### 🧾 1. **Zahlungslink erstellen**

Schnell Zahlungen einsammeln? Zahlungslinks helfen!

```javascript
const createPaymentPayload = {
  amount: "100.00",
  description: "Kauf eines Premium-Abos",
  customerEmail: "customer@example.com",
};

const paymentLinkResponse = await paymentLink.create(createPaymentPayload);
console.log("Zahlungslink:", paymentLinkResponse.paymentLink);
// Ausgabe: https://checkout.mileston.co/payment-link/ahddjdjdjd8848bc123
```

Stellen Sie sich vor, Sie senden diesen Link per E-Mail oder binden ihn auf Ihrer Website ein. So einfach! 😌

---

### 💸 2. **Auszahlung senden**

Senden Sie Zahlungen direkt an Empfänger.

```typescript
const sendPayoutPayload = {
  amount: "100.00",
  recipientAddress: "0xRecipientWalletAddress",
  walletType: "eth", // Unterstützte Typen: "sui", "eth", "avax", "pol", "base", "arb"
  secretPhrase: "optionale-geheimphrase", // Optional für Wallets mit kopierten Geheimnissen
};

const payoutResponse = await payout.sendPayment(sendPayoutPayload);
console.log("Auszahlungsantwort:", payoutResponse);
// Ausgabe: { statusCode: 200, message: "Payout erfolgreich" }
```

#### Unterstützte Wallet-Typen für Auszahlungen

- **`sui`**: Sui Blockchain Wallet
- **`eth`**: Ethereum Wallet
- **`avax`**: Avalanche Wallet
- **`pol`**: Polygon Wallet
- **`base`**: Base Blockchain Wallet
- **`arb`**: Arbitrum Wallet

#### Optionales Feld: `secretPhrase`

- **`secretPhrase`**: Nur nötig, wenn das Wallet eine Geheimphrase für Transaktionen benötigt.

---

### 📜 3. **Rechnung generieren**

Professionell auftreten!

```javascript
const createInvoicePayload = {
  amount: "200.00",
  itemName: "Servicegebühr",
  customerEmail: "client@example.com",
  dueDate: new Date(),
  addPdf: true, // PDF-Version der Rechnung anhängen
};

const businessName = "Acme Corporation"; // Ihr Firmenname

const invoiceResponse = await invoice.create(
  businessName,
  createInvoicePayload
);
console.log("Rechnungslink:", invoiceResponse.invoiceLink);
// Ausgabe: https://checkout.mileston.co/invoice/ahddjdjdjd8848bc123
```

Ihre Nutzer erhalten automatisch E-Mails, sobald Sie die Rechnung erstellen. So sieht professionelles Forderungsmanagement aus! 😎

---

### 🔄 4. **Wiederkehrende Zahlungen verwalten**

Automatisieren Sie Abo-Zahlungen mühelos.

```javascript
const createRecurringPaymentPayload = {
  amount: "50.00",
  subscriberFullName: "John Doe",
  subscriberEmail: "john.doe@example.com",
  recurringDate: new Date("2025-01-01"),
  recurringInterval: 30, // Tage zwischen Zahlungen
  addPdf: true, // PDF-Version der Details anhängen
};

const recurringPaymentResponse = await recurringPayment.create(
  businessName,
  createRecurringPaymentPayload
);
console.log("Wiederkehrende Zahlung erstellt:", recurringPaymentResponse);
// Ausgabe: https://checkout.mileston.co/recurring-payment/ahddjdjdjd8848bc123
```

Ihre Nutzer erhalten automatisch eine Zahlungsaufforderung und eine Erinnerung, wenn das Abo fällig ist! 💸

---

### 🛠️ 5. **Zahlungslink aktualisieren**

Kunde möchte etwas ändern? Kein Problem – aktualisieren Sie den Zahlungslink einfach.

```javascript
const updatePayload = {
  amount: "120.00",
  description: "Aktualisierte Abo-Gebühr",
};

const updatedPaymentLink = await paymentLink.update(
  "paymentLinkId",
  updatePayload
);
console.log("Aktualisierter Zahlungslink:", updatedPaymentLink);
// Ausgabe: { id: 'pl123', amount: '120.00', description: 'Aktualisierte Abo-Gebühr' }
```

Sie sind in vollem Umfang Herr der Lage – keine „Ups!“ Momente mehr.

---

### 🛠️ 6. **Rechnung aktualisieren**

Rechnung ändern? Kein Problem.

```javascript
const updateInvoicePayload = {
  amount: "250.00",
  itemName: "Aktualisierte Servicegebühr",
  dueDate: new Date("2025-01-15"),
};

const updatedInvoice = await invoice.update("invoiceId", updateInvoicePayload);
console.log("Aktualisierte Rechnung:", updatedInvoice);
// Ausgabe: { id: 'inv123', amount: '250.00', itemName: 'Aktualisierte Servicegebühr', dueDate: '2025-01-15' }
```

---

### 🛠️ 7. **Rechnung abrufen**

Details einer bestimmten Rechnung abrufen.

```javascript
const invoiceData = await invoice.get("invoiceId");
console.log("Rechnungsdaten:", invoiceData);
// Ausgabe: { id: 'inv123', amount: '200.00', itemName: 'Servicegebühr', ... }
```

---

### 🛠️ 8. **Rechnung löschen**

Rechnung entfernen, wenn sie nicht mehr benötigt wird.

```javascript
await invoice.delete("invoiceId");
console.log("Rechnung gelöscht.");
```

---

### 🛠️ 9. **Wiederkehrende Zahlung aktualisieren**

Details einer bestehenden wiederkehrenden Zahlung ändern.

```javascript
const updateRecurringPaymentPayload = {
  amount: "60.00",
  recurringInterval: 15, // Intervall auf 15 Tage ändern
};

const updatedRecurringPayment = await recurringPayment.update(
  "recurringPaymentId",
  updateRecurringPaymentPayload
);
console.log("Aktualisierte wiederkehrende Zahlung:", updatedRecurringPayment);
// Ausgabe: { id: 'rp123', amount: '60.00', recurringInterval: 15, ... }
```

---

### 🛠️ 10. **Wiederkehrende Zahlung abrufen**

Details einer bestimmten wiederkehrenden Zahlung abrufen.

```javascript
const recurringPaymentData = await recurringPayment.get("recurringPaymentId");
console.log("Wiederkehrende Zahlungsdaten:", recurringPaymentData);
// Ausgabe: { id: 'rp123', amount: '50.00', recurringInterval: 30, ... }
```

---

### 🛠️ 11. **Wiederkehrende Zahlung löschen**

Wiederkehrende Zahlung kündigen, wenn sie nicht mehr benötigt wird.

```javascript
await recurringPayment.delete("recurringPaymentId");
console.log("Wiederkehrende Zahlung gelöscht.");
```

---

### 💥 Bonus: Daten abrufen & löschen

- **Zahlungslink abrufen:**

```javascript
const paymentData = await paymentLink.get("paymentLinkId");
console.log(paymentData);
```

- **Zahlungslink löschen:**

```javascript
await paymentLink.delete("paymentLinkId");
console.log("Zahlungslink gelöscht.");
```

- Ähnliche Methoden gibt es für Rechnungen und wiederkehrende Zahlungen. Viel Spaß! 🎉

---

## 🌟 Praxisbeispiel

Sehen Sie, wie diese App [https://sui-invoice.vercel.app/](https://sui-invoice.vercel.app/) Mileston zur Verwaltung von Freelancer-Rechnungen nutzt.

## 📚 API-Referenz

### **`PaymentLink` Klasse**

- **`create(payload: CreatePaymentLinkPayload): Promise<CreatePaymentLinkResponse>`**  
  Erstellt einen neuen Zahlungslink.
- **`update(id: string, payload: UpdatePaymentLinkPayload): Promise<UpdatePaymentLinkResponse>`**  
  Aktualisiert einen bestehenden Zahlungslink.
- **`get(id: string): Promise<UpdatePaymentLinkResponse>`**  
  Ruft Details eines bestimmten Zahlungslinks ab.
- **`delete(id: string): Promise<DeletePaymentLinkResponse>`**  
  Löscht einen Zahlungslink.

### **`PayoutAPI` Klasse**

- **`sendPayment(payload: SendPayoutRequest): Promise<SendPayoutResponse>`**  
  Sendet eine Auszahlung an einen Empfänger.

### **`Invoice` Klasse**

- Ähnliche Methoden zum Erstellen, Aktualisieren, Abrufen und Löschen von Rechnungen.

### **`RecurringPayment` Klasse**

- **`create(payload: CreateRecurringPaymentPayload): Promise<CreateRecurringPaymentResponse>`**  
  Richtet eine wiederkehrende Zahlung ein.
- **`update(id: string, payload: UpdateRecurringPaymentPayload): Promise<UpdateRecurringPaymentResponse>`**  
  Aktualisiert Details einer wiederkehrenden Zahlung.
- **`getAll(): Promise<GetAllRecurringPaymentResponse>`**  
  Ruft alle aktiven wiederkehrenden Zahlungen ab.

---

## 🛡️ Profi-Tipps

- **API-Schlüssel schützen!** Niemals im Code hardcoden – immer Umgebungsvariablen verwenden.
- **Fehlerbehandlung:** Alle Aufrufe in try-catch-Blöcke einbetten für ein reibungsloses Erlebnis.

---

## 🤝 Mitwirken

Sie haben Ideen zur Verbesserung des SDK? Forken Sie das Repo, senden Sie Pull Requests und machen Sie das Tool gemeinsam noch besser.

---

## 🎉 Jetzt starten!

Verabschieden Sie sich vom Zahlungschaos und freuen Sie sich auf reibungslose Abläufe. Installieren Sie das SDK, schreiben Sie Code und erleben Sie die Magie. ✨

```bash
npm install mileston-payments
```

Worauf warten Sie noch? Bauen Sie etwas Großartiges! 🚀
