# Documentation des Fonctions

Ce document fournit une vue d'ensemble détaillée des fonctions principales disponibles dans le SDK Client Mileston Payment. Chaque fonction est conçue pour gérer des tâches spécifiques liées aux paiements, à la gestion des utilisateurs et aux opérations de portefeuille.

## fetchPayment

Récupère les détails d'un paiement depuis le serveur. Cette fonction est polyvalente et permet d'obtenir les informations pour des factures, des liens de paiement et des paiements récurrents.

### Utilisation

```typescript
import { fetchPayment } from "mileston-payment-client";

const paymentDetails = await fetchPayment({
  apikey: "votre-api-key", // Utilisez ici votre clé API Checkout
  businessid: "votre-business-id",
  paymentId: "id-du-paiement",
  paymentType: "invoice", // ou "payment-link", "recurring"
});
console.log(paymentDetails);
```

### Paramètres

| Nom du paramètre | Type   | Description                                                         |
| ---------------- | ------ | ------------------------------------------------------------------- |
| `apikey`         | string | Votre clé API. Requise pour l'authentification.                     |
| `businessid`     | string | L'identifiant de votre entreprise dans le système.                  |
| `paymentId`      | string | L'identifiant du paiement à récupérer. Unique pour chaque paiement. |
| `paymentType`    | string | Le type de paiement. Valeurs supportées :                           |
|                  |        | - `"invoice"` : Pour les paiements par facture.                     |
|                  |        | - `"payment-link"` : Pour les paiements via lien.                   |
|                  |        | - `"recurring"` : Pour les paiements récurrents.                    |

### Retour

| Type de retour    | Description                                                                            |
| ----------------- | -------------------------------------------------------------------------------------- |
| `Promise<object>` | Une promesse qui résout les détails du paiement. La structure dépend du `paymentType`. |

### Remarques

- Assurez-vous que `apikey` et `businessid` sont valides, sinon la requête échouera.
- Gérez les erreurs avec un bloc `try-catch`.

---

## getUserDetails

Récupère les informations d'un utilisateur depuis le serveur. Cette fonction est utile pour obtenir les informations d'un utilisateur spécifique lié à votre entreprise.

### Utilisation

```typescript
import { getUserDetails } from "mileston-payment-client";

const userDetails = await getUserDetails("votre-api-key", "business-id");
console.log(userDetails);
```

### Paramètres

| Nom du paramètre | Type   | Description                                                |
| ---------------- | ------ | ---------------------------------------------------------- |
| `apikey`         | string | Votre clé API. Requise pour l'authentification.            |
| `businessId`     | string | L'identifiant de l'entreprise à inclure dans les en-têtes. |

### Retour

| Type de retour    | Description                                                                     |
| ----------------- | ------------------------------------------------------------------------------- |
| `Promise<object>` | Une promesse qui résout les détails de l'utilisateur (nom, email, rôles, etc.). |

### Remarques

- Cette fonction lève une erreur si `apikey` ou `businessId` est manquant.
- Utilisez cette fonction pour vérifier les informations utilisateur avant des opérations sensibles.

---

## MilestonPayButton

Une classe pour créer et gérer des boutons de paiement. Ce composant fournit un bouton personnalisable qui s'intègre parfaitement au système Mileston Payment.

### Utilisation

```typescript
import { MilestonPayButton } from "mileston-payment-client";

const container = document.getElementById("payment-button-container");
const payButton = new MilestonPayButton(container, {
  buttonText: "Payer maintenant",
  onPaymentComplete: () => console.log("Paiement terminé !"),
  onPaymentError: (error) => console.error("Erreur de paiement :", error),
});
```

### Méthodes

| Nom de la méthode   | Paramètres                             | Type de retour | Description                                                      |
| ------------------- | -------------------------------------- | -------------- | ---------------------------------------------------------------- |
| `updateButtonText`  | `text: string`                         | `void`         | Met à jour le texte du bouton.                                   |
| `updateButtonStyle` | `styles: Partial<CSSStyleDeclaration>` | `void`         | Met à jour le style du bouton pour une personnalisation avancée. |
| `destroy`           | Aucun                                  | `void`         | Supprime le bouton du DOM et nettoie les écouteurs d'événements. |

### Remarques

- Les callbacks `onPaymentComplete` et `onPaymentError` sont essentiels pour gérer les événements de paiement.
- Assurez-vous que l'élément container existe dans le DOM avant d'initialiser le bouton.

---

## getOnRampData

Récupère les données d'onramp pour les paiements. Cette fonction permet d'obtenir les informations nécessaires pour initier une transaction onramp.

### Utilisation

```typescript
import { getOnRampData } from "mileston-payment-client";

const data = await getOnRampData(
  {
    amount: "100",
    recipientWalletAddress: "0xAdresseDestinataire",
    chain: "eth", // ou "avax", "base", "pol", "arb"
  },
  "votre-api-key",
  "votre-business-id"
);
console.log(data);
```

### Paramètres

