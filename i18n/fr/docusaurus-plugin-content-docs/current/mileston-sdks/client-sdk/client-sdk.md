---
sidebar_position: 1
---

# 🛠️ SDK Client Mileston Payment

Bienvenue dans la documentation du **SDK Client JavaScript/TypeScript Mileston Payment** ! Que vous soyez un expert JavaScript ou un fan de frameworks, ce SDK est là pour simplifier les paiements crypto. Plongeons ensemble et construisons quelque chose d'incroyable ! 🚀

---

## 📂 Structure du SDK

Le SDK Client Mileston est divisé en plusieurs sections :

- **Composants** : Composants React pour une intégration fluide.
- **Hooks** : Hooks React pour la récupération de données en temps réel.
- **Fonctions** : Fonctions utilitaires pour les opérations de paiement.

Consultez la documentation dédiée pour chaque usage détaillé.

---

## 📦 Installation

Commencez par installer le SDK dans votre projet. Ouvrez votre terminal et lancez :

```bash
npm install mileston-payment-client
```

Ou, si vous utilisez Yarn :

```bash
yarn add mileston-payment-client
```

---

## ⚙️ Classe principale (JavaScript Vanilla)

Pour ceux qui utilisent JavaScript pur, le SDK fournit la classe `MilestonPayButton` pour une intégration directe.

### Exemple

```javascript
import { MilestonPayButton } from "mileston-payment-client";

const container = document.getElementById("payment-button-container");

const payButton = new MilestonPayButton(container, {
  buttonText: "Payer maintenant",
  onPaymentComplete: () => {
    console.log("Paiement terminé !");
  },
  onPaymentDataReceived: (data) => {
    console.log("Données de paiement reçues :", data);
  },
  onPaymentError: (error) => {
    console.error("Erreur de paiement :", error);
  },
  paymentUrl: "https://example.com/payment",
});

// Optionnel : mettez à jour le texte ou le style du bouton plus tard
payButton.updateButtonText("Commander");
payButton.updateButtonStyle({ backgroundColor: "blue", color: "white" });
```

---

## ⚛️ Intégration React

Le SDK propose un composant React dédié pour une intégration fluide.

### Exemple

```jsx
import React from "react";
import { PayButton } from "mileston-payment-client";

function App() {
  return (
    <div>
      <PayButton
        onPaymentComplete={() => console.log("Paiement terminé !")}
        onPaymentDataReceived={(data) =>
          console.log("Données de paiement reçues :", data)
        }
        onPaymentError={(error) => console.error("Erreur de paiement :", error)}
        paymentUrl="https://checkout.mileston.co/payment"
        style={{ backgroundColor: "green", color: "white" }}
      >
        Payer maintenant
      </PayButton>
    </div>
  );
}

export default App;
```

---

## Intégration Angular

Pour les projets Angular, utilisez directement la classe `MilestonPayButton`.

### Exemple

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
      buttonText: "Payer maintenant",
      onPaymentComplete: () => {
        console.log("Paiement terminé !");
      },
      onPaymentDataReceived: (data) => {
        console.log("Données de paiement reçues :", data);
      },
      onPaymentError: (error) => {
        console.error("Erreur de paiement :", error);
      },
      paymentUrl: "https://example.com/payment",
    });
  }
}
```

---

## Intégration Vue

Les développeurs Vue peuvent intégrer le SDK via la classe `MilestonPayButton`.

### Exemple

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
      buttonText: "Payer maintenant",
      onPaymentComplete: () => {
        console.log("Paiement terminé !");
      },
      onPaymentDataReceived: (data) => {
        console.log("Données de paiement reçues :", data);
      },
      onPaymentError: (error) => {
        console.error("Erreur de paiement :", error);
      },
      paymentUrl: "https://example.com/payment",
    });
  },
};
</script>
```

---

## Focus composant

### Encapsulez votre application avec le Payment Provider

Utilisez `MilestonPaymentProvider` pour fournir les données globales liées au paiement (clé API, business ID) à votre application. La propriété `apikey` doit être la **Checkout API Key**.

```javascript
import { MilestonPaymentProvider } from "mileston-payment-client";

function App() {
  return (
    <MilestonPaymentProvider
      apikey="votre-api-key" // Utilisez ici votre Checkout API Key
      businessid="votre-business-id"
    >
      <YourComponent />
    </MilestonPaymentProvider>
  );
}
```

---

## Aperçu des composants

### Subscription Checkout

