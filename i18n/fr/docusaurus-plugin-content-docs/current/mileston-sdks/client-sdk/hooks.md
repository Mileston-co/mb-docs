# Documentation des Hooks

Ce document fournit une vue d'ensemble détaillée des hooks disponibles dans le SDK Client Mileston Payment. **Remarque :** Tous les hooks nécessitent que le `MilestonPaymentProvider` fournisse `apikey` (clé API Checkout) et `businessid` via le contexte.

---

## Exemple : Utilisation du Provider avec les Hooks

Pour utiliser les hooks de ce SDK, vous devez encapsuler votre application ou l'arbre de composants avec le `MilestonPaymentProvider`. Exemple :

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

  if (isLoading) return <p>Chargement des détails du paiement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <h2>Détails du paiement</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default function App() {
  return (
    <MilestonPaymentProvider
      apikey="votre-api-key"
      businessid="votre-business-id"
    >
      <PaymentDetails />
    </MilestonPaymentProvider>
  );
}
```

---

## useFetchPayment

Récupère les détails d'un paiement via un hook React. Idéal pour obtenir les informations de paiement en temps réel.

### Utilisation

```typescript
import { useFetchPayment } from "mileston-payment-client";

const { data, error, isLoading } = useFetchPayment({
  paymentId: "id-du-paiement",
  paymentType: "invoice", // ou "payment-link", "recurring"
});
```

### Paramètres

| Nom du paramètre | Type   | Description                                                        |
| ---------------- | ------ | ------------------------------------------------------------------ |
| `paymentId`      | string | L'identifiant du paiement à récupérer.                             |
| `paymentType`    | string | Le type de paiement (ex : "invoice", "payment-link", "recurring"). |

### Retour

| Nom du retour | Type    | Description                                    |
| ------------- | ------- | ---------------------------------------------- |
| `data`        | object  | Les détails du paiement récupérés.             |
| `error`       | object  | Toute erreur survenue lors de la récupération. |
| `isLoading`   | boolean | Indique si la récupération est en cours.       |

### Remarques

- Le composant doit être encapsulé par le `MilestonPaymentProvider` pour fournir le contexte nécessaire.
- Gérez les erreurs pour améliorer l'expérience utilisateur.

---

## useGetOnRampData

Récupère les données d'onramp pour les paiements. Ce hook est utile pour intégrer des services d'onramp dans votre application.

### Utilisation

```typescript
import { useGetOnRampData } from "mileston-payment-client";

const { fetchOnRampData, data, error, loading } = useGetOnRampData();

await fetchOnRampData({
  amount: "100",
  recipientWalletAddress: "0xAdresseDestinataire",
  chain: "eth", // ou "avax", "base", "pol", "arb"
});
```

### Paramètres

| Nom du paramètre         | Type   | Description                             |
| ------------------------ | ------ | --------------------------------------- |
| `amount`                 | string | Le montant pour l'onramp.               |
| `recipientWalletAddress` | string | L'adresse du portefeuille destinataire. |
| `chain`                  | string | Le réseau blockchain (ex : "eth").      |

### Retour

| Nom du retour     | Type                | Description                                   |
| ----------------- | ------------------- | --------------------------------------------- | ---------------------------------------------- |
| `fetchOnRampData` | function            | Fonction pour récupérer les données d'onramp. |
| `data`            | `OnRampLinkResponse | null`                                         | Les données d'onramp récupérées.               |
| `error`           | `string             | null`                                         | Toute erreur survenue lors de la récupération. |
| `loading`         | boolean             | Indique si la récupération est en cours.      |

### Remarques

- Ce hook dépend du contexte fourni par `MilestonPaymentProvider` (`apikey` et `businessid`).
- Vérifiez que l'objet `params` contient tous les champs requis.
- Gérez les erreurs pour améliorer l'expérience utilisateur.

---

## useGetOnRampPaymentStatus

Récupère le statut d'un paiement onramp. Ce hook est essentiel pour suivre la progression du paiement.

### Utilisation

```typescript
import { useGetOnRampPaymentStatus } from "mileston-payment-client";

