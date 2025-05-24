# Funktionsdokumentation

Dieses Dokument bietet einen umfassenden Überblick über die Kernfunktionen des Mileston Payment Client SDK. Jede Funktion ist darauf ausgelegt, spezifische Aufgaben im Zusammenhang mit Zahlungen, Benutzerverwaltung und Wallet-Operationen zu übernehmen.

## fetchPayment

Ruft Zahlungsdetails vom Server ab. Diese Funktion ist vielseitig und unterstützt das Abrufen von Details für Rechnungen, Zahlungslinks und wiederkehrende Zahlungen.

### Verwendung

```typescript
import { fetchPayment } from "mileston-payment-client";

const paymentDetails = await fetchPayment({
  apikey: "Ihr-API-Schlüssel", // Verwenden Sie hier Ihren Checkout-API-Schlüssel
  businessid: "Ihre-Geschäfts-ID",
  paymentId: "Zahlungs-ID",
  paymentType: "invoice", // oder "payment-link", "recurring"
});
console.log(paymentDetails);
```

### Parameter

| Parametername | Typ    | Beschreibung                                                 |
| ------------- | ------ | ------------------------------------------------------------ |
| `apikey`      | string | Ihr API-Schlüssel. Wird für die Authentifizierung benötigt.  |
| `businessid`  | string | Ihre Geschäfts-ID. Identifiziert Ihr Unternehmen im System.  |
| `paymentId`   | string | Die ID der abzurufenden Zahlung. Eindeutig für jede Zahlung. |
| `paymentType` | string | Der Zahlungstyp. Unterstützte Werte:                         |
|               |        | - `"invoice"`: Für Rechnungszahlungen.                       |
|               |        | - `"payment-link"`: Für Zahlungen über Zahlungslinks.        |
|               |        | - `"recurring"`: Für wiederkehrende Zahlungen.               |

### Rückgabewert

| Rückgabetyp       | Beschreibung                                                                           |
| ----------------- | -------------------------------------------------------------------------------------- |
| `Promise<object>` | Ein Promise, das die Zahlungsdetails enthält. Die Struktur hängt vom `paymentType` ab. |

### Hinweise

- Stellen Sie sicher, dass `apikey` und `businessid` gültig sind, sonst schlägt die Anfrage fehl.
- Fehler sollten durch einen `try-catch`-Block abgefangen werden.

---

## getUserDetails

Ruft Benutzerdetails vom Server ab. Diese Funktion ist nützlich, um Informationen über einen bestimmten Benutzer Ihres Unternehmens zu erhalten.

### Verwendung

```typescript
import { getUserDetails } from "mileston-payment-client";

const userDetails = await getUserDetails("Ihr-API-Schlüssel", "Geschäfts-ID");
console.log(userDetails);
```

### Parameter

| Parametername | Typ    | Beschreibung                                                |
| ------------- | ------ | ----------------------------------------------------------- |
| `apikey`      | string | Ihr API-Schlüssel. Wird für die Authentifizierung benötigt. |
| `businessId`  | string | Die Geschäfts-ID für die Header. Pflichtfeld.               |

### Rückgabewert

| Rückgabetyp       | Beschreibung                                                                                                                     |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `Promise<object>` | Ein Promise, das die Benutzerdetails enthält. Die Antwort enthält benutzerspezifische Informationen wie Name, E-Mail und Rollen. |

### Hinweise

- Die Funktion wirft einen Fehler, wenn `apikey` oder `businessId` fehlt.
- Nutzen Sie diese Funktion, um Benutzerinformationen vor sensiblen Aktionen zu prüfen.

---

## MilestonPayButton

Eine Klasse zum Erstellen und Verwalten von Zahlungsbuttons. Diese Klasse bietet einen anpassbaren Button, der sich nahtlos in das Mileston Payment System integriert.

### Verwendung

```typescript
import { MilestonPayButton } from "mileston-payment-client";

const container = document.getElementById("payment-button-container");
const payButton = new MilestonPayButton(container, {
  buttonText: "Jetzt bezahlen",
  onPaymentComplete: () => console.log("Zahlung abgeschlossen!"),
  onPaymentError: (error) => console.error("Zahlungsfehler:", error),
});
```

### Methoden

| Methodenname        | Parameter                              | Rückgabetyp | Beschreibung                                                  |
| ------------------- | -------------------------------------- | ----------- | ------------------------------------------------------------- |
| `updateButtonText`  | `text: string`                         | `void`      | Aktualisiert den Button-Text.                                 |
| `updateButtonStyle` | `styles: Partial<CSSStyleDeclaration>` | `void`      | Aktualisiert das Button-Design für individuelles Styling.     |
| `destroy`           | Keine                                  | `void`      | Entfernt den Button aus dem DOM und räumt Event-Listener auf. |

### Hinweise

- Die Callbacks `onPaymentComplete` und `onPaymentError` sind wichtig für das Event-Handling.
- Stellen Sie sicher, dass das Container-Element im DOM existiert, bevor Sie den Button initialisieren.

---

## getOnRampData

Ruft Onramp-Daten für Zahlungen ab. Diese Funktion wird verwendet, um Informationen für Onramp-Transaktionen zu erhalten.

### Verwendung

```typescript
import { getOnRampData } from "mileston-payment-client";

const data = await getOnRampData(
  {
    amount: "100",
    recipientWalletAddress: "0xEmpfängerAdresse",
    chain: "eth", // oder "avax", "base", "pol", "arb"
  },
  "Ihr-API-Schlüssel",
  "Ihre-Geschäfts-ID"
);
console.log(data);
```

