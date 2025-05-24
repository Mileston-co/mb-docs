---
sidebar_position: 2
---

# Komponenten-Dokumentation

Dieses Dokument bietet einen umfassenden Überblick über die in der Mileston Payment Client SDK verfügbaren React-Komponenten. **Hinweis:** Alle Komponenten benötigen den `MilestonPaymentProvider`, der `apikey` (Checkout-API-Schlüssel) und `businessid` per Kontext bereitstellt.

---

## MilestonPaymentProvider

Ein React Context Provider zur Verwaltung von API-Schlüssel und Business-ID. Dieser Provider muss Ihre Komponentenhierarchie umschließen, damit andere Komponenten im SDK darauf zugreifen können.

### Verwendung

```typescript
import { MilestonPaymentProvider } from "mileston-payment-client";

function App() {
  return (
    <MilestonPaymentProvider
      apikey="your-api-key"
      businessid="your-business-id"
    >
      {/* Ihre Anwendungskomponenten */}
    </MilestonPaymentProvider>
  );
}
```

### Props

| Prop Name    | Typ       | Beschreibung                                         |
| ------------ | --------- | ---------------------------------------------------- |
| `apikey`     | string    | Ihr API-Schlüssel für die Authentifizierung.         |
| `businessid` | string    | Ihre Business-ID zur Identifikation Ihres Geschäfts. |
| `children`   | ReactNode | Die Kindkomponenten, die den Kontext nutzen.         |

### Hinweise

- Der Provider muss Ihre gesamte Anwendung oder die Komponenten umschließen, die Zugriff auf `apikey` und `businessid` benötigen.
- Dieser Provider ist für Komponenten wie `PayButton`, `InvoiceCheckout`, `SubscriptionCheckout` usw. erforderlich.

---

## PayButton

Eine React-Komponente zum Starten von Zahlungen. Diese Komponente bietet einen anpassbaren Button, der ein Popup für die Zahlungsabwicklung öffnet.

### Verwendung

```typescript
import { MilestonPaymentProvider, PayButton } from "mileston-payment-client";

function App() {
  return (
    <MilestonPaymentProvider
      apikey="your-api-key"
      businessid="your-business-id"
    >
      <PayButton
        onPaymentComplete={() => console.log("Zahlung abgeschlossen!")}
        onPaymentError={(error) => console.error("Zahlungsfehler:", error)}
        paymentUrl="https://checkout.mileston.co/payment"
        paymentId="payment-id"
        paymentType="invoice"
        theme="light"
        style={{ backgroundColor: "green", color: "white" }}
        className="custom-class"
      >
        Jetzt bezahlen
      </PayButton>
    </MilestonPaymentProvider>
  );
}
```

### Props

| Prop Name           | Typ       | Beschreibung                                               |
| ------------------- | --------- | ---------------------------------------------------------- |
| `onPaymentComplete` | function  | Callback bei erfolgreicher Zahlung.                        |
| `onPaymentError`    | function  | Callback bei Zahlungsfehlern.                              |
| `paymentUrl`        | string    | URL der Zahlungsseite.                                     |
| `paymentId`         | string    | ID der Zahlung (z.B. Rechnung, Zahlungslink).              |
| `paymentType`       | string    | Zahlungsart (z.B. "invoice", "payment-link", "recurring"). |
| `theme`             | string    | Theme für das Zahlungs-Popup (z.B. "light", "dark").       |
| `style`             | object    | Benutzerdefinierte Stile für den Button.                   |
| `className`         | string    | CSS-Klasse für den Button.                                 |
| `children`          | ReactNode | Inhalt des Buttons (z.B. "Jetzt bezahlen").                |

### Hinweise

- Der `MilestonPaymentProvider` muss Ihre Komponentenhierarchie umschließen.
- Das Aussehen des Buttons kann mit `style` und `className` angepasst werden.
- Mit dem `theme`-Prop kann das visuelle Theme des Zahlungs-Popups gesetzt werden.

---

## SubscriptionCheckout

Eine React-Komponente für abonnementbasierte Zahlungen. Diese Komponente vereinfacht das Einrichten wiederkehrender Zahlungen.

### Verwendung