const { fetchOnRampPaymentStatus, data, error, loading } =
  useGetOnRampPaymentStatus();

await fetchOnRampPaymentStatus({
  id: "id-du-paiement",
  amount: "100",
  chain: "eth", // ou "avax", "base", "pol", "arb"
  recipientWalletAddress: "0xAdresseDestinataire",
});
```

### Paramètres

| Nom du paramètre         | Type   | Description                             |
| ------------------------ | ------ | --------------------------------------- |
| `id`                     | string | L'identifiant du paiement.              |
| `amount`                 | string | Le montant du paiement.                 |
| `chain`                  | string | Le réseau blockchain (ex : "eth").      |
| `recipientWalletAddress` | string | L'adresse du portefeuille destinataire. |

### Retour

| Nom du retour              | Type                         | Description                                           |
| -------------------------- | ---------------------------- | ----------------------------------------------------- | ---------------------------------------------- |
| `fetchOnRampPaymentStatus` | function                     | Fonction pour récupérer le statut du paiement onramp. |
| `data`                     | `OnRampPaymentStatusResponse | null`                                                 | Les données de statut récupérées.              |
| `error`                    | `string                      | null`                                                 | Toute erreur survenue lors de la récupération. |
| `loading`                  | boolean                      | Indique si la récupération est en cours.              |

### Remarques

- Ce hook dépend du contexte fourni par `MilestonPaymentProvider` (`apikey` et `businessid`).
- Utilisez ce hook pour fournir des mises à jour en temps réel à vos utilisateurs.
- Gérez les erreurs pour améliorer l'expérience utilisateur.

---

## useUserDetails

Récupère les informations d'un utilisateur via un hook React. Utile pour obtenir des informations spécifiques à l'utilisateur.

### Utilisation

```typescript
import { useUserDetails } from "mileston-payment-client";

const { data, loading, error } = useUserDetails("business-id");
```

### Paramètres

| Nom du paramètre | Type   | Description                                           |
| ---------------- | ------ | ----------------------------------------------------- |
| `pathBusinessId` | string | L'identifiant de l'entreprise dans l'URL (optionnel). |

### Retour

| Nom du retour | Type      | Description                              |
| ------------- | --------- | ---------------------------------------- | ---------------------------------------------- |
| `data`        | `IGetUser | null`                                    | Les informations utilisateur récupérées.       |
| `loading`     | boolean   | Indique si la récupération est en cours. |
| `error`       | `Error    | null`                                    | Toute erreur survenue lors de la récupération. |

### Remarques

- Ce hook dépend du contexte fourni par `MilestonPaymentProvider` (`apikey` et `businessid`).
- Utilisez ce hook pour vérifier les informations utilisateur avant des opérations sensibles.
- Gérez les erreurs pour améliorer l'expérience utilisateur.

---

## usePayment

Gère les opérations de paiement via un hook React. Simplifie le processus d'initiation d'un paiement.

### Utilisation

```typescript
import { usePayment } from "mileston-payment-client";

const { initiatePayment, error, isProcessing } = usePayment();

await initiatePayment({
  type: "invoice", // ou "payment-link", "recurring"
  body: {
    /* détails du paiement */
  },
  nativeTokens: "jetons-natifs-optionnels",
});
```

### Paramètres

| Nom du paramètre | Type   | Description                                                        |
| ---------------- | ------ | ------------------------------------------------------------------ |
| `type`           | string | Le type de paiement (ex : "invoice", "payment-link", "recurring"). |
| `body`           | object | Les détails du paiement.                                           |
| `nativeTokens`   | string | Jetons natifs pour le paiement (ex : AVAX, POL, ETH). (optionnel)  |

### Retour

| Nom du retour     | Type     | Description                                      |
| ----------------- | -------- | ------------------------------------------------ |
| `initiatePayment` | function | Fonction pour démarrer le processus de paiement. |
| `error`           | object   | Toute erreur survenue lors du paiement.          |
| `isProcessing`    | boolean  | Indique si le paiement est en cours.             |

### Remarques

- Le composant doit être encapsulé par le `MilestonPaymentProvider`.
- Gérez les erreurs pour améliorer l'expérience utilisateur.

---

## useSavePayment

Enregistre les détails d'un paiement via un hook React. Utile pour stocker les informations de paiement de façon sécurisée.

### Utilisation

```typescript
import { useSavePayment } from "mileston-payment-client";

