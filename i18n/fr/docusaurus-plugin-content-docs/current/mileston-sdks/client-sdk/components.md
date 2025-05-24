---
sidebar_position: 2
---

# Documentation des composants

Ce document fournit une vue détaillée des composants React disponibles dans le SDK Client Mileston Payment. **Remarque :** Tous les composants nécessitent le `MilestonPaymentProvider` pour fournir `apikey (clé API checkout)` et `businessid` via le contexte.

---

## MilestonPaymentProvider

Un provider de contexte React pour gérer la clé API et l'identifiant business. Ce provider doit encapsuler votre arbre de composants pour fournir le contexte nécessaire aux autres composants du SDK.

### Utilisation

```typescript
import { MilestonPaymentProvider } from "mileston-payment-client";

function App() {
  return (
    <MilestonPaymentProvider
      apikey="votre-api-key"
      businessid="votre-business-id"
    >
      {/* Vos composants applicatifs */}
    </MilestonPaymentProvider>
  );
}
```

### Props

| Nom de prop  | Type      | Description                                          |
| ------------ | --------- | ---------------------------------------------------- |
| `apikey`     | string    | Votre clé API pour l'authentification.               |
| `businessid` | string    | L'identifiant de votre entreprise.                   |
| `children`   | ReactNode | Les composants enfants qui consommeront le contexte. |

### Remarques

- Assurez-vous que ce provider encapsule toute votre application ou les composants nécessitant l'accès à la clé API et au business ID.
- Ce provider est requis pour les composants comme `PayButton`, `InvoiceCheckout`, `SubscriptionCheckout`, etc.

---

## PayButton

Un composant React pour initier des paiements. Ce composant fournit un bouton personnalisable qui ouvre une popup pour traiter les paiements.

### Utilisation

```typescript
import { MilestonPaymentProvider, PayButton } from "mileston-payment-client";

function App() {
  return (
    <MilestonPaymentProvider
      apikey="votre-api-key"
      businessid="votre-business-id"
    >
      <PayButton
        onPaymentComplete={() => console.log("Paiement terminé !")}
        onPaymentError={(error) => console.error("Erreur de paiement :", error)}
        paymentUrl="https://checkout.mileston.co/payment"
        paymentId="payment-id"
        paymentType="invoice"
        theme="light"
        style={{ backgroundColor: "green", color: "white" }}
        className="custom-class"
      >
        Payer maintenant
      </PayButton>
    </MilestonPaymentProvider>
  );
}
```

### Props

| Nom de prop         | Type      | Description                                                     |
| ------------------- | --------- | --------------------------------------------------------------- |
| `onPaymentComplete` | function  | Callback déclenché à la fin du paiement.                        |
| `onPaymentError`    | function  | Callback déclenché en cas d'échec du paiement.                  |
| `paymentUrl`        | string    | URL de la page de paiement.                                     |
| `paymentId`         | string    | ID du paiement (ex : facture, lien de paiement).                |
| `paymentType`       | string    | Type de paiement (ex : "invoice", "payment-link", "recurring"). |
| `theme`             | string    | Thème de la popup de paiement (ex : "light", "dark").           |
| `style`             | object    | Styles personnalisés pour le bouton.                            |
| `className`         | string    | Classe CSS pour le bouton.                                      |
| `children`          | ReactNode | Contenu à afficher dans le bouton (ex : "Payer maintenant").    |

### Remarques

- Assurez-vous que le `MilestonPaymentProvider` encapsule votre arbre de composants pour fournir le contexte nécessaire.
- Personnalisez l'apparence du bouton avec les props `style` et `className`.
- Le prop `theme` permet de définir le thème visuel de la popup de paiement.

---

## SubscriptionCheckout

Un composant React pour les paiements par abonnement. Il simplifie la mise en place de paiements récurrents.

### Utilisation