```typescript
import {
  MilestonPaymentProvider,
  SubscriptionCheckout,
} from "mileston-payment-client";

<MilestonPaymentProvider apikey="your-api-key" businessid="your-business-id">
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
    walletConnectButtonText="Mit Wallet abonnieren"
    qrCodeButtonText="Abo-QR generieren"
    cardButtonText="Mit Karte abonnieren"
    buttonClassName="custom-button-class"
    dialogTitle="Kartenabonnement"
    dialogDescription="Richten Sie Ihre wiederkehrende Zahlung sicher ein"
    className="custom-class"
    footerText="Danke für Ihr Abonnement!"
    cancelText="Sie können Ihr Abonnement jederzeit kündigen"
    paymentLinkId="subscription123"
    env="test"
    onWalletConnectPaymentComplete={() =>
      console.log("Wallet-Abo-Zahlung abgeschlossen")
    }
    onWalletConnectPaymentError={(error) =>
      console.error("Wallet-Abo-Zahlungsfehler:", error)
    }
    onQrCodePaymentComplete={() =>
      console.log("QR-Code-Abo-Zahlung abgeschlossen")
    }
    onQrCodePaymentError={(error) =>
      console.error("QR-Code-Abo-Zahlungsfehler:", error)
    }
    onCardPaymentComplete={() =>
      console.log("Karten-Abo-Zahlung abgeschlossen")
    }
    onCardPaymentError={(error) =>
      console.error("Karten-Abo-Zahlungsfehler:", error)
    }
    amount={19.99}
    recipientWalletAddress="0x123456789abcdef"
  />
</MilestonPaymentProvider>;
```

### Props

| Prop Name                        | Typ      | Beschreibung                                                        |
| -------------------------------- | -------- | ------------------------------------------------------------------- |
| `businessName`                   | string   | Name des Unternehmens.                                              |
| `businessLogo`                   | string   | URL des Unternehmenslogos.                                          |
| `plan`                           | object   | Details zum Abonnementplan.                                         |
| `plan.name`                      | string   | Name des Plans.                                                     |
| `plan.description`               | string   | Beschreibung des Plans.                                             |
| `plan.amount`                    | number   | Betrag des Abonnements.                                             |
| `plan.currency`                  | string   | Währung (z.B. USD, EUR).                                            |
| `plan.interval`                  | string   | Abrechnungsintervall (z.B. täglich, monatlich, jährlich).           |
| `plan.intervalCount`             | number   | Anzahl der Intervalle zwischen Abrechnungen (z.B. 1 für monatlich). |
| `walletConnectButtonText`        | string   | Text für den Wallet Connect Button.                                 |
| `qrCodeButtonText`               | string   | Text für den QR-Code Button.                                        |
| `cardButtonText`                 | string   | Text für den Karten-Button.                                         |
| `buttonClassName`                | string   | CSS-Klasse für die Buttons.                                         |
| `dialogTitle`                    | string   | Titel für den Kartenzahlungsdialog.                                 |
| `dialogDescription`              | string   | Beschreibung für den Kartenzahlungsdialog.                          |
| `className`                      | string   | CSS-Klasse für die Hauptkomponente.                                 |
| `footerText`                     | string   | Fußzeilentext für die Komponente.                                   |
| `cancelText`                     | string   | Text für die Kündigungsnachricht.                                   |
| `paymentLinkId`                  | string   | ID des Zahlungslinks.                                               |
| `env`                            | string   | Umgebung (z.B. test, production).                                   |
| `onWalletConnectPaymentComplete` | function | Callback für erfolgreiche Wallet Connect Zahlungen.                 |
| `onWalletConnectPaymentError`    | function | Callback für Wallet Connect Fehler.                                 |
| `onQrCodePaymentComplete`        | function | Callback für erfolgreiche QR-Code Zahlungen.                        |
| `onQrCodePaymentError`           | function | Callback für QR-Code Fehler.                                        |
| `onCardPaymentComplete`          | function | Callback für erfolgreiche Kartenzahlungen.                          |
| `onCardPaymentError`             | function | Callback für Kartenfehler.                                          |
| `amount`                         | number   | Abonnementbetrag.                                                   |
| `recipientWalletAddress`         | string   | Wallet-Adresse des Empfängers.                                      |

### Hinweise

