---
sidebar_position: 1
---

# 🛠️ Mileston Payment Client SDK

Willkommen zur **Mileston Payment JavaScript/TypeScript Client SDK** Dokumentation! Egal, ob Sie JavaScript-Profi oder Framework-Fan sind – dieses SDK macht Krypto-Zahlungen zum Kinderspiel. Legen wir los und bauen gemeinsam etwas Großartiges! 🚀

---

## 📂 SDK-Struktur

Das Mileston Client SDK ist in folgende Bereiche unterteilt:

- **Components**: React-Komponenten für nahtlose Integration.
- **Hooks**: React-Hooks für Echtzeit-Datenabruf.
- **Functions**: Zentrale Utility-Funktionen für Zahlungsoperationen.

Weitere Details finden Sie in der jeweiligen Dokumentation.

---

## 📦 Installation

Starten Sie mit der Installation des SDKs in Ihrem Projekt. Öffnen Sie Ihr Terminal und führen Sie aus:

```bash
npm install mileston-payment-client
```

Oder, wenn Sie Yarn verwenden:

```bash
yarn add mileston-payment-client
```

---

## ⚙️ Kernklasse (Vanilla JavaScript)

Für alle, die pures JavaScript nutzen, bietet das SDK die Klasse `MilestonPayButton` für die direkte Integration.

### Beispiel

```javascript
import { MilestonPayButton } from "mileston-payment-client";

const container = document.getElementById("payment-button-container");

const payButton = new MilestonPayButton(container, {
  buttonText: "Jetzt bezahlen",
  onPaymentComplete: () => {
    console.log("Zahlung abgeschlossen!");
  },
  onPaymentDataReceived: (data) => {
    console.log("Zahlungsdaten empfangen:", data);
  },
  onPaymentError: (error) => {
    console.error("Zahlungsfehler:", error);
  },
  paymentUrl: "https://example.com/payment",
});

// Optional: Button-Text oder -Stil später aktualisieren
payButton.updateButtonText("Zur Kasse");
payButton.updateButtonStyle({ backgroundColor: "blue", color: "white" });
```

---

## ⚛️ React-Integration

Das SDK bietet eine dedizierte React-Komponente für eine reibungslose Integration.

### Beispiel

```jsx
import React from "react";
import { PayButton } from "mileston-payment-client";

function App() {
  return (
    <div>
      <PayButton
        onPaymentComplete={() => console.log("Zahlung abgeschlossen!")}
        onPaymentDataReceived={(data) =>
          console.log("Zahlungsdaten empfangen:", data)
        }
        onPaymentError={(error) => console.error("Zahlungsfehler:", error)}
        paymentUrl="https://checkout.mileston.co/payment"
        style={{ backgroundColor: "green", color: "white" }}
      >
        Jetzt bezahlen
      </PayButton>
    </div>
  );
}

export default App;
```

---

## Angular-Integration

Für Angular-Projekte können Sie die Klasse `MilestonPayButton` direkt verwenden.

### Beispiel

```typescript
import { Component } from "@angular/core";
import { MilestonPayButton } from "mileston-payment-client";

@Component({
  selector: "app-root",
  template: `<div id="payment-button-container"></div>`,
})
export class AppComponent {
  ngOnInit() {
    const container = document.getElementById("payment-button-container");

    const payButton = new MilestonPayButton(container, {
      buttonText: "Jetzt bezahlen",
      onPaymentComplete: () => {
        console.log("Zahlung abgeschlossen!");
      },
      onPaymentDataReceived: (data) => {
        console.log("Zahlungsdaten empfangen:", data);
      },
      onPaymentError: (error) => {
        console.error("Zahlungsfehler:", error);
      },
      paymentUrl: "https://example.com/payment",
    });
  }
}
```

---

## Vue-Integration

Vue-Entwickler können ebenfalls die Klasse `MilestonPayButton` nutzen.

### Beispiel

