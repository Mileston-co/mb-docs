# Hooks-Dokumentation

Dieses Dokument bietet einen umfassenden Überblick über die Hooks des Mileston Payment Client SDK. **Hinweis:** Alle Hooks erfordern, dass der `MilestonPaymentProvider` den Kontext mit `apikey (Checkout-API-Schlüssel)` und `businessid` bereitstellt.

---

## Beispiel: Verwendung des Providers mit Hooks

Um Hooks dieses SDKs zu nutzen, müssen Sie Ihre Anwendung oder Komponentenbaum mit dem `MilestonPaymentProvider` umschließen. Beispiel:

```typescript
import React from "react";
import {
  MilestonPaymentProvider,
  useFetchPayment,
} from "mileston-payment-client";

function PaymentDetails() {
  const { data, error, isLoading } = useFetchPayment({
    paymentId: "12345",
    paymentType: "invoice",
  });

  if (isLoading) return <p>Zahlungsdetails werden geladen...</p>;
  if (error) return <p>Fehler: {error.message}</p>;

  return (
    <div>
      <h2>Zahlungsdetails</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default function App() {
  return (
    <MilestonPaymentProvider
      apikey="Ihr-API-Schlüssel"
      businessid="Ihre-Geschäfts-ID"
    >
      <PaymentDetails />
    </MilestonPaymentProvider>
  );
}
```

---

## useFetchPayment

Ruft Zahlungsdetails mit einem React-Hook ab. Ideal, um Zahlungsinformationen in Echtzeit zu erhalten.

### Verwendung

```typescript
import { useFetchPayment } from "mileston-payment-client";

const { data, error, isLoading } = useFetchPayment({
  paymentId: "Zahlungs-ID",
  paymentType: "invoice", // oder "payment-link", "recurring"
});
```

### Parameter

| Parametername | Typ    | Beschreibung                                                   |
| ------------- | ------ | -------------------------------------------------------------- |
| `paymentId`   | string | Die ID der abzurufenden Zahlung.                               |
| `paymentType` | string | Der Zahlungstyp (z.B. "invoice", "payment-link", "recurring"). |

### Rückgabewerte

| Rückgabename | Typ     | Beschreibung                              |
| ------------ | ------- | ----------------------------------------- |
| `data`       | object  | Die abgerufenen Zahlungsdetails.          |
| `error`      | object  | Fehler, der beim Abrufen aufgetreten ist. |
| `isLoading`  | boolean | Gibt an, ob der Abrufvorgang läuft.       |

### Hinweise

- Der Komponentenbaum muss vom `MilestonPaymentProvider` umschlossen sein.
- Fehler sollten benutzerfreundlich behandelt werden.

---

## useGetOnRampData

Ruft Onramp-Daten für Zahlungen ab. Dieser Hook ist nützlich, um Onramp-Services in Ihre Anwendung zu integrieren.

### Verwendung

```typescript
import { useGetOnRampData } from "mileston-payment-client";

const { fetchOnRampData, data, error, loading } = useGetOnRampData();

await fetchOnRampData({
  amount: "100",
  recipientWalletAddress: "0xEmpfängerAdresse",
  chain: "eth", // oder "avax", "base", "pol", "arb"
});
```

### Parameter

| Parametername            | Typ    | Beschreibung                          |
| ------------------------ | ------ | ------------------------------------- |
| `amount`                 | string | Der Betrag für das Onramp.            |
| `recipientWalletAddress` | string | Die Wallet-Adresse des Empfängers.    |
| `chain`                  | string | Das Blockchain-Netzwerk (z.B. "eth"). |

### Rückgabewerte

| Rückgabename      | Typ                 | Beschreibung                           |
| ----------------- | ------------------- | -------------------------------------- | ----------------------------------------- |
| `fetchOnRampData` | function            | Funktion zum Abrufen der Onramp-Daten. |
| `data`            | `OnRampLinkResponse | null`                                  | Die abgerufenen Onramp-Daten.             |
| `error`           | `string             | null`                                  | Fehler, der beim Abrufen aufgetreten ist. |
| `loading`         | boolean             | Gibt an, ob der Abrufvorgang läuft.    |

### Hinweise

- Dieser Hook benötigt den Kontext des `MilestonPaymentProvider` mit `apikey` und `businessid`.
- Prüfen Sie das `params`-Objekt auf alle erforderlichen Felder.
- Fehler sollten benutzerfreundlich behandelt werden.

---

## useGetOnRampPaymentStatus