- Nutzen Sie diese Komponente für ein effizientes Abonnementmanagement.
- Die Details des Abonnementplans können über das `plan`-Prop angepasst werden.
- Die `recipientWalletAddress` muss gültig sein, um Zahlungsfehler zu vermeiden.
- Mit dem `cancelText`-Prop können Sie eine Kündigungsnachricht anzeigen.

---

## InvoiceCheckout

Eine React-Komponente für rechnungsbasierte Zahlungen. Ideal für einmalige Zahlungen.

### Verwendung

```typescript
import {
  MilestonPaymentProvider,
  InvoiceCheckout,
} from "mileston-payment-client";

<MilestonPaymentProvider apikey="your-api-key" businessid="your-business-id">
  <InvoiceCheckout
    businessName="Mein Unternehmen"
    businessLogo="https://example.com/logo.png"
    currency="USD"
    description="Rechnung #12345"
    walletConnectButtonText="Wallet verbinden & bezahlen"
    qrCodeButtonText="Zahlungs-QR generieren"
    cardButtonText="Mit Karte bezahlen"
    buttonClassName="custom-button-class"
    dialogTitle="Rechnung bezahlen"
    dialogDescription="Schließen Sie Ihre Zahlung sicher ab"
    className="custom-class"
    footerText="Danke für Ihr Vertrauen!"
    paymentLinkId="invoice123"
    env="test"
    onWalletConnectPaymentComplete={() =>
      console.log("Wallet-Zahlung abgeschlossen")
    }
    onWalletConnectPaymentError={(error) =>
      console.error("Wallet-Zahlungsfehler:", error)
    }
    onQrCodePaymentComplete={() => console.log("QR-Code-Zahlung abgeschlossen")}
    onQrCodePaymentError={(error) =>
      console.error("QR-Code-Zahlungsfehler:", error)
    }
    onCardPaymentComplete={() => console.log("Kartenzahlung abgeschlossen")}
    onCardPaymentError={(error) =>
      console.error("Kartenzahlungsfehler:", error)
    }
    amount={200}
    recipientWalletAddress="0x123456789abcdef"
  />
</MilestonPaymentProvider>;
```

### Props

| Prop Name                        | Typ      | Beschreibung                                        |
| -------------------------------- | -------- | --------------------------------------------------- |
| `businessName`                   | string   | Name des Unternehmens.                              |
| `businessLogo`                   | string   | URL des Unternehmenslogos.                          |
| `currency`                       | string   | Währung (z.B. USD).                                 |
| `description`                    | string   | Beschreibung der Rechnung.                          |
| `walletConnectButtonText`        | string   | Text für den Wallet Connect Button.                 |
| `qrCodeButtonText`               | string   | Text für den QR-Code Button.                        |
| `cardButtonText`                 | string   | Text für den Karten-Button.                         |
| `buttonClassName`                | string   | CSS-Klasse für die Buttons.                         |
| `dialogTitle`                    | string   | Titel für den Kartenzahlungsdialog.                 |
| `dialogDescription`              | string   | Beschreibung für den Kartenzahlungsdialog.          |
| `className`                      | string   | CSS-Klasse für die Hauptkomponente.                 |
| `footerText`                     | string   | Fußzeilentext für die Komponente.                   |
| `paymentLinkId`                  | string   | ID des Zahlungslinks.                               |
| `env`                            | string   | Umgebung (z.B. test, production).                   |
| `onWalletConnectPaymentComplete` | function | Callback für erfolgreiche Wallet Connect Zahlungen. |
| `onWalletConnectPaymentError`    | function | Callback für Wallet Connect Fehler.                 |
| `onQrCodePaymentComplete`        | function | Callback für erfolgreiche QR-Code Zahlungen.        |
| `onQrCodePaymentError`           | function | Callback für QR-Code Fehler.                        |
| `onCardPaymentComplete`          | function | Callback für erfolgreiche Kartenzahlungen.          |
| `onCardPaymentError`             | function | Callback für Kartenfehler.                          |
| `amount`                         | number   | Rechnungsbetrag.                                    |
| `recipientWalletAddress`         | string   | Wallet-Adresse des Empfängers.                      |

### Hinweise

