---
sidebar_position: 2
---

# Bonnes pratiques

Les **SDKs Mileston Payments** sont conçus pour rendre vos intégrations de paiement fluides, sécurisées et conviviales pour les développeurs. En suivant ces bonnes pratiques, vous garantissez une utilisation efficace du **Client SDK** et du **Backend SDK**, tout en maintenant la sécurité et les meilleures pratiques de développement.

---

## 🚀 Pourquoi utiliser les deux SDKs ?

### Frontend + Backend = Intégration transparente

En combinant le **Mileston Client SDK** pour les workflows de paiement côté utilisateur et le **Backend SDK** pour les opérations sécurisées côté serveur, vous créez une solution de paiement robuste et fiable. Que vous génériez un lien de paiement, créiez des factures ou gériez des paiements récurrents, ces SDKs fonctionnent parfaitement ensemble.

Par exemple :

- Utilisez le **Client SDK** pour présenter des liens de paiement, des formulaires ou des statuts de paiement aux utilisateurs.
- Utilisez le **Backend SDK** pour générer et gérer en toute sécurité des liens de paiement, des factures ou des configurations de paiements récurrents.

---

## ⚙️ Exemple de workflow : combiner les SDKs pour un flux de paiement

### Étape 1 : Générer un lien de paiement côté backend

Utilisez le **Backend SDK** pour générer un lien de paiement sécurisé.

```typescript
import { PaymentLink } from "mileston-payments";

const apiKey = process.env.MILESTON_API_KEY; // Ne jamais coder en dur vos clés API !
const businessId = process.env.BUSINESS_ID;

const paymentLink = new PaymentLink(apiKey, businessId);

const createPaymentPayload = {
  amount: "100.00",
  description: "Abonnement Premium",
  customerEmail: "user@example.com",
};

const paymentLinkResponse = await paymentLink.create(createPaymentPayload);
console.log("Lien de paiement :", paymentLinkResponse.paymentLink);
```

### Étape 2 : Utiliser le lien de paiement côté frontend

Transmettez le lien de paiement généré à votre frontend. Avec le **Client SDK**, vous pouvez améliorer l'expérience utilisateur en intégrant ou affichant le lien.

```javascript
import React from "react";
import { PayButton } from "mileston-payment-client";

const paymentLink = "https://checkout.mileston.co/payment"; // Lien généré côté backend

<PayButton
  onPaymentComplete={() => console.log("Paiement terminé !")}
  onPaymentDataReceived={(data) =>
    console.log("Données de paiement reçues :", data)
  }
  onPaymentError={(error) => console.error("Erreur de paiement :", error)}
  paymentUrl={paymentLink}
  style={{ backgroundColor: "green", color: "white" }}
>
  Payer maintenant
</PayButton>;
```

---

## 🛡️ Bonnes pratiques de sécurité

1. **Gardez vos clés API en sécurité**

   - Stockez les clés API et informations sensibles dans des variables d'environnement (`process.env`).
   - Utilisez des services comme AWS Secrets Manager, HashiCorp Vault ou Azure Key Vault pour la gestion des secrets.

   🚫 **Ne codez jamais en dur vos clés API ou secrets dans votre code !**

2. **Restreignez l'accès aux clés API**

   - Limitez les permissions des clés API aux actions nécessaires.
   - Utilisez la **Checkout API Key** pour les intégrations côté client afin de garantir un accès limité.
   - Faites tourner les clés périodiquement pour réduire les risques en cas de fuite.

3. **Utilisez HTTPS**

   - Assurez toujours une communication sécurisée entre votre client, serveur et l'API Mileston.

4. **Tokenisez les données sensibles**
   - Évitez d'exposer des informations sensibles sur les utilisateurs ou les paiements. Utilisez les tokens fournis par les APIs Mileston.

---

## 📦 Cas d'usage réel : intégration du tableau de bord de paiement

Mileston propose également un **Tableau de bord Business** pour créer et gérer manuellement des liens de paiement. Ces liens peuvent ensuite être utilisés directement dans le **Client SDK** pour les intégrer à votre application sans traitement backend.

**Exemple : Utilisation d'un lien généré depuis le tableau de bord**

```javascript
import { MilestonClient } from "mileston-client-sdk";

const dashboardGeneratedLink = "https://checkout.mileston.co/payment";

<PayButton
  onPaymentComplete={() => console.log("Paiement terminé !")}
  onPaymentDataReceived={(data) =>
    console.log("Données de paiement reçues :", data)
  }
  onPaymentError={(error) => console.error("Erreur de paiement :", error)}
  paymentUrl={dashboardGeneratedLink}
  style={{ backgroundColor: "green", color: "white" }}
>
  Payer maintenant
</PayButton>;
```

---

## 🧰 Exemple avancé : paiements récurrents simplifiés

### Backend : créer un paiement récurrent

```typescript
import { RecurringPayment } from "mileston-payments";

const recurringPayment = new RecurringPayment(apiKey, businessId);

const recurringPayload = {
  amount: "50.00",
  subscriberFullName: "John Doe",
  subscriberEmail: "john.doe@example.com",
  recurringDate: new Date("2025-02-01"),
  recurringInterval: 30,
};

const recurringResponse = await recurringPayment.create(
  "Acme Corp",
  recurringPayload
);
console.log("Paiement récurrent créé :", recurringResponse);
```

### Frontend : notifier l'utilisateur

```javascript
const subscriptionDetails = {
  amount: "50.00",
  nextPaymentDate: "2025-02-01",
};

console.log(
  `Bonjour John, votre prochain paiement de $${subscriptionDetails.amount} est prévu pour le ${subscriptionDetails.nextPaymentDate}.`
);
```

---

## 🏆 Conseils de pro pour les développeurs

1. **Testez en mode sandbox**

   - Testez toujours votre intégration dans un environnement sandbox avant de passer en production.

2. **Logguez les réponses pour le débogage**

   - Enregistrez les réponses API côté backend (sans détails sensibles !) pour déboguer rapidement.

3. **La documentation est votre alliée**

   - Consultez la [documentation API Mileston](https://docs.mileston.co) pour des références détaillées et des cas d'usage avancés.

4. **Pensez modulaire**
   - Gardez votre logique de paiement modulaire pour faciliter les mises à jour et la montée en charge.

---

## 💡 Derniers mots

Utiliser les **SDKs Mileston** est un atout majeur pour toute entreprise souhaitant simplifier les paiements. Que vous soyez développeur solo ou en équipe, intégrer les SDKs frontend et backend garantit une expérience fluide, sécurisée et agréable pour les développeurs.

Bon code ! 🚀

---