Ruft den Status einer Onramp-Zahlung ab. Dieser Hook ist essenziell, um den Zahlungsfortschritt zu verfolgen.

### Verwendung

```typescript
import { useGetOnRampPaymentStatus } from "mileston-payment-client";

const { fetchOnRampPaymentStatus, data, error, loading } =
  useGetOnRampPaymentStatus();

await fetchOnRampPaymentStatus({
  id: "Zahlungs-ID",
  amount: "100",
  chain: "eth", // oder "avax", "base", "pol", "arb"
  recipientWalletAddress: "0xEmpfängerAdresse",
});
```

### Parameter

| Parametername            | Typ    | Beschreibung                          |
| ------------------------ | ------ | ------------------------------------- |
| `id`                     | string | Die ID der Zahlung.                   |
| `amount`                 | string | Der Betrag der Zahlung.               |
| `chain`                  | string | Das Blockchain-Netzwerk (z.B. "eth"). |
| `recipientWalletAddress` | string | Die Wallet-Adresse des Empfängers.    |

### Rückgabewerte

| Rückgabename               | Typ                          | Beschreibung                             |
| -------------------------- | ---------------------------- | ---------------------------------------- | ----------------------------------------- |
| `fetchOnRampPaymentStatus` | function                     | Funktion zum Abrufen des Zahlungsstatus. |
| `data`                     | `OnRampPaymentStatusResponse | null`                                    | Die abgerufenen Statusdaten.              |
| `error`                    | `string                      | null`                                    | Fehler, der beim Abrufen aufgetreten ist. |
| `loading`                  | boolean                      | Gibt an, ob der Abrufvorgang läuft.      |

### Hinweise

- Dieser Hook benötigt den Kontext des `MilestonPaymentProvider` mit `apikey` und `businessid`.
- Nutzen Sie diesen Hook für Echtzeit-Updates.
- Fehler sollten benutzerfreundlich behandelt werden.

---

## useUserDetails

Ruft Benutzerdetails mit einem React-Hook ab. Nützlich, um benutzerspezifische Informationen zu erhalten.

### Verwendung

```typescript
import { useUserDetails } from "mileston-payment-client";

const { data, loading, error } = useUserDetails("Geschäfts-ID");
```

### Parameter

| Parametername    | Typ    | Beschreibung                                  |
| ---------------- | ------ | --------------------------------------------- |
| `pathBusinessId` | string | Die Geschäfts-ID für den URL-Pfad (optional). |

### Rückgabewerte

| Rückgabename | Typ       | Beschreibung                        |
| ------------ | --------- | ----------------------------------- | ----------------------------------------- |
| `data`       | `IGetUser | null`                               | Die abgerufenen Benutzerdetails.          |
| `loading`    | boolean   | Gibt an, ob der Abrufvorgang läuft. |
| `error`      | `Error    | null`                               | Fehler, der beim Abrufen aufgetreten ist. |

### Hinweise

- Dieser Hook benötigt den Kontext des `MilestonPaymentProvider` mit `apikey` und `businessid`.
- Nutzen Sie diesen Hook, um Benutzerinformationen vor sensiblen Aktionen zu prüfen.
- Fehler sollten benutzerfreundlich behandelt werden.

---

## usePayment

Verarbeitet Zahlungsoperationen mit einem React-Hook. Vereinfacht den Prozess der Zahlungseinleitung.

### Verwendung

```typescript
import { usePayment } from "mileston-payment-client";

const { initiatePayment, error, isProcessing } = usePayment();

await initiatePayment({
  type: "invoice", // oder "payment-link", "recurring"
  body: {
    /* Zahlungsdetails */
  },
  nativeTokens: "optionale-native-tokens",
});
```

### Parameter

| Parametername  | Typ    | Beschreibung                                                    |
| -------------- | ------ | --------------------------------------------------------------- |
| `type`         | string | Der Zahlungstyp (z.B. "invoice", "payment-link", "recurring").  |
| `body`         | object | Die Zahlungsdetails.                                            |
| `nativeTokens` | string | Native Tokens für die Zahlung (z.B. AVAX, POL, ETH). (optional) |

### Rückgabewerte

| Rückgabename      | Typ      | Beschreibung                                      |
| ----------------- | -------- | ------------------------------------------------- |
| `initiatePayment` | function | Funktion zum Starten des Zahlungsvorgangs.        |
| `error`           | object   | Fehler, der beim Zahlungsvorgang aufgetreten ist. |
| `isProcessing`    | boolean  | Gibt an, ob der Zahlungsvorgang läuft.            |