```typescript
import {
  MilestonPaymentProvider,
  SubscriptionCheckout,
} from "mileston-payment-client";

<MilestonPaymentProvider apikey="votre-api-key" businessid="votre-business-id">
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
    walletConnectButtonText="S'abonner avec Wallet"
    qrCodeButtonText="Générer QR Abonnement"
    cardButtonText="S'abonner avec Carte"
    buttonClassName="custom-button-class"
    dialogTitle="Abonnement par carte"
    dialogDescription="Configurez votre paiement récurrent via le formulaire sécurisé"
    className="custom-class"
    footerText="Merci pour votre abonnement !"
    cancelText="Vous pouvez annuler votre abonnement à tout moment"
    paymentLinkId="subscription123"
    env="test"
    onWalletConnectPaymentComplete={() =>
      console.log("Paiement abonnement Wallet terminé")
    }
    onWalletConnectPaymentError={(error) =>
      console.error("Erreur Wallet abonnement :", error)
    }
    onQrCodePaymentComplete={() =>
      console.log("Paiement QR abonnement terminé")
    }
    onQrCodePaymentError={(error) =>
      console.error("Erreur QR abonnement :", error)
    }
    onCardPaymentComplete={() =>
      console.log("Paiement carte abonnement terminé")
    }
    onCardPaymentError={(error) =>
      console.error("Erreur carte abonnement :", error)
    }
    amount={19.99}
    recipientWalletAddress="0x123456789abcdef"
  />
</MilestonPaymentProvider>;
```

### Props

| Nom de prop                      | Type     | Description                                       |
| -------------------------------- | -------- | ------------------------------------------------- |
| `businessName`                   | string   | Nom de l'entreprise.                              |
| `businessLogo`                   | string   | URL du logo de l'entreprise.                      |
| `plan`                           | object   | Détails de l'abonnement.                          |
| `plan.name`                      | string   | Nom de la formule.                                |
| `plan.description`               | string   | Description de la formule.                        |
| `plan.amount`                    | number   | Montant de l'abonnement.                          |
| `plan.currency`                  | string   | Devise (ex : USD, EUR).                           |
| `plan.interval`                  | string   | Intervalle de facturation (ex : mensuel, annuel). |
| `plan.intervalCount`             | number   | Nombre d'intervalles entre chaque facturation.    |
| `walletConnectButtonText`        | string   | Texte du bouton Wallet Connect.                   |
| `qrCodeButtonText`               | string   | Texte du bouton QR Code.                          |
| `cardButtonText`                 | string   | Texte du bouton Carte.                            |
| `buttonClassName`                | string   | Classe CSS pour styliser les boutons.             |
| `dialogTitle`                    | string   | Titre de la popup de paiement par carte.          |
| `dialogDescription`              | string   | Description de la popup de paiement par carte.    |
| `className`                      | string   | Classe CSS pour le composant principal.           |
| `footerText`                     | string   | Texte de pied de page du composant.               |
| `cancelText`                     | string   | Message d'annulation d'abonnement.                |
| `paymentLinkId`                  | string   | ID du lien de paiement.                           |
| `env`                            | string   | Environnement (ex : test, production).            |
| `onWalletConnectPaymentComplete` | function | Callback pour paiement Wallet Connect réussi.     |
| `onWalletConnectPaymentError`    | function | Callback pour erreur Wallet Connect.              |
| `onQrCodePaymentComplete`        | function | Callback pour paiement QR Code réussi.            |
| `onQrCodePaymentError`           | function | Callback pour erreur QR Code.                     |
| `onCardPaymentComplete`          | function | Callback pour paiement carte réussi.              |
| `onCardPaymentError`             | function | Callback pour erreur carte.                       |
| `amount`                         | number   | Montant de l'abonnement.                          |
| `recipientWalletAddress`         | string   | Adresse du portefeuille destinataire.             |

### Remarques

- Utilisez ce composant pour simplifier la gestion des abonnements.
- Personnalisez les détails de l'abonnement via la prop `plan`.
- Vérifiez la validité de `recipientWalletAddress` pour éviter les échecs de paiement.
- Le prop `cancelText` permet d'afficher un message sur l'annulation d'abonnement.

---

## InvoiceCheckout

Un composant React pour les paiements par facture. Idéal pour gérer les paiements ponctuels.

### Utilisation