- Nutzen Sie diese Komponente für einmalige Zahlungen wie Rechnungen.
- Die `recipientWalletAddress` muss gültig sein, um Zahlungsfehler zu vermeiden.
- Das Aussehen und Verhalten kann über die bereitgestellten Props angepasst werden.

---

## PaymentLinkCheckout

Eine React-Komponente für zahlungslinkbasierte Zahlungen. Nützlich, um Zahlungslinks für Kunden zu generieren.

### Verwendung

```typescript
import {
  MilestonPaymentProvider,
  PaymentLinkCheckout,
} from "mileston-payment-client";

<MilestonPaymentProvider apikey="your-api-key" businessid="your-business-id">
  <PaymentLinkCheckout
    businessName="Mein Unternehmen"
    businessLogo="https://example.com/logo.png"
    bannerImage="https://example.com/banner.png"
    title="Zahlungsanforderung"
    currency="USD"
    description="Bezahlen Sie Ihre Bestellung"
    walletConnectButtonText="Wallet verbinden & bezahlen"
    qrCodeButtonText="Zahlungs-QR generieren"
    cardButtonText="Mit Karte bezahlen"
    buttonClassName="custom-button-class"
    dialogTitle="Sicher bezahlen"
    dialogDescription="Schließen Sie Ihre Zahlung sicher ab"
    className="custom-class"
    footerText="Danke für Ihre Zahlung!"
    paymentLinkId="payment123"
    env="test"
    onWalletConnectPaymentComplete={() =>
      console.log("Wallet-Zahlung abgeschlossen")
    }
    onWalletConnectPaymentError={(error) =>
      console.error("Wallet-Zahlungsfehler:", error)
    }
    onQrCodePaymentComplete={() => console.log("QR-Code-Zahlung abgeschlossen")}
    onQrCodePaymentError={(error) =>
      console.error("QR-Code-Zahlungsfehler:", error)
    }
    onCardPaymentComplete={() => console.log("Kartenzahlung abgeschlossen")}
    onCardPaymentError={(error) =>
      console.error("Kartenzahlungsfehler:", error)
    }
    amount={100}
    recipientWalletAddress="0x123456789abcdef"
  />
</MilestonPaymentProvider>;
```

### Props

| Prop Name                        | Typ      | Beschreibung                                        |
| -------------------------------- | -------- | --------------------------------------------------- |
| `businessName`                   | string   | Name des Unternehmens.                              |
| `businessLogo`                   | string   | URL des Unternehmenslogos.                          |
| `bannerImage`                    | string   | URL des Banners für die Zahlungsseite.              |
| `title`                          | string   | Titel der Zahlungsanforderung.                      |
| `currency`                       | string   | Währung (z.B. USD).                                 |
| `description`                    | string   | Beschreibung der Zahlungsanforderung.               |
| `walletConnectButtonText`        | string   | Text für den Wallet Connect Button.                 |
| `qrCodeButtonText`               | string   | Text für den QR-Code Button.                        |
| `cardButtonText`                 | string   | Text für den Karten-Button.                         |
| `buttonClassName`                | string   | CSS-Klasse für die Buttons.                         |
| `dialogTitle`                    | string   | Titel für den Kartenzahlungsdialog.                 |
| `dialogDescription`              | string   | Beschreibung für den Kartenzahlungsdialog.          |
| `className`                      | string   | CSS-Klasse für die Hauptkomponente.                 |
| `footerText`                     | string   | Fußzeilentext für die Komponente.                   |
| `paymentLinkId`                  | string   | ID des Zahlungslinks.                               |
| `env`                            | string   | Umgebung (z.B. test, production).                   |
| `onWalletConnectPaymentComplete` | function | Callback für erfolgreiche Wallet Connect Zahlungen. |
| `onWalletConnectPaymentError`    | function | Callback für Wallet Connect Fehler.                 |
| `onQrCodePaymentComplete`        | function | Callback für erfolgreiche QR-Code Zahlungen.        |
| `onQrCodePaymentError`           | function | Callback für QR-Code Fehler.                        |
| `onCardPaymentComplete`          | function | Callback für erfolgreiche Kartenzahlungen.          |
| `onCardPaymentError`             | function | Callback für Kartenfehler.                          |
| `amount`                         | number   | Zahlungsbetrag.                                     |
| `recipientWalletAddress`         | string   | Wallet-Adresse des Empfängers.                      |