```vue
<template>
  <div id="payment-button-container"></div>
</template>

<script>
import { MilestonPayButton } from "mileston-payment-client";

export default {
  name: "App",
  mounted() {
    const container = this.$el.querySelector("#payment-button-container");

    const payButton = new MilestonPayButton(container, {
      buttonText: "Jetzt bezahlen",
      onPaymentComplete: () => {
        console.log("Zahlung abgeschlossen!");
      },
      onPaymentDataReceived: (data) => {
        console.log("Zahlungsdaten empfangen:", data);
      },
      onPaymentError: (error) => {
        console.error("Zahlungsfehler:", error);
      },
      paymentUrl: "https://example.com/payment",
    });
  },
};
</script>
```

---

## Komponenten-Highlight

### Anwendung mit dem Payment Provider umschließen

Nutzen Sie den `MilestonPaymentProvider`, um globale Zahlungsdaten (z.B. API-Schlüssel, Business-ID) bereitzustellen. Der `apikey` sollte der **Checkout-API-Schlüssel** sein.

```javascript
import { MilestonPaymentProvider } from "mileston-payment-client";

function App() {
  return (
    <MilestonPaymentProvider
      apikey="your-api-key" // Hier den Checkout-API-Schlüssel verwenden
      businessid="your-business-id"
    >
      <YourComponent />
    </MilestonPaymentProvider>
  );
}
```

---

## Komponenten-Übersicht

### Subscription Checkout

```javascript
import { SubscriptionCheckout } from "mileston-payment-client";

<SubscriptionCheckout
  businessName="Mein Unternehmen"
  businessLogo="https://example.com/logo.png"
  plan={{
    name: "Premium-Tarif",
    description: "Zugang zu allen Premium-Funktionen",
    amount: 19.99,
    currency: "USD",
    interval: "monthly",
    intervalCount: 1,
  }}
  onWalletConnectPaymentComplete={(networkId, tokenId) =>
    console.log("Zahlung abgeschlossen", networkId, tokenId)
  }
  onWalletConnectPaymentError={(error) => console.error("Zahlungsfehler", error)}
  amount={19.99}
  recipientWalletAddress="0x123456789abcdef"
/>;
```

---

### Invoice Checkout

```javascript
import { InvoiceCheckout } from "mileston-payment-client";

<InvoiceCheckout
  businessName="Mein Unternehmen"
  businessLogo="https://example.com/logo.png"
  description="Rechnung #12345"
  amount={200}
  recipientWalletAddress="0x123456789abcdef"
  onQrCodePaymentComplete={() => console.log("QR-Code-Zahlung abgeschlossen")}
  onQrCodePaymentError={(error) =>
    console.error("QR-Code-Zahlungsfehler", error)
  }
/>;
```

---

### Payment Link Checkout

```javascript
import { PaymentLinkCheckout } from "mileston-payment-client";

<PaymentLinkCheckout
  businessName="Mein Unternehmen"
  businessLogo="https://example.com/logo.png"
  bannerImage="https://example.com/banner.png"
  title="Zahlungsanforderung"
  description="Bezahlen Sie Ihre Bestellung"
  amount={100}
  recipientWalletAddress="0x123456789abcdef"
  onCardPaymentComplete={() => console.log("Kartenzahlung abgeschlossen")}
  onCardPaymentError={(error) => console.error("Kartenzahlungsfehler", error)}
/>;
```

---

## 🛠️ Konfigurationsoptionen

Das SDK ist hochgradig anpassbar! Hier finden Sie eine Liste von Optionen und Props für verschiedene Komponenten:

### MilestonPayButton