```typescript
import {
  MilestonPaymentProvider,
  InvoiceCheckout,
} from "mileston-payment-client";

<MilestonPaymentProvider apikey="votre-api-key" businessid="votre-business-id">
  <InvoiceCheckout
    businessName="Mon Entreprise"
    businessLogo="https://example.com/logo.png"
    currency="USD"
    description="Facture #12345"
    walletConnectButtonText="Connecter Wallet & Payer"
    qrCodeButtonText="Générer QR Paiement"
    cardButtonText="Payer par Carte"
    buttonClassName="custom-button-class"
    dialogTitle="Payer la facture"
    dialogDescription="Finalisez votre paiement en toute sécurité"
    className="custom-class"
    footerText="Merci pour votre confiance !"
    paymentLinkId="invoice123"
    env="test"
    onWalletConnectPaymentComplete={() =>
      console.log("Paiement Wallet terminé")
    }
    onWalletConnectPaymentError={(error) =>
      console.error("Erreur Wallet :", error)
    }
    onQrCodePaymentComplete={() => console.log("Paiement QR terminé")}
    onQrCodePaymentError={(error) => console.error("Erreur QR :", error)}
    onCardPaymentComplete={() => console.log("Paiement carte terminé")}
    onCardPaymentError={(error) => console.error("Erreur carte :", error)}
    amount={200}
    recipientWalletAddress="0x123456789abcdef"
  />
</MilestonPaymentProvider>;
```

### Props

| Nom de prop                      | Type     | Description                                    |
| -------------------------------- | -------- | ---------------------------------------------- |
| `businessName`                   | string   | Nom de l'entreprise.                           |
| `businessLogo`                   | string   | URL du logo de l'entreprise.                   |
| `currency`                       | string   | Devise (ex : USD).                             |
| `description`                    | string   | Description de la facture.                     |
| `walletConnectButtonText`        | string   | Texte du bouton Wallet Connect.                |
| `qrCodeButtonText`               | string   | Texte du bouton QR Code.                       |
| `cardButtonText`                 | string   | Texte du bouton Carte.                         |
| `buttonClassName`                | string   | Classe CSS pour styliser les boutons.          |
| `dialogTitle`                    | string   | Titre de la popup de paiement par carte.       |
| `dialogDescription`              | string   | Description de la popup de paiement par carte. |
| `className`                      | string   | Classe CSS pour le composant principal.        |
| `footerText`                     | string   | Texte de pied de page du composant.            |
| `paymentLinkId`                  | string   | ID du lien de paiement.                        |
| `env`                            | string   | Environnement (ex : test, production).         |
| `onWalletConnectPaymentComplete` | function | Callback pour paiement Wallet Connect réussi.  |
| `onWalletConnectPaymentError`    | function | Callback pour erreur Wallet Connect.           |
| `onQrCodePaymentComplete`        | function | Callback pour paiement QR Code réussi.         |
| `onQrCodePaymentError`           | function | Callback pour erreur QR Code.                  |
| `onCardPaymentComplete`          | function | Callback pour paiement carte réussi.           |
| `onCardPaymentError`             | function | Callback pour erreur carte.                    |
| `amount`                         | number   | Montant de la facture.                         |
| `recipientWalletAddress`         | string   | Adresse du portefeuille destinataire.          |

### Remarques

- Utilisez ce composant pour les paiements ponctuels (factures).
- Vérifiez la validité de `recipientWalletAddress` pour éviter les échecs de paiement.
- Personnalisez l'apparence et le comportement via les props fournies.

---

## PaymentLinkCheckout

Un composant React pour les paiements via lien de paiement. Idéal pour générer des liens de paiement pour vos clients.

### Utilisation

```typescript
import {
  MilestonPaymentProvider,
  PaymentLinkCheckout,
} from "mileston-payment-client";

<MilestonPaymentProvider apikey="votre-api-key" businessid="votre-business-id">
  <PaymentLinkCheckout
    businessName="Mon Entreprise"
    businessLogo="https://example.com/logo.png"
    bannerImage="https://example.com/banner.png"
    title="Demande de paiement"
    currency="USD"
    description="Payez votre commande"
    walletConnectButtonText="Connecter Wallet & Payer"
    qrCodeButtonText="Générer QR Paiement"
    cardButtonText="Payer par Carte"
    buttonClassName="custom-button-class"
    dialogTitle="Paiement sécurisé"
    dialogDescription="Finalisez votre paiement via le formulaire sécurisé"
    className="custom-class"
    footerText="Merci pour votre paiement !"
    paymentLinkId="payment123"
    env="test"
    onWalletConnectPaymentComplete={() =>
      console.log("Paiement Wallet terminé")
    }
    onWalletConnectPaymentError={(error) =>
      console.error("Erreur Wallet :", error)
    }
    onQrCodePaymentComplete={() => console.log("Paiement QR terminé")}
    onQrCodePaymentError={(error) => console.error("Erreur QR :", error)}
    onCardPaymentComplete={() => console.log("Paiement carte terminé")}
    onCardPaymentError={(error) => console.error("Erreur carte :", error)}
    amount={100}
    recipientWalletAddress="0x123456789abcdef"
  />
</MilestonPaymentProvider>;
```

