---
sidebar_position: 2
---

# Documentation du Backend SDK

Bienvenue sur le **Backend SDK JavaScript/TypeScript de Mileston Payments**—votre outil ultime pour gérer les liens de paiement, les virements, les factures et les paiements récurrents ! Que vous construisiez un simple système de paiement ou une solution complète de gestion, nous vous accompagnons avec un SDK sécurisé, léger et pensé pour les développeurs.

---

## 🚀 Fonctionnalités

- **Créer et gérer des liens de paiement :** Permettez à vos clients de payer facilement !
- **Envoyer des virements :** Transférez des fonds directement vers les portefeuilles des destinataires.
- **Générer et mettre à jour des factures :** De la facturation client aux rappels, gardez le contrôle sur vos paiements.
- **Gérer les paiements récurrents :** Automatisez les paiements mensuels, hebdomadaires ou même quotidiens comme un pro.
- **Sécurisé et fiable :** Dormez sur vos deux oreilles, vos paiements sont en sécurité.
- **Conçu pour les développeurs :** Simple, intuitif, et fonctionne dès l'installation.

---

## 🛠️ Installation

Commencez par installer le SDK avec `npm` :

```bash
npm install mileston-payments
```

---

## 🏁 Premiers pas

Importez le SDK et initialisez-le avec votre **clé API** et votre **Business ID**.

```typescript
import {
  PaymentLink,
  PayoutAPI,
  Invoice,
  RecurringPayment,
} from "mileston-payments";

const apiKey = "votre-api-key"; // À récupérer sur votre dashboard
const businessId = "votre-business-id"; // À récupérer dans la fenêtre qui s'affiche en cliquant sur votre profil

const paymentLink = new PaymentLink(apiKey, businessId);
const payout = new PayoutAPI(apiKey, businessId);
const invoice = new Invoice(apiKey, businessId);
const recurringPayment = new RecurringPayment(apiKey, businessId);
```

---

## 🔥 Exemples d'utilisation

### 🧾 1. **Créer un lien de paiement**

Besoin d'une solution rapide pour collecter des paiements ? Les liens de paiement sont là !

```javascript
const createPaymentPayload = {
  amount: "100.00",
  description: "Achat d'un abonnement premium",
  customerEmail: "customer@example.com",
};

const paymentLinkResponse = await paymentLink.create(createPaymentPayload);
console.log("Lien de paiement :", paymentLinkResponse.paymentLink);
// Résultat : https://checkout.mileston.co/payment-link/ahddjdjdjd8848bc123
```

Imaginez envoyer ce lien par email ou l'intégrer à votre site web. Tellement fluide, non ? 😌

---

### 💸 2. **Envoyer un virement**

Envoyez des paiements directement aux destinataires.

```typescript
const sendPayoutPayload = {
  amount: "100.00",
  recipientAddress: "0xRecipientWalletAddress",
  walletType: "eth", // Types de portefeuilles supportés : "sui", "eth", "avax", "pol", "base", "arb"
  secretPhrase: "optional-secret-phrase", // Optionnel : à utiliser pour les portefeuilles avec phrase secrète copiée
};

const payoutResponse = await payout.sendPayment(sendPayoutPayload);
console.log("Réponse virement :", payoutResponse);
// Résultat : { statusCode: 200, message: "Payout successful" }
```

#### Types de portefeuilles supportés pour les virements

- **`sui`** : Portefeuille blockchain Sui.
- **`eth`** : Portefeuille Ethereum.
- **`avax`** : Portefeuille Avalanche.
- **`pol`** : Portefeuille Polygon.
- **`base`** : Portefeuille blockchain Base.
- **`arb`** : Portefeuille Arbitrum.

#### Champ optionnel : `secretPhrase`

- **`secretPhrase`** : Utilisez ce champ si le portefeuille du destinataire nécessite une phrase secrète pour les transactions. Optionnel et uniquement pour les portefeuilles avec secret copié.

---

### 📄 3. **Générer une facture**

Parce qu'être professionnel, ça compte !

```javascript
const createInvoicePayload = {
  amount: "200.00",
  itemName: "Frais de service",
  customerEmail: "client@example.com",
  dueDate: new Date(),
  addPdf: true, // Inclure une version PDF de la facture
};

const businessName = "Acme Corporation"; // Le nom de votre entreprise

const invoiceResponse = await invoice.create(
  businessName,
  createInvoicePayload
);
console.log("Lien de facture :", invoiceResponse.invoiceLink);
// Résultat : https://checkout.mileston.co/invoice/ahddjdjdjd8848bc123
```

Vos utilisateurs reçoivent automatiquement un email dès la création de la facture. Qui aurait cru qu'on pouvait être cool en relançant les paiements ? 😎

---

### 🔄 4. **Gérer les paiements récurrents**

Configurez et oubliez ! Automatisez les abonnements facilement.

```javascript
const createRecurringPaymentPayload = {
  amount: "50.00",
  subscriberFullName: "John Doe",
  subscriberEmail: "john.doe@example.com",
  recurringDate: new Date("2025-01-01"),
  recurringInterval: 30, // Jours entre chaque paiement
  addPdf: true, // Inclure un PDF des détails du paiement récurrent
};

const recurringPaymentResponse = await recurringPayment.create(
  businessName,
  createRecurringPaymentPayload
);
console.log("Paiement récurrent créé :", recurringPaymentResponse);
// Résultat : https://checkout.mileston.co/recurring-payment/ahddjdjdjd8848bc123
```

Vos utilisateurs reçoivent automatiquement un email pour payer, puis un rappel à chaque échéance ! John ne manquera plus jamais un paiement, et vous non plus ! 💸

---

### 🛠️ 5. **Mettre à jour un lien de paiement**