| **Option**              | **Typ**                                                  | **Erforderlich** | **Beschreibung**                                         |
| ----------------------- | -------------------------------------------------------- | ---------------- | ------------------------------------------------------- |
| `container`             | `HTMLElement`                                            | Ja               | Das DOM-Element, an das der Button angehängt wird.       |
| `buttonText`            | `string`                                                 | Ja               | Text auf dem Button.                                     |
| `onPaymentComplete`     | `() => void`                                             | Ja               | Callback bei erfolgreicher Zahlung.                      |
| `onPaymentDataReceived` | `(data: { walletAddress: string, id: string }) => void`  | Ja               | Callback bei Empfang von Zahlungsdaten.                  |
| `onPaymentError`        | `(error: Error) => void`                                 | Ja               | Callback bei Zahlungsfehlern.                            |
| `paymentUrl`            | `string`                                                 | Nein             | URL der Zahlungsseite.                                   |
| `paymentType`           | `"payment-link" | "invoice" | "recurring-payment"`      | Nein             | Zahlungsart (wird zur Generierung von `paymentUrl` genutzt). |
| `paymentId`             | `string`                                                 | Nein             | ID der Zahlung (wird zur Generierung von `paymentUrl` genutzt). |
| `buttonStyle`           | `Partial<CSSStyleDeclaration>`                           | Nein             | Benutzerdefinierte Stile für den Button.                 |

### SubscriptionCheckout

| **Prop**                         | **Typ**                                         | **Erforderlich** | **Beschreibung**                                  |
| -------------------------------- | ----------------------------------------------- | ---------------- | ------------------------------------------------ |
| `businessName`                   | `string`                                        | Ja               | Name des Unternehmens.                            |
| `businessLogo`                   | `string`                                        | Ja               | URL des Unternehmenslogos.                        |
| `plan`                           | `object`                                        | Ja               | Details zum Abonnementplan.                       |
| `plan.name`                      | `string`                                        | Ja               | Name des Plans.                                   |
| `plan.description`               | `string`                                        | Ja               | Beschreibung des Plans.                           |
| `plan.amount`                    | `number`                                        | Ja               | Betrag des Abonnements.                           |
| `plan.currency`                  | `string`                                        | Ja               | Währung (z.B. USD).                               |
| `plan.interval`                  | `string`                                        | Ja               | Abrechnungsintervall (z.B. monatlich).            |
| `plan.intervalCount`             | `number`                                        | Ja               | Anzahl der Intervalle (z.B. alle 2 Monate).       |
| `onWalletConnectPaymentComplete` | `(networkId: string, tokenId: string) => void`  | Nein             | Callback für erfolgreiche Wallet Connect Zahlungen. |
| `onWalletConnectPaymentError`    | `(error: Error) => void`                        | Nein             | Callback für Wallet Connect Fehler.                |
| `onQrCodePaymentComplete`        | `() => void`                                    | Nein             | Callback für erfolgreiche QR-Code Zahlungen.       |
| `onQrCodePaymentError`           | `(error: Error) => void`                        | Nein             | Callback für QR-Code Fehler.                       |
| `onCardPaymentComplete`          | `() => void`                                    | Nein             | Callback für erfolgreiche Kartenzahlungen.         |
| `onCardPaymentError`             | `(error: Error) => void`                        | Nein             | Callback für Kartenfehler.                         |
| `amount`                         | `number`                                        | Ja               | Abonnementbetrag.                                 |
| `recipientWalletAddress`         | `string`                                        | Ja               | Wallet-Adresse des Empfängers.                     |
| `paymentLinkId`                  | `string`                                        | Ja               | ID des Zahlungslinks.                              |

---

### InvoiceCheckout

| **Prop**                  | **Typ**                 | **Erforderlich** | **Beschreibung**                           |
| ------------------------- | ----------------------- | ---------------- | ----------------------------------------- |
| `businessName`            | `string`                | Ja               | Name des Unternehmens.                     |
| `businessLogo`            | `string`                | Ja               | URL des Unternehmenslogos.                 |
| `description`             | `string`                | Ja               | Beschreibung der Rechnung.                 |
| `amount`                  | `number`                | Ja               | Rechnungsbetrag.                           |
| `recipientWalletAddress`  | `string`                | Ja               | Wallet-Adresse des Empfängers.             |
| `onQrCodePaymentComplete` | `() => void`            | Nein             | Callback für erfolgreiche QR-Code Zahlungen. |
| `onQrCodePaymentError`    | `(error: Error) => void`| Nein             | Callback für QR-Code Fehler.               |
| `onCardPaymentComplete`   | `() => void`            | Nein             | Callback für erfolgreiche Kartenzahlungen. |
| `onCardPaymentError`      | `(error: Error) => void`| Nein             | Callback für Kartenfehler.                 |
| `paymentLinkId`           | `string`                | Ja               | ID des Zahlungslinks für die Rechnung.     |

