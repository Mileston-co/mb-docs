---
sidebar_position: 1
---

# 🚀 Schnellstart

Willkommen zur **Mileston Payments Integration**! 🎉 Wir freuen uns, Sie an Bord zu haben! Die Integration von Mileston Payments ist einfach, macht Spaß und öffnet Ihre App für die Welt der Krypto-Zahlungen. Lassen Sie uns gemeinsam in wenigen Schritten Ihren **ersten Krypto-Zahlungslink** erstellen!

---

## 🌟 Erstellen Sie Ihren ersten Krypto-Zahlungslink

### 📝 Schritt 1: Konto erstellen

Gehen Sie zu [**business.mileston.co**](https://business.mileston.co) und registrieren Sie sich für Ihr Mileston Business-Konto.

Damit erhalten Sie Zugriff auf unser leistungsstarkes Dashboard, in dem die ganze Magie passiert. ✨

---

### 🔑 Schritt 2: API-Schlüssel erhalten

Navigieren Sie im Dashboard zum Tab **Entwickler**, um Ihren **API-Schlüssel** zu generieren. Sie finden dort zwei Arten von Schlüsseln in den Kategorien Normal und Checkout:

- **Test-API-Schlüssel** (für Testnet, kein echtes Geld):  
  `Mileston_TEST_hshshs7y373djdsdj...`
- **Live-API-Schlüssel** (für Mainnet, echter Geldwert):  
  `Mileston_LIVE_773hsiakakgddh...`

⚠️ **Tipp:**

- Verwenden Sie den **Test-API-Schlüssel** für Tests in Ihrer Entwicklungsumgebung.
- Verwenden Sie den **Live-API-Schlüssel** für die Produktion, um echte Zahlungen zu verarbeiten.

---

### 🛠️ Schritt 3: Backend SDK installieren

Installieren Sie unser Backend SDK, um Zahlungslinks wie ein Profi zu erstellen. So geht's:

```bash
npm install mileston-payments
```

Schreiben Sie dann etwas magischen Code wie diesen:

```javascript
import { PaymentLink } from "mileston-payments";

const apiKey = "your-api-key"; // Ihr API-Schlüssel
const businessId = "your-business-id"; // Ihre Business-ID

// Initialisieren Sie PaymentLink, Invoice oder RecurringPayment nach Bedarf
const paymentLink = new PaymentLink(apiKey, businessId);

// Zahlungslink generieren
const link = await paymentLink.create({
  amount: 100, // Betrag in Ihrer bevorzugten Währung
  currency: "USD",
  description: "Krypto-Zahlungsbeispiel",
});
console.log("Zahlungslink erstellt:", link);
```

🔍 **Wo finde ich meine `businessId`?**  
Sie finden Ihre Business-ID im Dropdown-Menü unter Ihrem Geschäftslogo im Dashboard.

---

### ✨ Schritt 4: Zahlungslink im Frontend verwenden

Nachdem Sie einen Zahlungslink erstellt haben, können Sie ihn in Ihr Frontend einbinden!

Sie können entweder:

1. Ihren eigenen benutzerdefinierten Button bauen, oder
2. Unser **mileston-payment-client SDK** für eine nahtlose Integration verwenden.

Installieren Sie zunächst das Client SDK:

```bash
npm install mileston-payment-client
```

Verwenden Sie dann unseren vorgefertigten Zahlungsbutton:

```jsx
import { PayButton } from "mileston-payment-client";

const App = () => (
  <PayButton
    paymentUrl="https://checkout.mileston.co/payment"
    onPaymentComplete={() => console.log("Zahlung abgeschlossen!")}
    onPaymentDataReceived={(data) =>
      console.log("Zahlungsdaten empfangen:", data)
    }
    onPaymentError={(error) => console.error("Zahlungsfehler:", error)}
    style={{ backgroundColor: "green", color: "white" }}
  >
    Jetzt bezahlen
  </PayButton>
);
```

👀 **Warum den `PayButton` verwenden?**  
Er übernimmt alles: Zahlung, Verifizierung und ein großartiges Nutzererlebnis. Sie können sich entspannt zurücklehnen und einen Kaffee genießen. ☕

---

### 🛡️ Schritt 5: API-Schlüssel sicher aufbewahren

**Wichtig:** Verwenden Sie API-Schlüssel immer nur im Backend SDK. Geben Sie Ihre Schlüssel niemals im Frontend preis, sonst drohen Sicherheitsprobleme.

---

## Praxisbeispiele

### Anwendungsfall 1: Abonnementverwaltung

**Szenario**: Ein SaaS-Unternehmen möchte monatliche Abonnementzahlungen für seine Nutzer automatisieren.

**Codebeispiel**:

```javascript
import { SubscriptionCheckout } from "mileston-payment-client";

<SubscriptionCheckout
  businessName="SaaS Pro"
  businessLogo="https://example.com/logo.png"
  plan={{
    name: "Pro Plan",
    description: "Zugriff auf alle Premium-Funktionen",
    amount: 29.99,
    currency: "USD",
    interval: "monthly",
    intervalCount: 1,
  }}
  onWalletConnectPaymentComplete={(networkId, tokenId) =>
    console.log("Zahlung abgeschlossen", networkId, tokenId)
  }
  onWalletConnectPaymentError={(error) => console.error("Zahlungsfehler", error)}
  paymentLinkId="subscription-link-id"
  env="test"
/>;
```

### Anwendungsfall 2: Rechnungserstellung

**Szenario**: Ein Freelancer muss Rechnungen für abgeschlossene Projekte an Kunden senden.

**Codebeispiel**:

```javascript
import { InvoiceCheckout } from "mileston-payment-client";

<InvoiceCheckout
  businessName="Freelance Studio"
  businessLogo="https://example.com/logo.png"
  description="Rechnung #4567 für Webdesign-Projekt"
  amount={500}
  recipientWalletAddress="0x123456789abcdef"
  onQrCodePaymentComplete={() => console.log("QR-Code-Zahlung abgeschlossen")}
  onQrCodePaymentError={(error) =>
    console.error("QR-Code-Zahlungsfehler", error)
  }
  paymentLinkId="invoice-id"
  env="test"
/>;
```

### Anwendungsfall 3: Zahlungslink-Integration

**Szenario**: Ein E-Commerce-Shop möchte ein nahtloses Checkout-Erlebnis bieten.

**Codebeispiel**:

```javascript
import { PaymentLinkCheckout } from "mileston-payment-client";

<PaymentLinkCheckout
  businessName="E-Shop"
  businessLogo="https://example.com/logo.png"
  bannerImage="https://example.com/banner.png"
  title="Bestellzahlung"
  description="Bezahlen Sie Ihre Bestellung"
  amount={150}
  recipientWalletAddress="0x123456789abcdef"
  onCardPaymentComplete={() => console.log("Kartenzahlung abgeschlossen")}
  onCardPaymentError={(error) => console.error("Kartenzahlungsfehler", error)}
  paymentLinkId="order-payment-link"
  env="test"
/>;
```

---

## 📂 GitHub-Repositories

Weitere Details und Beispiele finden Sie in unseren SDKs:

- [**mileston-payments (Backend SDK)**](https://github.com/Mileston-co/mileston-payments)
- [**mileston-payment-client (Frontend SDK)**](https://github.com/Mileston-co/mileston-payment-client)

---

🎉 **Glückwunsch!**  
Sie haben gerade Ihren ersten Krypto-Zahlungslink mit Mileston Payments erstellt! High Five! 🙌

---

## Brauchen Sie Hilfe?

Wenn Sie Unterstützung benötigen, treten Sie unserer Discord-Community bei: [https://discord.gg/JT3BhUCy](https://discord.gg/JT3BhUCy)
