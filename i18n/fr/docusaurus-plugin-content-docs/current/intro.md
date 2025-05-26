---
sidebar_position: 1
---

# 🚀 Démarrage rapide

Bienvenue dans **l'intégration des paiements Mileston** ! 🎉 Nous sommes ravis de vous accueillir ! L'intégration de Mileston Payments est simple, amusante et ouvre votre application au monde des paiements crypto. Plongeons ensemble et créons votre **premier lien de paiement crypto** en quelques étapes !

---

## 🌟 Créez votre premier lien de paiement crypto

### 📝 Étape 1 : Créez un compte

Rendez-vous sur [**business.mileston.co**](https://business.mileston.co) et inscrivez-vous pour obtenir votre compte Mileston Business.

Vous aurez ainsi accès à notre tableau de bord puissant où toute la magie opère. ✨

---

### 🔑 Étape 2 : Obtenez votre clé API

Allez dans l’onglet **Développeurs** du tableau de bord pour générer votre **clé API**. Vous trouverez deux types de clés sous les catégories normale et checkout :

- **Clé API de test** (pour testnet, pas d'argent réel) :  
  `Mileston_TEST_hshshs7y373djdsdj...`
- **Clé API live** (pour mainnet, valeur monétaire réelle) :  
  `Mileston_LIVE_773hsiakakgddh...`

⚠️ **Astuce :**

- Utilisez la **clé API de test** pour vos tests en développement.
- Utilisez la **clé API live** pour la production afin de traiter de vrais paiements.

---

### 🛠️ Étape 3 : Installez le SDK backend

Installez notre SDK backend pour commencer à créer des liens de paiement comme un pro. Voici comment :

```bash
npm install mileston-payments
```

Ensuite, écrivez un peu de code magique comme ceci :

```javascript
import { PaymentLink } from "mileston-payments";

const apiKey = "your-api-key"; // Votre clé API
const businessId = "your-business-id"; // Votre identifiant d'entreprise

// Initialisez PaymentLink, Invoice ou RecurringPayment selon vos besoins
const paymentLink = new PaymentLink(apiKey, businessId);

// Générez un lien de paiement
const link = await paymentLink.create({
  amount: 100, // Montant dans votre devise préférée
  currency: "USD",
  description: "Exemple de paiement crypto",
});
console.log("Lien de paiement créé :", link);
```

🔍 **Où trouver votre `businessId` ?**  
Vous pouvez récupérer votre identifiant d'entreprise dans le menu déroulant sous votre logo d'entreprise dans le tableau de bord.

---

### ✨ Étape 4 : Utilisez le lien de paiement dans votre frontend

Maintenant que vous avez créé un lien de paiement, ajoutons-le à votre frontend !

Vous pouvez soit :

1. Créer votre propre bouton personnalisé, ou
2. Utiliser notre **SDK mileston-payment-client** pour une intégration transparente.

D'abord, installez le SDK client :

```bash
npm install mileston-payment-client
```

Ensuite, utilisez notre bouton de paiement préconstruit :

```jsx
import { PayButton } from "mileston-payment-client";

const App = () => (
  <PayButton
    paymentUrl="https://checkout.mileston.co/payment"
    onPaymentComplete={() => console.log("Paiement terminé !")}
    onPaymentDataReceived={(data) =>
      console.log("Données de paiement reçues :", data)
    }
    onPaymentError={(error) => console.error("Erreur de paiement :", error)}
    style={{ backgroundColor: "green", color: "white" }}
  >
    Payer maintenant
  </PayButton>
);
```

👀 **Pourquoi utiliser le `PayButton` ?**  
Il gère tout : paiement, vérification et une expérience utilisateur géniale. Vous n'avez plus qu'à siroter votre café. ☕

---

### 🛡️ Étape 5 : Gardez vos clés API en sécurité

**Important :** Utilisez toujours le SDK backend pour les clés API. Ne les exposez jamais dans le frontend, sinon vous aurez des problèmes.

---

## Cas d'utilisation réels

### Cas d'utilisation 1 : Gestion des abonnements

**Scénario** : Une entreprise SaaS souhaite automatiser les paiements mensuels de ses utilisateurs.

**Exemple de code** :

```javascript
import { SubscriptionCheckout } from "mileston-payment-client";

<SubscriptionCheckout
  businessName="SaaS Pro"
  businessLogo="https://example.com/logo.png"
  plan={{
    name: "Pro Plan",
    description: "Accès à toutes les fonctionnalités premium",
    amount: 29.99,
    currency: "USD",
    interval: "monthly",
    intervalCount: 1,
  }}
  onWalletConnectPaymentComplete={(networkId, tokenId) =>
    console.log("Paiement terminé", networkId, tokenId)
  }
  onWalletConnectPaymentError={(error) => console.error("Erreur de paiement", error)}
  paymentLinkId="subscription-link-id"
  env="test"
/>;
```

### Cas d'utilisation 2 : Génération de factures

**Scénario** : Un freelance doit envoyer des factures à ses clients pour des projets terminés.

**Exemple de code** :

```javascript
import { InvoiceCheckout } from "mileston-payment-client";

<InvoiceCheckout
  businessName="Freelance Studio"
  businessLogo="https://example.com/logo.png"
  description="Facture #4567 pour projet web"
  amount={500}
  recipientWalletAddress="0x123456789abcdef"
  onQrCodePaymentComplete={() => console.log("Paiement QR Code terminé")}
  onQrCodePaymentError={(error) =>
    console.error("Erreur de paiement QR Code", error)
  }
  paymentLinkId="invoice-id"
  env="test"
/>;
```

### Cas d'utilisation 3 : Intégration de lien de paiement

**Scénario** : Une boutique e-commerce souhaite offrir une expérience de paiement fluide.

**Exemple de code** :

```javascript
import { PaymentLinkCheckout } from "mileston-payment-client";

<PaymentLinkCheckout
  businessName="E-Shop"
  businessLogo="https://example.com/logo.png"
  bannerImage="https://example.com/banner.png"
  title="Paiement de commande"
  description="Payez votre commande"
  amount={150}
  recipientWalletAddress="0x123456789abcdef"
  onCardPaymentComplete={() => console.log("Paiement par carte terminé")}
  onCardPaymentError={(error) => console.error("Erreur de paiement par carte", error)}
  paymentLinkId="order-payment-link"
  env="test"
/>;
```

---

## 📂 Repos GitHub

Consultez nos SDK pour plus de détails et d'exemples :

- [**mileston-payments (SDK Backend)**](https://github.com/Mileston-co/mileston-payments)
- [**mileston-payment-client (SDK Frontend)**](https://github.com/Mileston-co/mileston-payment-client)

---

🎉 **Félicitations !**  
Vous venez de créer votre premier lien de paiement crypto avec Mileston Payments ! High five ! 🙌

---

## Besoin d'aide ?

Si vous avez besoin d'aide, rejoignez notre communauté Discord : [https://discord.gg/JT3BhUCy](https://discord.gg/JT3BhUCy)