---

### PaymentLinkCheckout

| **Prop**                         | **Typ**                                         | **Erforderlich** | **Beschreibung**                                  |
| -------------------------------- | ----------------------------------------------- | ---------------- | ------------------------------------------------ |
| `businessName`                   | `string`                                        | Ja               | Name des Unternehmens.                            |
| `businessLogo`                   | `string`                                        | Ja               | URL des Unternehmenslogos.                        |
| `bannerImage`                    | `string`                                        | Nein             | URL des Banners für die Zahlungsseite.            |
| `title`                          | `string`                                        | Ja               | Titel der Zahlungsanforderung.                    |
| `description`                    | `string`                                        | Ja               | Beschreibung der Zahlungsanforderung.             |
| `amount`                         | `number`                                        | Ja               | Zahlungsbetrag.                                   |
| `recipientWalletAddress`         | `string`                                        | Ja               | Wallet-Adresse des Empfängers.                    |
| `onWalletConnectPaymentComplete` | `(networkId: string, tokenId: string) => void`  | Nein             | Callback für erfolgreiche Wallet Connect Zahlungen. |
| `onWalletConnectPaymentError`    | `(error: Error) => void`                        | Nein             | Callback für Wallet Connect Fehler.               |
| `onQrCodePaymentComplete`        | `() => void`                                    | Nein             | Callback für erfolgreiche QR-Code Zahlungen.      |
| `onQrCodePaymentError`           | `(error: Error) => void`                        | Nein             | Callback für QR-Code Fehler.                      |
| `onCardPaymentComplete`          | `() => void`                                    | Nein             | Callback für erfolgreiche Kartenzahlungen.        |
| `onCardPaymentError`             | `(error: Error) => void`                        | Nein             | Callback für Kartenfehler.                        |
| `paymentLinkId`                  | `string`                                        | Ja               | ID des Zahlungslinks.                             |

---

### Fehlerbehandlung

Geben Sie immer Fehler-Callbacks für Checkout-Komponenten an (`onWalletConnectPaymentError`, `onQrCodePaymentError`, `onCardPaymentError`), um Zahlungsfehler elegant zu behandeln. Das sorgt für ein besseres Nutzererlebnis und erleichtert das Debugging.

---

### Integration mit Backend SDK

Kombinieren Sie das Client SDK mit dem Backend SDK für eine vollständige Zahlungslösung.

---

## 🛡️ Häufige Probleme

### TypeScript-Fehler

Stellen Sie sicher, dass Ihre `tsconfig.json` Folgendes enthält:

```json
{
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### JSX-Fehler

Falls Sie auf JSX-Fehler stoßen, stellen Sie sicher, dass Ihre `tsconfig.json` Folgendes enthält:

```json
{
  "jsx": "react-jsx"
}
```

---

🎉 Das war's! Sie sind jetzt bereit, das **Mileston Payment Client SDK** wie ein Profi zu integrieren. Bei Fragen einfach melden – gemeinsam bauen wir Großartiges! ✨

## Abschluss

Und das war's! Mit dem **Mileston Payment Client SDK** ist die Integration von Krypto-Zahlungen in Ihre App ein Kinderspiel. Bei Fragen oder Problemen einfach melden. Viel Spaß beim Coden und auf gute Verkäufe! ☕🛍️

---

_Hinweis: Für weitere Informationen und Referenzen besuchen Sie das [Mileston Payment Client SDK GitHub Repository](https://github.com/Mileston-co/mileston-payment-client). Das SDK ist Open Source – gerne Pull Requests einreichen!_