### Hinweise

- Der Komponentenbaum muss vom `MilestonPaymentProvider` umschlossen sein.
- Fehler sollten benutzerfreundlich behandelt werden.

---

## useSavePayment

Speichert Zahlungsdetails mit einem React-Hook. Nützlich für die sichere Speicherung von Zahlungsinformationen.

### Verwendung

```typescript
import { useSavePayment } from "mileston-payment-client";

const { triggerSavePayment, data, error, loading } = useSavePayment();

await triggerSavePayment(
  "invoice", // oder "payment-link", "recurring"
  {
    /* Zahlungsdetails */
  },
  "optionale-native-tokens"
);
```

### Parameter

| Parametername  | Typ    | Beschreibung                                                    |
| -------------- | ------ | --------------------------------------------------------------- |
| `type`         | string | Der Zahlungstyp (z.B. "invoice", "payment-link", "recurring").  |
| `body`         | object | Die Zahlungsdetails.                                            |
| `nativeTokens` | string | Native Tokens für die Zahlung (z.B. AVAX, POL, ETH). (optional) |

### Rückgabewerte

| Rückgabename         | Typ                  | Beschreibung                              |
| -------------------- | -------------------- | ----------------------------------------- | ------------------------------------------- |
| `triggerSavePayment` | function             | Funktion zum Speichern der Zahlungsdaten. |
| `data`               | `SavePaymentResponse | null`                                     | Die Antwort auf den Speichervorgang.        |
| `error`              | `string              | null`                                     | Fehler, der beim Speichern aufgetreten ist. |
| `loading`            | boolean              | Gibt an, ob der Speichervorgang läuft.    |

### Hinweise

- Dieser Hook benötigt den Kontext des `MilestonPaymentProvider` mit `apikey` und `businessid`.
- Nutzen Sie diesen Hook für die sichere Speicherung von Zahlungsdaten.
- Fehler sollten benutzerfreundlich behandelt werden.

---

## useSuiPayment

Ein React-Hook zur Abwicklung von Zahlungen auf der Sui-Blockchain.

### Verwendung

```typescript
import { useSuiPayment } from "mileston-payment-client";

const { handleSuiPayment } = useSuiPayment("test");

handleSuiPayment({
  amount: "100",
  recipientWalletAddress: "0xEmpfängerAdresse",
});
```

### Parameter

| Parametername            | Typ    | Beschreibung                        |
| ------------------------ | ------ | ----------------------------------- |
| `env`                    | string | Die Umgebung (z.B. "test", "prod"). |
| `amount`                 | string | Der Betrag für die Zahlung.         |
| `recipientWalletAddress` | string | Die Wallet-Adresse des Empfängers.  |

### Rückgabewerte

| Rückgabename       | Typ      | Beschreibung                            |
| ------------------ | -------- | --------------------------------------- |
| `handleSuiPayment` | function | Funktion zum Starten von Sui-Zahlungen. |

---

## useGetPaymentWallet

Ruft Wallet-Details für einen bestimmten Wallet-Typ mit einem React-Hook ab. Nützlich, um Informationen wie Saldo und Transaktionshistorie zu erhalten.

### Verwendung

```typescript
import { useGetPaymentWallet } from "mileston-payment-client";

const { fetchWallet, wallet, error, loading } = useGetPaymentWallet();

await fetchWallet("sui"); // oder "evm"
```

### Parameter

| Parametername | Typ          | Beschreibung                        |
| ------------- | ------------ | ----------------------------------- |
| `walletType`  | `WalletType` | Der Wallet-Typ (z.B. "sui", "evm"). |

### Rückgabewerte

| Rückgabename  | Typ               | Beschreibung                             |
| ------------- | ----------------- | ---------------------------------------- | ----------------------------------------- |
| `fetchWallet` | function          | Funktion zum Abrufen der Wallet-Details. |
| `wallet`      | `GetPaymentWallet | null`                                    | Die abgerufenen Wallet-Details.           |
| `error`       | `string           | null`                                    | Fehler, der beim Abrufen aufgetreten ist. |
| `loading`     | boolean           | Gibt an, ob der Abrufvorgang läuft.      |

### Hinweise

- Dieser Hook benötigt den Kontext des `MilestonPaymentProvider` mit `apikey` und `businessid`.
- Nutzen Sie diesen Hook, um Wallet-Informationen vor Transaktionen zu prüfen.
- Fehler sollten benutzerfreundlich behandelt werden.