### Hinweise

- Nutzen Sie diese Komponente, um Zahlungslinks für Kunden zu generieren.
- Das Aussehen der Zahlungsseite kann mit `bannerImage` und `title` angepasst werden.
- Die `recipientWalletAddress` muss gültig sein, um Zahlungsfehler zu vermeiden.

---

## PaymentOptions

Eine React-Komponente zur Anzeige verfügbarer Zahlungsoptionen. Sie bietet Tabs für Wallet Connect, QR-Code und Kartenzahlung.

### Verwendung

```typescript
import { PaymentOptions } from "mileston-payment-client";

function App() {
  return (
    <PaymentOptions
      walletConnectButtonText="Wallet verbinden & bezahlen"
      qrCodeButtonText="Zahlungs-QR generieren"
      cardButtonText="Mit Karte bezahlen"
      buttonClassName="custom-button-class"
      dialogTitle="Sicher bezahlen"
      dialogDescription="Schließen Sie Ihre Zahlung sicher ab"
      defaultTab="wallet"
      onTabChange={(tab) => console.log("Ausgewählter Tab:", tab)}
      onWalletConnectPaymentComplete={(networkId, tokenId) =>
        console.log("Wallet-Zahlung abgeschlossen:", networkId, tokenId)
      }
      onWalletConnectPaymentError={(error) =>
        console.error("Wallet-Zahlungsfehler:", error)
      }
      onQrCodePaymentComplete={(networkId, tokenId) =>
        console.log("QR-Code-Zahlung abgeschlossen:", networkId, tokenId)
      }
      onQrCodePaymentError={(error) =>
        console.error("QR-Code-Zahlungsfehler:", error)
      }
      onCardPaymentComplete={() => console.log("Kartenzahlung abgeschlossen")}
      onCardPaymentError={(error) =>
        console.error("Kartenzahlungsfehler:", error)
      }
      amount={100}
      env="test"
      recipientWalletAddress="0x123456789abcdef"
      paymentType="invoice"
      paymentLinkId="payment123"
    />
  );
}
```

### Props

| Prop Name                        | Typ      | Beschreibung                                                      |
| -------------------------------- | -------- | ----------------------------------------------------------------- |
| `walletConnectButtonText`        | string   | Text für den Wallet Connect Button.                               |
| `qrCodeButtonText`               | string   | Text für den QR-Code Button.                                      |
| `cardButtonText`                 | string   | Text für den Karten-Button.                                       |
| `buttonClassName`                | string   | CSS-Klasse für die Buttons.                                       |
| `dialogTitle`                    | string   | Titel für den Kartenzahlungsdialog.                               |
| `dialogDescription`              | string   | Beschreibung für den Kartenzahlungsdialog.                        |
| `defaultTab`                     | string   | Standardmäßig ausgewählter Tab (z.B. "wallet", "qrcode", "card"). |
| `onTabChange`                    | function | Callback bei Tab-Wechsel.                                         |
| `onWalletConnectPaymentComplete` | function | Callback für erfolgreiche Wallet Connect Zahlungen.               |
| `onWalletConnectPaymentError`    | function | Callback für Wallet Connect Fehler.                               |
| `onQrCodePaymentComplete`        | function | Callback für erfolgreiche QR-Code Zahlungen.                      |
| `onQrCodePaymentError`           | function | Callback für QR-Code Fehler.                                      |
| `onCardPaymentComplete`          | function | Callback für erfolgreiche Kartenzahlungen.                        |
| `onCardPaymentError`             | function | Callback für Kartenfehler.                                        |
| `amount`                         | number   | Zahlungsbetrag.                                                   |
| `env`                            | string   | Umgebung (z.B. test, production).                                 |
| `recipientWalletAddress`         | string   | Wallet-Adresse des Empfängers.                                    |
| `paymentType`                    | string   | Zahlungsart (z.B. "invoice", "payment-link", "recurring").        |
| `paymentLinkId`                  | string   | ID des Zahlungslinks.                                             |

### Hinweise

- Nutzen Sie diese Komponente, um Nutzern mehrere Zahlungsoptionen anzubieten.
- Das Aussehen der Buttons kann mit `buttonClassName` angepasst werden.
- Mit `defaultTab` kann die anfängliche Zahlungsart festgelegt werden.
- Die `recipientWalletAddress` muss gültig sein, um Zahlungsfehler zu vermeiden.