| Nom du paramètre         | Type   | Description                             |
| ------------------------ | ------ | --------------------------------------- |
| `amount`                 | string | Le montant pour l'onramp.               |
| `recipientWalletAddress` | string | L'adresse du portefeuille destinataire. |
| `chain`                  | string | Le réseau blockchain (ex : "eth").      |
| `apikey`                 | string | Votre clé API.                          |
| `businessid`             | string | L'identifiant de votre entreprise.      |

### Retour

| Type de retour    | Description                                                                          |
| ----------------- | ------------------------------------------------------------------------------------ |
| `Promise<object>` | Une promesse qui résout les données d'onramp (liens de paiement, métadonnées, etc.). |

### Remarques

- Cette fonction est essentielle pour intégrer des services d'onramp dans votre application.
- Vérifiez que l'objet `params` contient tous les champs requis.

---

## getPaymentWallet

Gère les opérations de paiement liées au portefeuille. Cette fonction permet de récupérer les informations d'un type de portefeuille spécifique.

### Utilisation

```typescript
import { getPaymentWallet } from "mileston-payment-client";

const walletData = await getPaymentWallet({
  apikey: "votre-api-key",
  businessid: "votre-business-id",
  walletType: "sui", // ou "evm"
});
console.log(walletData);
```

### Paramètres

| Nom du paramètre | Type   | Description                    |
| ---------------- | ------ | ------------------------------ |
| `apikey`         | string | Votre clé API.                 |
| `businessid`     | string | L'identifiant de l'entreprise. |
| `walletType`     | string | Le type de portefeuille.       |

### Retour

| Type de retour    | Description                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------- |
| `Promise<object>` | Une promesse qui résout les données du portefeuille (solde, historique des transactions, etc.). |

### Remarques

- Utilisez cette fonction pour vérifier les informations du portefeuille avant d'initier une transaction.
- Gérez les erreurs pour offrir une meilleure expérience utilisateur.

---

## savePayment

Enregistre les détails d'un paiement sur le serveur. Cette fonction permet de stocker les informations de paiement pour un traitement ou une référence ultérieure.

### Utilisation

```typescript
import { savePayment } from "mileston-payment-client";

const response = await savePayment({
  apikey: "votre-api-key",
  businessid: "votre-business-id",
  type: "invoice", // ou "payment-link", "recurring"
  body: {
    /* détails du paiement */
  },
  nativeTokens: "jetons-natifs-optionnels",
});
console.log(response);
```

### Paramètres

| Nom du paramètre | Type   | Description                                                        |
| ---------------- | ------ | ------------------------------------------------------------------ |
| `apikey`         | string | Votre clé API.                                                     |
| `businessid`     | string | L'identifiant de l'entreprise.                                     |
| `type`           | string | Le type de paiement (ex : "invoice", "payment-link", "recurring"). |
| `body`           | object | Les détails du paiement.                                           |
| `nativeTokens`   | string | Jetons natifs pour le paiement (optionnel).                        |

### Retour

| Type de retour    | Description                                                                                |
| ----------------- | ------------------------------------------------------------------------------------------ |
| `Promise<object>` | Une promesse qui résout la réponse du serveur (confirmation du paiement enregistré, etc.). |

### Remarques

- L'objet `body` doit contenir tous les champs requis pour le type de paiement choisi.
- Cette fonction est cruciale pour stocker les données de paiement de façon sécurisée.

---

## handlePayWithEVMWalletConnect

Gère les transactions de paiement via des portefeuilles compatibles EVM avec WalletConnect. Cette fonction prend en charge les jetons natifs (ex : AVAX, POL, ETH) et les jetons ERC-20 (ex : USDC, USDT).

### Utilisation

```typescript
import { handlePayWithEVMWalletConnect } from "mileston-payment-client";

const result = await handlePayWithEVMWalletConnect({
  env: "prod",
  evm: "eth",
  recipientAddress: "0xAdresseDestinataire",
  amount: "100",
  token: "USDC",
});
console.log(result.txHash, result.payerAddress);
```

### Paramètres

| Nom du paramètre   | Type   | Description                                            |
| ------------------ | ------ | ------------------------------------------------------ |
| `env`              | string | L'environnement (ex : "test", "prod").                 |
| `evm`              | string | L'identifiant de la chaîne EVM (ex : "eth", "pol").    |
| `recipientAddress` | string | L'adresse du portefeuille destinataire.                |
| `amount`           | string | Le montant à envoyer (en unités de jeton, pas en Wei). |
| `token`            | string | Le type de jeton (ex : "AVAX", "ETH", "USDC", "USDT"). |

### Retour

| Type de retour    | Description                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| `Promise<object>` | Une promesse qui résout les détails de la transaction (`txHash`, `feeHash`, `payerAddress`, etc.). |

### Exemple

```typescript
const result = await handlePayWithEVMWalletConnect({
  env: "prod",
  evm: "eth",
  recipientAddress: "0xAdresseDestinataire",
  amount: "100",
  token: "USDC",
});
console.log(result.txHash, result.payerAddress);
```

---