Le client a changé d'avis ? Pas de souci—mettez à jour le lien instantanément.

```javascript
const updatePayload = {
  amount: "120.00",
  description: "Frais d'abonnement mis à jour",
};

const updatedPaymentLink = await paymentLink.update(
  "paymentLinkId",
  updatePayload
);
console.log("Lien de paiement mis à jour :", updatedPaymentLink);
// Résultat : { id: 'pl123', amount: '120.00', description: 'Frais d\'abonnement mis à jour' }
```

Vous gardez le contrôle total—fini les « Oups ! »

---

### 🛠️ 6. **Mettre à jour une facture**

Besoin de modifier une facture ? Faites-le facilement.

```javascript
const updateInvoicePayload = {
  amount: "250.00",
  itemName: "Frais de service mis à jour",
  dueDate: new Date("2025-01-15"),
};

const updatedInvoice = await invoice.update("invoiceId", updateInvoicePayload);
console.log("Facture mise à jour :", updatedInvoice);
// Résultat : { id: 'inv123', amount: '250.00', itemName: 'Frais de service mis à jour', dueDate: '2025-01-15' }
```

---

### 🛠️ 7. **Récupérer une facture**

Obtenez les détails d'une facture spécifique.

```javascript
const invoiceData = await invoice.get("invoiceId");
console.log("Données facture :", invoiceData);
// Résultat : { id: 'inv123', amount: '200.00', itemName: 'Frais de service', ... }
```

---

### 🛠️ 8. **Supprimer une facture**

Supprimez une facture devenue inutile.

```javascript
await invoice.delete("invoiceId");
console.log("Facture supprimée.");
```

---

### 🛠️ 9. **Mettre à jour un paiement récurrent**

Modifiez les détails d'un paiement récurrent existant.

```javascript
const updateRecurringPaymentPayload = {
  amount: "60.00",
  recurringInterval: 15, // Intervalle mis à jour à 15 jours
};

const updatedRecurringPayment = await recurringPayment.update(
  "recurringPaymentId",
  updateRecurringPaymentPayload
);
console.log("Paiement récurrent mis à jour :", updatedRecurringPayment);
// Résultat : { id: 'rp123', amount: '60.00', recurringInterval: 15, ... }
```

---

### 🛠️ 10. **Récupérer un paiement récurrent**

Obtenez les détails d'un paiement récurrent spécifique.

```javascript
const recurringPaymentData = await recurringPayment.get("recurringPaymentId");
console.log("Données paiement récurrent :", recurringPaymentData);
// Résultat : { id: 'rp123', amount: '50.00', recurringInterval: 30, ... }
```

---

### 🛠️ 11. **Supprimer un paiement récurrent**

Annulez un paiement récurrent devenu inutile.

```javascript
await recurringPayment.delete("recurringPaymentId");
console.log("Paiement récurrent supprimé.");
```

---

### 💥 Bonus : Récupérer & supprimer des données

- **Obtenir un lien de paiement :**

```javascript
const paymentData = await paymentLink.get("paymentLinkId");
console.log(paymentData);
```

- **Supprimer un lien de paiement :**

```javascript
await paymentLink.delete("paymentLinkId");
console.log("Lien de paiement supprimé.");
```

- Des méthodes similaires existent pour les factures et paiements récurrents. Amusez-vous ! 🎉

---

## 🌟 Exemple réel

Découvrez comment cette application [https://sui-invoice.vercel.app/](https://sui-invoice.vercel.app/) utilise Mileston pour gérer la facturation des freelances.

## 📚 Référence API

### **Classe `PaymentLink`**

- **`create(payload: CreatePaymentLinkPayload): Promise<CreatePaymentLinkResponse>`**  
  Crée un nouveau lien de paiement.
- **`update(id: string, payload: UpdatePaymentLinkPayload): Promise<UpdatePaymentLinkResponse>`**  
  Met à jour un lien de paiement existant.
- **`get(id: string): Promise<UpdatePaymentLinkResponse>`**  
  Récupère les détails d'un lien de paiement spécifique.
- **`delete(id: string): Promise<DeletePaymentLinkResponse>`**  
  Supprime un lien de paiement.

### **Classe `PayoutAPI`**

- **`sendPayment(payload: SendPayoutRequest): Promise<SendPayoutResponse>`**  
  Effectue un virement à un destinataire.

### **Classe `Invoice`**

- Méthodes similaires pour créer, mettre à jour, récupérer et supprimer des factures.

### **Classe `RecurringPayment`**

- **`create(payload: CreateRecurringPaymentPayload): Promise<CreateRecurringPaymentResponse>`**  
  Configure un paiement récurrent.
- **`update(id: string, payload: UpdateRecurringPaymentPayload): Promise<UpdateRecurringPaymentResponse>`**  
  Met à jour les détails d'un paiement récurrent.
- **`getAll(): Promise<GetAllRecurringPaymentResponse>`**  
  Récupère tous les paiements récurrents actifs.

---

## 🛡️ Conseils de pro

- **Sécurisez votre clé API !** Ne la codez jamais en dur—utilisez des variables d'environnement.
- **Gestion des erreurs :** Encapsulez tous les appels dans des blocs try-catch pour une expérience plus fluide.

---

## 🤝 Contribuer

Des idées pour améliorer ce SDK ? Forkez le repo, soumettez des pull requests, et rendons cet outil encore plus génial ensemble.

---

## 🎉 Lancez-vous !

Dites adieu au chaos des paiements et bonjour à la réussite simplifiée. Installez le SDK, codez, et laissez la magie opérer. ✨

```bash
npm install mileston-payments
```

Qu'attendez-vous ? Créez quelque chose d'incroyable ! 🚀