---

## SuiWalletProvider

Ein React Context Provider zur Integration von Sui-Blockchain-Wallets. Dieser Provider richtet die nötigen Konfigurationen für Sui-Netzwerke und Wallet-Verbindungen ein.

### Verwendung

```typescript
import SuiWalletProvider from "mileston-payment-client";

function App() {
  return (
    <SuiWalletProvider>{/* Ihre Anwendungskomponenten */}</SuiWalletProvider>
  );
}
```

### Props

| Prop Name  | Typ       | Beschreibung                                        |
| ---------- | --------- | --------------------------------------------------- |
| `children` | ReactNode | Die Kindkomponenten, die den Wallet-Kontext nutzen. |

### Hinweise

- Standardmäßig ist das Netzwerk auf `testnet` gesetzt, aber auch `mainnet` wird unterstützt.

### Features

- **Netzwerkkonfiguration**: Konfiguriert Sui-Netzwerke (`testnet` und `mainnet`) mit `createNetworkConfig`.
- **Auto-Verbindung**: Verbindet sich automatisch mit der Wallet beim Initialisieren.
- **Query Management**: Nutzt `QueryClientProvider` für Query- und Cache-Management.

---

## WalletConnectPayment

Eine React-Komponente für Zahlungen via WalletConnect. Unterstützt mehrere Blockchains und Tokens.

### Verwendung

```typescript
import { WalletConnectPayment } from "mileston-payment-client";

function App() {
  return (
    <WalletConnectPayment
      onPaymentComplete={(networkId, tokenId) =>
        console.log("Zahlung abgeschlossen:", networkId, tokenId)
      }
      onPaymentError={(error) => console.error("Zahlungsfehler:", error)}
      buttonText="Wallet verbinden & bezahlen"
      buttonClassName="custom-class"
      recipientWalletAddress={{
        eth: "0x123456789abcdef",
        sui: "sui-address",
        solana: "solana-address",
      }}
      amount={100}
      paymentLinkId="payment123"
      env="test"
      paymentType="invoice"
      userUUID="user-uuid"
    />
  );
}
```

### Props

| Prop Name                | Typ      | Beschreibung                                  |
| ------------------------ | -------- | --------------------------------------------- |
| `onPaymentComplete`      | function | Callback für erfolgreiche Zahlungen.          |
| `onPaymentError`         | function | Callback für Zahlungsfehler.                  |
| `buttonText`             | string   | Text für den Zahlungsbutton.                  |
| `buttonClassName`        | string   | CSS-Klasse für den Button.                    |
| `recipientWalletAddress` | object   | Wallet-Adressen für verschiedene Blockchains. |
| `amount`                 | number   | Zahlungsbetrag.                               |
| `paymentLinkId`          | string   | ID des Zahlungslinks.                         |
| `env`                    | string   | Umgebung (z.B. test, production).             |
| `paymentType`            | string   | Zahlungsart (z.B. invoice, recurring).        |
| `userUUID`               | string   | User-UUID zur Zahlungsnachverfolgung.         |

### Hinweise

- Unterstützt mehrere Blockchains wie Ethereum, Sui und Solana.
- Verbindet und verarbeitet Zahlungen automatisch.

---

## QrCodePayment

Eine React-Komponente zum Generieren und Verifizieren von QR-Code-Zahlungen.

### Verwendung

```typescript
import { QrCodePayment } from "mileston-payment-client";

function App() {
  return (
    <QrCodePayment
      onPaymentComplete={(networkId, tokenId) =>
        console.log("Zahlung abgeschlossen:", networkId, tokenId)
      }
      onPaymentError={(error) => console.error("Zahlungsfehler:", error)}
      buttonText="Zahlungs-QR generieren"
      buttonClassName="custom-class"
      recipientWalletAddress={{
        eth: "0x123456789abcdef",
        sui: "sui-address",
        solana: "solana-address",
      }}
      amount={100}
      paymentLinkId="payment123"
      env="test"
      paymentType="invoice"
      userUUID="user-uuid"
    />
  );
}
```

### Props