### Parameter

| Parametername            | Typ    | Beschreibung                          |
| ------------------------ | ------ | ------------------------------------- |
| `amount`                 | string | Der Betrag für das Onramp.            |
| `recipientWalletAddress` | string | Die Wallet-Adresse des Empfängers.    |
| `chain`                  | string | Das Blockchain-Netzwerk (z.B. "eth"). |
| `apikey`                 | string | Ihr API-Schlüssel.                    |
| `businessid`             | string | Ihre Geschäfts-ID.                    |

### Rückgabewert

| Rückgabetyp       | Beschreibung                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------ |
| `Promise<object>` | Ein Promise, das die Onramp-Daten enthält. Die Antwort enthält z.B. Zahlungslinks und Transaktionsmetadaten. |

### Hinweise

- Diese Funktion ist essenziell für die Integration von Onramp-Services.
- Prüfen Sie das `params`-Objekt auf alle erforderlichen Felder.

---

## getPaymentWallet

Verwaltet Wallet-bezogene Zahlungsoperationen. Diese Funktion ruft Informationen zu einem bestimmten Wallet-Typ ab.

### Verwendung

```typescript
import { getPaymentWallet } from "mileston-payment-client";

const walletData = await getPaymentWallet({
  apikey: "Ihr-API-Schlüssel",
  businessid: "Ihre-Geschäfts-ID",
  walletType: "sui", // oder "evm"
});
console.log(walletData);
```

### Parameter

| Parametername | Typ    | Beschreibung       |
| ------------- | ------ | ------------------ |
| `apikey`      | string | Ihr API-Schlüssel. |
| `businessid`  | string | Ihre Geschäfts-ID. |
| `walletType`  | string | Der Wallet-Typ.    |

### Rückgabewert

| Rückgabetyp       | Beschreibung                                                                                               |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| `Promise<object>` | Ein Promise, das die Wallet-Daten enthält. Die Antwort enthält Details wie Saldo und Transaktionshistorie. |

### Hinweise

- Nutzen Sie diese Funktion, um Wallet-Informationen vor Transaktionen zu prüfen.
- Fehler sollten benutzerfreundlich behandelt werden.

---

## savePayment

Speichert Zahlungsdetails auf dem Server. Diese Funktion dient dazu, Zahlungsinformationen für spätere Referenz oder Verarbeitung zu speichern.

### Verwendung

```typescript
import { savePayment } from "mileston-payment-client";

const response = await savePayment({
  apikey: "Ihr-API-Schlüssel",
  businessid: "Ihre-Geschäfts-ID",
  type: "invoice", // oder "payment-link", "recurring"
  body: {
    /* Zahlungsdetails */
  },
  nativeTokens: "optionale-native-tokens",
});
console.log(response);
```

### Parameter

| Parametername  | Typ    | Beschreibung                                                   |
| -------------- | ------ | -------------------------------------------------------------- |
| `apikey`       | string | Ihr API-Schlüssel.                                             |
| `businessid`   | string | Ihre Geschäfts-ID.                                             |
| `type`         | string | Der Zahlungstyp (z.B. "invoice", "payment-link", "recurring"). |
| `body`         | object | Die Zahlungsdetails.                                           |
| `nativeTokens` | string | Native Tokens für die Zahlung (optional).                      |

### Rückgabewert

| Rückgabetyp       | Beschreibung                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------- |
| `Promise<object>` | Ein Promise, das die Serverantwort enthält. Die Antwort bestätigt die gespeicherte Zahlung. |

### Hinweise

- Das `body`-Objekt muss alle erforderlichen Felder für den jeweiligen Zahlungstyp enthalten.
- Diese Funktion ist entscheidend für die sichere Speicherung von Zahlungsdaten.

---

## handlePayWithEVMWalletConnect

Verarbeitet Zahlungstransaktionen mit EVM-kompatiblen Wallets über WalletConnect. Unterstützt sowohl native Tokens (z.B. AVAX, POL, ETH) als auch ERC-20 Tokens (z.B. USDC, USDT).

### Verwendung

```typescript
import { handlePayWithEVMWalletConnect } from "mileston-payment-client";

const result = await handlePayWithEVMWalletConnect({
  env: "prod",
  evm: "eth",
  recipientAddress: "0xEmpfängerAdresse",
  amount: "100",
  token: "USDC",
});
console.log(result.txHash, result.payerAddress);
```

### Parameter

| Parametername      | Typ    | Beschreibung                                            |
| ------------------ | ------ | ------------------------------------------------------- |
| `env`              | string | Die Umgebung (z.B. "test", "prod").                     |
| `evm`              | string | Die EVM-Chain-ID (z.B. "eth", "pol").                   |
| `recipientAddress` | string | Die Wallet-Adresse des Empfängers.                      |
| `amount`           | string | Der zu sendende Betrag (in Token-Einheiten, nicht Wei). |
| `token`            | string | Der Token-Typ (z.B. "AVAX", "ETH", "USDC", "USDT").     |

### Rückgabewert

| Rückgabetyp       | Beschreibung                                                                           |
| ----------------- | -------------------------------------------------------------------------------------- |
| `Promise<object>` | Ein Promise mit den Transaktionsdetails, inkl. `txHash`, `feeHash` und `payerAddress`. |

### Beispiel

```typescript
const result = await handlePayWithEVMWalletConnect({
  env: "prod",
  evm: "eth",
  recipientAddress: "0xEmpfängerAdresse",
  amount: "100",
  token: "USDC",
});
console.log(result.txHash, result.payerAddress);
```

---