### Props

| Nom de prop                      | Type     | Description                                    |
| -------------------------------- | -------- | ---------------------------------------------- |
| `businessName`                   | string   | Nom de l'entreprise.                           |
| `businessLogo`                   | string   | URL du logo de l'entreprise.                   |
| `bannerImage`                    | string   | URL de la bannière pour la page de paiement.   |
| `title`                          | string   | Titre de la demande de paiement.               |
| `currency`                       | string   | Devise (ex : USD).                             |
| `description`                    | string   | Description de la demande de paiement.         |
| `walletConnectButtonText`        | string   | Texte du bouton Wallet Connect.                |
| `qrCodeButtonText`               | string   | Texte du bouton QR Code.                       |
| `cardButtonText`                 | string   | Texte du bouton Carte.                         |
| `buttonClassName`                | string   | Classe CSS pour styliser les boutons.          |
| `dialogTitle`                    | string   | Titre de la popup de paiement par carte.       |
| `dialogDescription`              | string   | Description de la popup de paiement par carte. |
| `className`                      | string   | Classe CSS pour le composant principal.        |
| `footerText`                     | string   | Texte de pied de page du composant.            |
| `paymentLinkId`                  | string   | ID du lien de paiement.                        |
| `env`                            | string   | Environnement (ex : test, production).         |
| `onWalletConnectPaymentComplete` | function | Callback pour paiement Wallet Connect réussi.  |
| `onWalletConnectPaymentError`    | function | Callback pour erreur Wallet Connect.           |
| `onQrCodePaymentComplete`        | function | Callback pour paiement QR Code réussi.         |
| `onQrCodePaymentError`           | function | Callback pour erreur QR Code.                  |
| `onCardPaymentComplete`          | function | Callback pour paiement carte réussi.           |
| `onCardPaymentError`             | function | Callback pour erreur carte.                    |
| `amount`                         | number   | Montant du paiement.                           |
| `recipientWalletAddress`         | string   | Adresse du portefeuille destinataire.          |

### Remarques

- Utilisez ce composant pour générer des liens de paiement pour vos clients.
- Personnalisez la page de paiement avec les props `bannerImage` et `title`.
- Vérifiez la validité de `recipientWalletAddress` pour éviter les échecs de paiement.

---

## PaymentOptions

Un composant React pour afficher les options de paiement disponibles. Il propose des onglets pour Wallet Connect, QR Code et paiement par carte.

### Utilisation