const { triggerSavePayment, data, error, loading } = useSavePayment();

await triggerSavePayment(
  "invoice", // ou "payment-link", "recurring"
  {
    /* détails du paiement */
  },
  "jetons-natifs-optionnels"
);
```

### Paramètres

| Nom du paramètre | Type   | Description                                                        |
| ---------------- | ------ | ------------------------------------------------------------------ |
| `type`           | string | Le type de paiement (ex : "invoice", "payment-link", "recurring"). |
| `body`           | object | Les détails du paiement.                                           |
| `nativeTokens`   | string | Jetons natifs pour le paiement (ex : AVAX, POL, ETH). (optionnel)  |

### Retour

| Nom du retour        | Type                 | Description                                        |
| -------------------- | -------------------- | -------------------------------------------------- | ----------------------------------------------- |
| `triggerSavePayment` | function             | Fonction pour enregistrer les données de paiement. |
| `data`               | `SavePaymentResponse | null`                                              | La réponse de l'opération d'enregistrement.     |
| `error`              | `string              | null`                                              | Toute erreur survenue lors de l'enregistrement. |
| `loading`            | boolean              | Indique si l'enregistrement est en cours.          |

### Remarques

- Ce hook dépend du contexte fourni par `MilestonPaymentProvider` (`apikey` et `businessid`).
- Utilisez ce hook pour stocker les données de paiement de façon sécurisée.
- Gérez les erreurs pour améliorer l'expérience utilisateur.

---

## useSuiPayment

Un hook React pour gérer les paiements sur la blockchain Sui.

### Utilisation

```typescript
import { useSuiPayment } from "mileston-payment-client";

const { handleSuiPayment } = useSuiPayment("test");

handleSuiPayment({
  amount: "100",
  recipientWalletAddress: "0xAdresseDestinataire",
});
```

### Paramètres

| Nom du paramètre         | Type   | Description                             |
| ------------------------ | ------ | --------------------------------------- |
| `env`                    | string | L'environnement (ex : "test", "prod").  |
| `amount`                 | string | Le montant du paiement.                 |
| `recipientWalletAddress` | string | L'adresse du portefeuille destinataire. |

### Retour

| Nom du retour      | Type     | Description                            |
| ------------------ | -------- | -------------------------------------- |
| `handleSuiPayment` | function | Fonction pour initier un paiement Sui. |

---

## useGetPaymentWallet

Récupère les détails d'un portefeuille spécifique via un hook React. Utile pour obtenir le solde et l'historique des transactions.

### Utilisation

```typescript
import { useGetPaymentWallet } from "mileston-payment-client";

const { fetchWallet, wallet, error, loading } = useGetPaymentWallet();

await fetchWallet("sui"); // ou "evm"
```

### Paramètres

| Nom du paramètre | Type         | Description                                  |
| ---------------- | ------------ | -------------------------------------------- |
| `walletType`     | `WalletType` | Le type de portefeuille (ex : "sui", "evm"). |

### Retour

| Nom du retour | Type              | Description                                          |
| ------------- | ----------------- | ---------------------------------------------------- | ---------------------------------------------- |
| `fetchWallet` | function          | Fonction pour récupérer les détails du portefeuille. |
| `wallet`      | `GetPaymentWallet | null`                                                | Les détails du portefeuille récupérés.         |
| `error`       | `string           | null`                                                | Toute erreur survenue lors de la récupération. |
| `loading`     | boolean           | Indique si la récupération est en cours.             |

### Remarques

- Ce hook dépend du contexte fourni par `MilestonPaymentProvider` (`apikey` et `businessid`).
- Utilisez ce hook pour vérifier les informations du portefeuille avant une transaction.
- Gérez les erreurs pour améliorer l'expérience utilisateur.

---

## useVerifyPaymentWithWallet

Vérifie un paiement via un portefeuille. Utile pour confirmer les paiements réalisés via des portefeuilles.

### Utilisation

```typescript
import { useVerifyPaymentWithWallet } from "mileston-payment-client";