---

## useVerifyPaymentWithWallet

Verifiziert eine Zahlung mit einem Wallet. Nützlich, um Zahlungen, die über Wallets getätigt wurden, zu bestätigen.

### Verwendung

```typescript
import { useVerifyPaymentWithWallet } from "mileston-payment-client";

const { verify, data, error, loading } = useVerifyPaymentWithWallet();

await verify(
  "invoice", // oder "payment-link", "recurring"
  {
    /* Zahlungsdetails */
  },
  "optionale-native-tokens"
);
```

### Parameter

| Parametername  | Typ    | Beschreibung                                                   |
| -------------- | ------ | -------------------------------------------------------------- |
| `type`         | string | Der Zahlungstyp (z.B. "invoice", "payment-link", "recurring"). |
| `body`         | object | Die Zahlungsdetails.                                           |
| `nativeTokens` | string | Native Tokens für die Zahlung (optional).                      |

### Rückgabewerte

| Rückgabename | Typ                      | Beschreibung                       |
| ------------ | ------------------------ | ---------------------------------- | ------------------------------------------------ |
| `verify`     | function                 | Funktion zur Zahlungsüberprüfung.  |
| `data`       | `VerifyPaymentWithWallet | null`                              | Die Antwort auf die Überprüfung.                 |
| `error`      | `string                  | null`                              | Fehler, der bei der Überprüfung aufgetreten ist. |
| `loading`    | boolean                  | Gibt an, ob die Überprüfung läuft. |

### Hinweise

- Dieser Hook benötigt den Kontext des `MilestonPaymentProvider` mit `apikey` und `businessid`.
- Nutzen Sie diesen Hook für eine sichere Zahlungsüberprüfung.
- Fehler sollten benutzerfreundlich behandelt werden.

---

## usePaymentContext

Bietet Zugriff auf den `PaymentContext`, der `apikey` und `businessid` enthält, wie sie dem `MilestonPaymentProvider` übergeben wurden. Essenziell, um diese Werte in Komponenten oder anderen Hooks zu nutzen.

### Verwendung

```typescript
import { usePaymentContext } from "mileston-payment-client";

function MyComponent() {
  const { apikey, businessid } = usePaymentContext();

  return (
    <div>
      <p>API-Schlüssel: {apikey}</p>
      <p>Geschäfts-ID: {businessid}</p>
    </div>
  );
}
```

### Rückgabewerte

| Rückgabename | Typ    | Beschreibung                                                          |
| ------------ | ------ | --------------------------------------------------------------------- |
| `apikey`     | string | Der API-Schlüssel, der dem `MilestonPaymentProvider` übergeben wurde. |
| `businessid` | string | Die Geschäfts-ID, die dem `MilestonPaymentProvider` übergeben wurde.  |

### Hinweise

- Dieser Hook muss innerhalb einer Komponente verwendet werden, die vom `MilestonPaymentProvider` umschlossen ist.
- Bei Verwendung außerhalb des Providers wird ein Fehler ausgelöst.

---

## useSolanaPayment

Ein React-Hook zur Abwicklung von Zahlungen auf der Solana-Blockchain.

### Verwendung

```typescript
import { useSolanaPayment } from "mileston-payment-client";

const { handleSolanaPayment } = useSolanaPayment("test");

handleSolanaPayment({
  amount: "100",
  recipientWalletAddress: "EmpfängerAdresse",
  token: "SOL", // oder "USDC", "USDT"
});
```

### Parameter

| Parametername            | Typ    | Beschreibung                        |
| ------------------------ | ------ | ----------------------------------- |
| `env`                    | string | Die Umgebung (z.B. "test", "prod"). |
| `amount`                 | string | Der Betrag für die Zahlung.         |
| `recipientWalletAddress` | string | Die Wallet-Adresse des Empfängers.  |
| `token`                  | string | Der Token-Typ (z.B. "SOL", "USDC"). |

### Rückgabewerte

| Rückgabename          | Typ      | Beschreibung                               |
| --------------------- | -------- | ------------------------------------------ |
| `handleSolanaPayment` | function | Funktion zum Starten von Solana-Zahlungen. |

### Hinweise

- Der Parameter `env` bestimmt, ob der Hook im Test- oder Produktionsmodus arbeitet.
- Die Wallet-Adresse des Empfängers muss gültig sein, um Zahlungsfehler zu vermeiden.
- Mit dem Parameter `token` kann der Token-Typ für die Zahlung festgelegt werden.

---