```typescript
import { PaymentOptions } from "mileston-payment-client";

function App() {
  return (
    <PaymentOptions
      walletConnectButtonText="Connecter Wallet & Payer"
      qrCodeButtonText="Générer QR Paiement"
      cardButtonText="Payer par Carte"
      buttonClassName="custom-button-class"
      dialogTitle="Paiement sécurisé"
      dialogDescription="Finalisez votre paiement via le formulaire sécurisé"
      defaultTab="wallet"
      onTabChange={(tab) => console.log("Onglet sélectionné :", tab)}
      onWalletConnectPaymentComplete={(networkId, tokenId) =>
        console.log("Paiement Wallet terminé :", networkId, tokenId)
      }
      onWalletConnectPaymentError={(error) =>
        console.error("Erreur Wallet :", error)
      }
      onQrCodePaymentComplete={(networkId, tokenId) =>
        console.log("Paiement QR terminé :", networkId, tokenId)
      }
      onQrCodePaymentError={(error) => console.error("Erreur QR :", error)}
      onCardPaymentComplete={() => console.log("Paiement carte terminé")}
      onCardPaymentError={(error) => console.error("Erreur carte :", error)}
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

| Nom de prop                      | Type     | Description                                                      |
| -------------------------------- | -------- | ---------------------------------------------------------------- |
| `walletConnectButtonText`        | string   | Texte du bouton Wallet Connect.                                  |
| `qrCodeButtonText`               | string   | Texte du bouton QR Code.                                         |
| `cardButtonText`                 | string   | Texte du bouton Carte.                                           |
| `buttonClassName`                | string   | Classe CSS pour styliser les boutons.                            |
| `dialogTitle`                    | string   | Titre de la popup de paiement par carte.                         |
| `dialogDescription`              | string   | Description de la popup de paiement par carte.                   |
| `defaultTab`                     | string   | Onglet sélectionné par défaut (ex : "wallet", "qrcode", "card"). |
| `onTabChange`                    | function | Callback lors du changement d'onglet.                            |
| `onWalletConnectPaymentComplete` | function | Callback pour paiement Wallet Connect réussi.                    |
| `onWalletConnectPaymentError`    | function | Callback pour erreur Wallet Connect.                             |
| `onQrCodePaymentComplete`        | function | Callback pour paiement QR Code réussi.                           |
| `onQrCodePaymentError`           | function | Callback pour erreur QR Code.                                    |
| `onCardPaymentComplete`          | function | Callback pour paiement carte réussi.                             |
| `onCardPaymentError`             | function | Callback pour erreur carte.                                      |
| `amount`                         | number   | Montant du paiement.                                             |
| `env`                            | string   | Environnement (ex : test, production).                           |
| `recipientWalletAddress`         | string   | Adresse du portefeuille destinataire.                            |
| `paymentType`                    | string   | Type de paiement (ex : "invoice", "payment-link", "recurring").  |
| `paymentLinkId`                  | string   | ID du lien de paiement.                                          |

### Remarques

- Utilisez ce composant pour proposer plusieurs options de paiement à vos utilisateurs.
- Personnalisez l'apparence des boutons avec la prop `buttonClassName`.
- Le prop `defaultTab` permet de définir la méthode de paiement sélectionnée par défaut.
- Vérifiez la validité de `recipientWalletAddress` pour éviter les échecs de paiement.

---

## SuiWalletProvider

Un provider de contexte React pour intégrer les portefeuilles blockchain Sui. Il configure les réseaux Sui et gère les connexions portefeuille.

### Utilisation

```typescript
import SuiWalletProvider from "mileston-payment-client";

function App() {
  return (
    <SuiWalletProvider>{/* Vos composants applicatifs */}</SuiWalletProvider>
  );
}
```

### Props

| Nom de prop | Type      | Description                                          |
| ----------- | --------- | ---------------------------------------------------- |
| `children`  | ReactNode | Les composants enfants qui consommeront le contexte. |

### Remarques

- Le réseau par défaut est `testnet`, mais `mainnet` est aussi supporté.

### Fonctionnalités

- **Configuration réseau :** Configure les réseaux Sui (`testnet` et `mainnet`) via `createNetworkConfig`.
- **Connexion automatique :** Se connecte automatiquement au portefeuille à l'initialisation.
- **Gestion des requêtes :** Utilise `QueryClientProvider` pour la gestion des requêtes et du cache.

---

## WalletConnectPayment

Un composant React pour gérer les paiements via WalletConnect. Il supporte plusieurs blockchains et tokens.

### Utilisation

```typescript
import { WalletConnectPayment } from "mileston-payment-client";