const { verify, data, error, loading } = useVerifyPaymentWithWallet();

await verify(
  "invoice", // ou "payment-link", "recurring"
  {
    /* détails du paiement */
  },
  "jetons-natifs-optionnels"
);
```

### Paramètres

| Nom du paramètre | Type   | Description                                                        |
| ---------------- | ------ | ------------------------------------------------------------------ |
| `type`           | string | Le type de paiement (ex : "invoice", "payment-link", "recurring"). |
| `body`           | object | Les détails du paiement.                                           |
| `nativeTokens`   | string | Jetons natifs pour le paiement (optionnel).                        |

### Retour

| Nom du retour | Type                     | Description                              |
| ------------- | ------------------------ | ---------------------------------------- | ---------------------------------------------- |
| `verify`      | function                 | Fonction pour vérifier le paiement.      |
| `data`        | `VerifyPaymentWithWallet | null`                                    | La réponse de la vérification.                 |
| `error`       | `string                  | null`                                    | Toute erreur survenue lors de la vérification. |
| `loading`     | boolean                  | Indique si la vérification est en cours. |

### Remarques

- Ce hook dépend du contexte fourni par `MilestonPaymentProvider` (`apikey` et `businessid`).
- Utilisez ce hook pour vérifier les paiements de façon sécurisée.
- Gérez les erreurs pour améliorer l'expérience utilisateur.

---

## usePaymentContext

Fournit l'accès au `PaymentContext`, qui contient `apikey` et `businessid` transmis au `MilestonPaymentProvider`. Ce hook est essentiel pour accéder à ces valeurs dans les composants ou d'autres hooks.

### Utilisation

```typescript
import { usePaymentContext } from "mileston-payment-client";

function MyComponent() {
  const { apikey, businessid } = usePaymentContext();

  return (
    <div>
      <p>Clé API : {apikey}</p>
      <p>ID Entreprise : {businessid}</p>
    </div>
  );
}
```

### Retour

| Nom du retour | Type   | Description                                      |
| ------------- | ------ | ------------------------------------------------ |
| `apikey`      | string | La clé API fournie au `MilestonPaymentProvider`. |
| `businessid`  | string | L'identifiant d'entreprise fourni au Provider.   |

### Remarques

- Ce hook doit être utilisé dans un composant encapsulé par le `MilestonPaymentProvider`.
- Si utilisé en dehors du provider, une erreur sera levée.

---

## useSolanaPayment

Un hook React pour gérer les paiements sur la blockchain Solana.

### Utilisation

```typescript
import { useSolanaPayment } from "mileston-payment-client";

const { handleSolanaPayment } = useSolanaPayment("test");

handleSolanaPayment({
  amount: "100",
  recipientWalletAddress: "AdresseDestinataire",
  token: "SOL", // ou "USDC", "USDT"
});
```

### Paramètres

| Nom du paramètre         | Type   | Description                             |
| ------------------------ | ------ | --------------------------------------- |
| `env`                    | string | L'environnement (ex : "test", "prod").  |
| `amount`                 | string | Le montant du paiement.                 |
| `recipientWalletAddress` | string | L'adresse du portefeuille destinataire. |
| `token`                  | string | Le type de jeton (ex : "SOL", "USDC").  |

### Retour

| Nom du retour         | Type     | Description                               |
| --------------------- | -------- | ----------------------------------------- |
| `handleSolanaPayment` | function | Fonction pour initier un paiement Solana. |

### Remarques

- Le paramètre `env` détermine si le hook fonctionne en mode test ou production.
- L'adresse du portefeuille destinataire doit être valide pour éviter les échecs de paiement.
- Utilisez le paramètre `token` pour spécifier le type de jeton pour le paiement.

---