```javascript
import { SubscriptionCheckout } from "mileston-payment-client";

<SubscriptionCheckout
  businessName="Mon Entreprise"
  businessLogo="https://example.com/logo.png"
  plan={{
    name: "Formule Premium",
    description: "Accès à toutes les fonctionnalités premium",
    amount: 19.99,
    currency: "USD",
    interval: "monthly",
    intervalCount: 1,
  }}
  onWalletConnectPaymentComplete={(networkId, tokenId) =>
    console.log("Paiement Wallet Connect terminé", networkId, tokenId)
  }
  onWalletConnectPaymentError={(error) =>
    console.error("Erreur Wallet Connect", error)
  }
  amount={19.99}
  recipientWalletAddress="0x123456789abcdef"
/>;
```

---

### Invoice Checkout

```javascript
import { InvoiceCheckout } from "mileston-payment-client";

<InvoiceCheckout
  businessName="Mon Entreprise"
  businessLogo="https://example.com/logo.png"
  description="Facture #12345"
  amount={200}
  recipientWalletAddress="0x123456789abcdef"
  onQrCodePaymentComplete={() => console.log("Paiement QR Code terminé")}
  onQrCodePaymentError={(error) => console.error("Erreur QR Code", error)}
/>;
```

---

### Payment Link Checkout

```javascript
import { PaymentLinkCheckout } from "mileston-payment-client";

<PaymentLinkCheckout
  businessName="Mon Entreprise"
  businessLogo="https://example.com/logo.png"
  bannerImage="https://example.com/banner.png"
  title="Demande de paiement"
  description="Payez votre commande"
  amount={100}
  recipientWalletAddress="0x123456789abcdef"
  onCardPaymentComplete={() => console.log("Paiement carte terminé")}
  onCardPaymentError={(error) => console.error("Erreur carte", error)}
/>;
```

---

## 🛠️ Options de configuration

Le SDK est hautement personnalisable ! Voici la liste des options et props utilisables pour chaque composant :

### MilestonPayButton