| Prop Name                | Typ      | Beschreibung                                  |
| ------------------------ | -------- | --------------------------------------------- |
| `onPaymentComplete`      | function | Callback für erfolgreiche Zahlungen.          |
| `onPaymentError`         | function | Callback für Zahlungsfehler.                  |
| `buttonText`             | string   | Text für den QR-Code-Button.                  |
| `buttonClassName`        | string   | CSS-Klasse für den Button.                    |
| `recipientWalletAddress` | object   | Wallet-Adressen für verschiedene Blockchains. |
| `amount`                 | number   | Zahlungsbetrag.                               |
| `paymentLinkId`          | string   | ID des Zahlungslinks.                         |
| `env`                    | string   | Umgebung (z.B. test, production).             |
| `paymentType`            | string   | Zahlungsart (z.B. invoice, recurring).        |
| `userUUID`               | string   | User-UUID zur Zahlungsnachverfolgung.         |

### Hinweise

- Generiert einen QR-Code für die Zahlung und prüft die Transaktion per Polling.
- Unterstützt mehrere Blockchains und Tokens.

---

## CardPayment

Eine React-Komponente für Kartenzahlungen. Sie integriert Onramp-Services zur Zahlungsabwicklung.

### Verwendung

```typescript
import { CardPayment } from "mileston-payment-client";

function App() {
  return (
    <CardPayment
      onPaymentComplete={() => console.log("Zahlung abgeschlossen")}
      onPaymentError={(error) => console.error("Zahlungsfehler:", error)}
      buttonText="Mit Karte bezahlen"
      buttonClassName="custom-class"
      recipientWalletAddress={{
        eth: "0x123456789abcdef",
        sui: "sui-address",
        solana: "solana-address",
      }}
      amount={100}
      paymentLinkId="payment123"
      env="test"
      paymentType="invoice"
      userUUID="user-uuid"
    />
  );
}
```

### Props

| Prop Name                | Typ      | Beschreibung                                  |
| ------------------------ | -------- | --------------------------------------------- |
| `onPaymentComplete`      | function | Callback für erfolgreiche Zahlungen.          |
| `onPaymentError`         | function | Callback für Zahlungsfehler.                  |
| `buttonText`             | string   | Text für den Zahlungsbutton.                  |
| `buttonClassName`        | string   | CSS-Klasse für den Button.                    |
| `recipientWalletAddress` | object   | Wallet-Adressen für verschiedene Blockchains. |
| `amount`                 | number   | Zahlungsbetrag.                               |
| `paymentLinkId`          | string   | ID des Zahlungslinks.                         |
| `env`                    | string   | Umgebung (z.B. test, production).             |
| `paymentType`            | string   | Zahlungsart (z.B. invoice, recurring).        |
| `userUUID`               | string   | User-UUID zur Zahlungsnachverfolgung.         |

### Hinweise

- Öffnet ein Popup für Kartenzahlungen über Onramp-Services.
- Verfolgt den Zahlungsstatus und aktualisiert die UI entsprechend.

---

## SolanaWalletProvider

Ein React Context Provider zur Integration von Solana-Blockchain-Wallets. Dieser Provider richtet die nötigen Konfigurationen für Solana-Netzwerke und Wallet-Verbindungen ein.

### Verwendung

```typescript
import SolanaWalletProvider from "mileston-payment-client";

function App() {
  return (
    <SolanaWalletProvider env="test">
      {/* Ihre Anwendungskomponenten */}
    </SolanaWalletProvider>
  );
}
```

### Props

| Prop Name  | Typ       | Beschreibung                                        |
| ---------- | --------- | --------------------------------------------------- |
| `children` | ReactNode | Die Kindkomponenten, die den Wallet-Kontext nutzen. |
| `env`      | string    | Die Umgebung (z.B. "test", "prod").                 |

### Hinweise

- Das `env`-Prop bestimmt, ob der Provider mit Mainnet oder Devnet verbindet.

### Features

- **Netzwerkkonfiguration**: Konfiguriert Solana-Netzwerke (`mainnet` und `devnet`) mit `clusterApiUrl`.
- **Auto-Verbindung**: Verbindet sich automatisch mit der Wallet beim Initialisieren.
- **Wallet-Modal**: Bietet ein Modal zur Auswahl und Verbindung von Wallets.

---