function App() {
  return (
    <WalletConnectPayment
      onPaymentComplete={(networkId, tokenId) =>
        console.log("Paiement terminé :", networkId, tokenId)
      }
      onPaymentError={(error) => console.error("Erreur de paiement :", error)}
      buttonText="Connecter Wallet & Payer"
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

| Nom de prop              | Type     | Description                                   |
| ------------------------ | -------- | --------------------------------------------- |
| `onPaymentComplete`      | function | Callback pour paiement réussi.                |
| `onPaymentError`         | function | Callback pour erreur de paiement.             |
| `buttonText`             | string   | Texte du bouton de paiement.                  |
| `buttonClassName`        | string   | Classe CSS pour styliser le bouton.           |
| `recipientWalletAddress` | object   | Adresses portefeuille pour chaque blockchain. |
| `amount`                 | number   | Montant du paiement.                          |
| `paymentLinkId`          | string   | ID du lien de paiement.                       |
| `env`                    | string   | Environnement (ex : test, production).        |
| `paymentType`            | string   | Type de paiement (ex : invoice, recurring).   |
| `userUUID`               | string   | UUID utilisateur pour le suivi des paiements. |

### Remarques

- Supporte plusieurs blockchains comme Ethereum, Sui et Solana.
- Gère automatiquement la connexion portefeuille et le traitement du paiement.

---

## QrCodePayment

Un composant React pour générer et vérifier des paiements par QR code.

### Utilisation

```typescript
import { QrCodePayment } from "mileston-payment-client";

function App() {
  return (
    <QrCodePayment
      onPaymentComplete={(networkId, tokenId) =>
        console.log("Paiement terminé :", networkId, tokenId)
      }
      onPaymentError={(error) => console.error("Erreur de paiement :", error)}
      buttonText="Générer QR Paiement"
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

| Nom de prop              | Type     | Description                                   |
| ------------------------ | -------- | --------------------------------------------- |
| `onPaymentComplete`      | function | Callback pour paiement réussi.                |
| `onPaymentError`         | function | Callback pour erreur de paiement.             |
| `buttonText`             | string   | Texte du bouton QR code.                      |
| `buttonClassName`        | string   | Classe CSS pour styliser le bouton.           |
| `recipientWalletAddress` | object   | Adresses portefeuille pour chaque blockchain. |
| `amount`                 | number   | Montant du paiement.                          |
| `paymentLinkId`          | string   | ID du lien de paiement.                       |
| `env`                    | string   | Environnement (ex : test, production).        |
| `paymentType`            | string   | Type de paiement (ex : invoice, recurring).   |
| `userUUID`               | string   | UUID utilisateur pour le suivi des paiements. |

### Remarques

- Génère un QR code pour le paiement et vérifie la transaction par polling.
- Supporte plusieurs blockchains et tokens.

---

## CardPayment

Un composant React pour gérer les paiements par carte. Il s'intègre avec des services onramp pour traiter les paiements.

### Utilisation

```typescript
import { CardPayment } from "mileston-payment-client";

function App() {
  return (
    <CardPayment
      onPaymentComplete={() => console.log("Paiement carte terminé")}
      onPaymentError={(error) => console.error("Erreur carte :", error)}
      buttonText="Payer par Carte"
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

| Nom de prop              | Type     | Description                                   |
| ------------------------ | -------- | --------------------------------------------- |
| `onPaymentComplete`      | function | Callback pour paiement carte réussi.          |
| `onPaymentError`         | function | Callback pour erreur carte.                   |
| `buttonText`             | string   | Texte du bouton de paiement.                  |
| `buttonClassName`        | string   | Classe CSS pour styliser le bouton.           |
| `recipientWalletAddress` | object   | Adresses portefeuille pour chaque blockchain. |
| `amount`                 | number   | Montant du paiement.                          |
| `paymentLinkId`          | string   | ID du lien de paiement.                       |
| `env`                    | string   | Environnement (ex : test, production).        |
| `paymentType`            | string   | Type de paiement (ex : invoice, recurring).   |
| `userUUID`               | string   | UUID utilisateur pour le suivi des paiements. |

### Remarques

- Ouvre une popup pour traiter les paiements carte via des services onramp.
- Suit le statut du paiement et met à jour l'UI en conséquence.

---

## SolanaWalletProvider

Un provider de contexte React pour intégrer les portefeuilles blockchain Solana. Il configure les réseaux Solana et gère les connexions portefeuille.

### Utilisation

```typescript
import SolanaWalletProvider from "mileston-payment-client";

function App() {
  return (
    <SolanaWalletProvider env="test">
      {/* Vos composants applicatifs */}
    </SolanaWalletProvider>
  );
}
```

### Props

| Nom de prop | Type      | Description                                          |
| ----------- | --------- | ---------------------------------------------------- |
| `children`  | ReactNode | Les composants enfants qui consommeront le contexte. |
| `env`       | string    | L'environnement (ex : "test", "prod").               |

### Remarques

- Le prop `env` détermine si le provider se connecte au mainnet ou au devnet.

### Fonctionnalités

- **Configuration réseau :** Configure les réseaux Solana (`mainnet` et `devnet`) via `clusterApiUrl`.
- **Connexion automatique :** Se connecte automatiquement au portefeuille à l'initialisation.
- **Wallet Modal :** Fournit une modal pour sélectionner et connecter les portefeuilles.

---