| **Option**              | **Type**                                                | **Obligatoire** | **Description**                                        |
| ----------------------- | ------------------------------------------------------- | --------------- | ------------------------------------------------------ | --- | ------------------------------------------------------ |
| `container`             | `HTMLElement`                                           | Oui             | Élément DOM où attacher le bouton (Core uniquement).   |
| `buttonText`            | `string`                                                | Oui             | Texte affiché sur le bouton.                           |
| `onPaymentComplete`     | `() => void`                                            | Oui             | Callback déclenché à la fin du paiement.               |
| `onPaymentDataReceived` | `(data: { walletAddress: string, id: string }) => void` | Oui             | Callback lors de la réception des données de paiement. |
| `onPaymentError`        | `(error: Error) => void`                                | Oui             | Callback en cas d'échec du paiement.                   |
| `paymentUrl`            | `string`                                                | Non             | URL de la page de paiement.                            |
| `paymentType`           | `"payment-link"                                         | "invoice"       | "recurring-payment"`                                   | Non | Type de paiement (pour générer automatiquement l'URL). |
| `paymentId`             | `string`                                                | Non             | ID du paiement (pour générer automatiquement l'URL).   |
| `buttonStyle`           | `Partial<CSSStyleDeclaration>`                          | Non             | Styles personnalisés pour le bouton.                   |

### SubscriptionCheckout

| **Prop**                         | **Type**                                       | **Obligatoire** | **Description**                               |
| -------------------------------- | ---------------------------------------------- | --------------- | --------------------------------------------- |
| `businessName`                   | `string`                                       | Oui             | Nom de l'entreprise.                          |
| `businessLogo`                   | `string`                                       | Oui             | URL du logo de l'entreprise.                  |
| `plan`                           | `object`                                       | Oui             | Détails de l'abonnement.                      |
| `plan.name`                      | `string`                                       | Oui             | Nom de la formule.                            |
| `plan.description`               | `string`                                       | Oui             | Description de la formule.                    |
| `plan.amount`                    | `number`                                       | Oui             | Montant de l'abonnement.                      |
| `plan.currency`                  | `string`                                       | Oui             | Devise (ex : USD).                            |
| `plan.interval`                  | `string`                                       | Oui             | Intervalle de facturation (ex : mensuel).     |
| `plan.intervalCount`             | `number`                                       | Oui             | Nombre d'intervalles (ex : tous les 2 mois).  |
| `onWalletConnectPaymentComplete` | `(networkId: string, tokenId: string) => void` | Non             | Callback pour paiement Wallet Connect réussi. |
| `onWalletConnectPaymentError`    | `(error: Error) => void`                       | Non             | Callback pour erreur Wallet Connect.          |
| `onQrCodePaymentComplete`        | `() => void`                                   | Non             | Callback pour paiement QR Code réussi.        |
| `onQrCodePaymentError`           | `(error: Error) => void`                       | Non             | Callback pour erreur QR Code.                 |
| `onCardPaymentComplete`          | `() => void`                                   | Non             | Callback pour paiement carte réussi.          |
| `onCardPaymentError`             | `(error: Error) => void`                       | Non             | Callback pour erreur carte.                   |
| `amount`                         | `number`                                       | Oui             | Montant de l'abonnement.                      |
| `recipientWalletAddress`         | `string`                                       | Oui             | Adresse du portefeuille destinataire.         |
| `paymentLinkId`                  | `string`                                       | Oui             | ID du lien de paiement.                       |

---

### InvoiceCheckout

| **Prop**                  | **Type**                 | **Obligatoire** | **Description**                        |
| ------------------------- | ------------------------ | --------------- | -------------------------------------- |
| `businessName`            | `string`                 | Oui             | Nom de l'entreprise.                   |
| `businessLogo`            | `string`                 | Oui             | URL du logo de l'entreprise.           |
| `description`             | `string`                 | Oui             | Description de la facture.             |
| `amount`                  | `number`                 | Oui             | Montant de la facture.                 |
| `recipientWalletAddress`  | `string`                 | Oui             | Adresse du portefeuille destinataire.  |
| `onQrCodePaymentComplete` | `() => void`             | Non             | Callback pour paiement QR Code réussi. |
| `onQrCodePaymentError`    | `(error: Error) => void` | Non             | Callback pour erreur QR Code.          |
| `onCardPaymentComplete`   | `() => void`             | Non             | Callback pour paiement carte réussi.   |
| `onCardPaymentError`      | `(error: Error) => void` | Non             | Callback pour erreur carte.            |
| `paymentLinkId`           | `string`                 | Oui             | ID du lien de paiement de la facture.  |

---

### PaymentLinkCheckout

| **Prop**                         | **Type**                                       | **Obligatoire** | **Description**                               |
| -------------------------------- | ---------------------------------------------- | --------------- | --------------------------------------------- |
| `businessName`                   | `string`                                       | Oui             | Nom de l'entreprise.                          |
| `businessLogo`                   | `string`                                       | Oui             | URL du logo de l'entreprise.                  |
| `bannerImage`                    | `string`                                       | Non             | URL de la bannière pour la page de paiement.  |
| `title`                          | `string`                                       | Oui             | Titre de la demande de paiement.              |
| `description`                    | `string`                                       | Oui             | Description de la demande de paiement.        |
| `amount`                         | `number`                                       | Oui             | Montant du paiement.                          |
| `recipientWalletAddress`         | `string`                                       | Oui             | Adresse du portefeuille destinataire.         |
| `onWalletConnectPaymentComplete` | `(networkId: string, tokenId: string) => void` | Non             | Callback pour paiement Wallet Connect réussi. |
| `onWalletConnectPaymentError`    | `(error: Error) => void`                       | Non             | Callback pour erreur Wallet Connect.          |
| `onQrCodePaymentComplete`        | `() => void`                                   | Non             | Callback pour paiement QR Code réussi.        |
| `onQrCodePaymentError`           | `(error: Error) => void`                       | Non             | Callback pour erreur QR Code.                 |
| `onCardPaymentComplete`          | `() => void`                                   | Non             | Callback pour paiement carte réussi.          |
| `onCardPaymentError`             | `(error: Error) => void`                       | Non             | Callback pour erreur carte.                   |
| `paymentLinkId`                  | `string`                                       | Oui             | ID du lien de paiement.                       |

---

### Gestion des erreurs

Prévoyez toujours des callbacks d'erreur pour les composants de paiement (`onWalletConnectPaymentError`, `onQrCodePaymentError`, `onCardPaymentError`) afin de gérer les échecs de paiement avec élégance. Cela garantit une meilleure expérience utilisateur et facilite le débogage.

---

### Intégration avec le Backend SDK

Combinez le Client SDK avec le Backend SDK pour une solution de paiement complète.

---

## 🛡️ Problèmes courants

### Erreurs TypeScript

Assurez-vous que votre `tsconfig.json` inclut :

```json
{
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### Erreur JSX

Si vous rencontrez des erreurs JSX, vérifiez que votre `tsconfig.json` contient :

```json
{
  "jsx": "react-jsx"
}
```

---

🎉 Et voilà ! Vous êtes prêt à intégrer le **SDK Client Mileston Payment** comme un pro. Des questions ? Contactez-nous et continuons à construire des choses incroyables ! ✨

## Pour conclure

Et voilà ! Avec le **SDK Client Mileston Payment**, intégrer les paiements crypto dans votre application devient un jeu d'enfant. Si vous avez des questions ou des soucis, n'hésitez pas à nous contacter. Bon code, et que vos mugs se vendent comme des petits pains ! ☕🛒

---

_Note : Pour plus d'informations et de références, consultez le [dépôt GitHub du SDK Client Mileston Payment](https://github.com/Mileston-co/mileston-payment-client). Le SDK est open source, n'hésitez pas à proposer une PR !_
