# Webhooks

---

## Aperçu

Les webhooks vous permettent de recevoir des notifications en temps réel lorsque des événements spécifiques se produisent sur la plateforme Mileston Business. Vous pouvez utiliser les webhooks pour automatiser des workflows, mettre à jour votre base de données ou déclencher d'autres actions dans votre application.

L'onglet **Développeurs** du tableau de bord Mileston Business fournit une interface pour gérer vos webhooks, y compris l'enregistrement de nouveaux webhooks, la visualisation des existants et leur suppression.

---

## Accéder à l'onglet Développeurs

1. Connectez-vous à votre compte Mileston Business.
2. Naviguez vers l'onglet **Développeurs** dans le menu latéral.
3. Dans la section **Webhooks**, vous trouverez les options pour gérer vos webhooks.

---

## Configuration des webhooks

### **Étape 1 : Enregistrer un webhook**

1. Dans l'onglet **Développeurs**, accédez à la section **Webhooks**.
2. Cliquez sur le bouton **Enregistrer un webhook**.
3. Renseignez les informations suivantes :

   - **URL de l'endpoint** : L'URL de votre endpoint webhook où les événements seront envoyés.
   - **Jeton de vérification** : Un jeton utilisé pour vérifier l'authenticité des requêtes webhook.
   - **Événements** : Sélectionnez les événements auxquels vous souhaitez vous abonner. Si aucun événement n'est sélectionné, les événements par défaut (`invoice-paid`, `paymentlink-paid`, `recurring-paid`) seront utilisés.

4. Cliquez sur **Enregistrer** pour valider le webhook.

---

### **Étape 2 : Voir les webhooks enregistrés**

Dans la section **Webhooks** de l'onglet **Développeurs**, vous verrez la liste de tous les webhooks enregistrés.

---

### **Étape 3 : Supprimer un webhook**

1. Repérez le webhook à supprimer dans la liste des webhooks enregistrés.
2. Cliquez sur le bouton **Supprimer** à côté du webhook.

---

## Événements webhook

Les événements suivants sont pris en charge :

- **`invoice-paid`** : Déclenché lorsqu'une facture est payée.
- **`paymentlink-paid`** : Déclenché lorsqu'un lien de paiement est payé.
- **`recurring-paid`** : Déclenché lorsqu'un paiement récurrent est effectué.

---

## Payload du webhook

Lorsqu'un événement est déclenché, le webhook envoie une requête `POST` à votre endpoint configuré avec la structure de payload suivante :

### Exemple de payload pour `paymentlink-paid`

```json
{
  "event": "paymentlink-paid",
  "payload": {
    "paymentLinkId": "id",
    "payer": "0x2.................",
    "recipientWalletAddress": "0x4..............",
    "amount": "1",
    "userUUID": "id",
    "transactionSignature": "0xc................",
    "feeSignature": "0x1....................",
    "chain": "pol",
    "env": "test",
    "status": "paid",
    "createdAt": "2025-05-16T20:38:25.343Z"
  }
}
```

### Description des champs

- **`event`** : Le nom de l'événement déclenché (ici `paymentlink-paid`).
- **`payload`** : Les données associées à l'événement, comprenant :
  - **`paymentLinkId`** : L'identifiant unique du lien de paiement.
  - **`payer`** : L'adresse du portefeuille du payeur.
  - **`recipientWalletAddress`** : L'adresse du portefeuille du destinataire.
  - **`amount`** : Le montant payé.
  - **`userUUID`** : L'identifiant unique de l'utilisateur associé au lien de paiement.
  - **`transactionSignature`** : La signature de la transaction de paiement.
  - **`feeSignature`** : La signature des frais associés à la transaction.
  - **`chain`** : Le réseau blockchain où la transaction a eu lieu (ex : `pol` pour Polygon).
  - **`env`** : L'environnement dans lequel la transaction a eu lieu (`test` ou `prod`).
  - **`status`** : Le statut du paiement (ex : `paid`).
  - **`createdAt`** : L'horodatage de la création du paiement.

---

## Consommer les webhooks : exemple d'implémentation d'endpoint

Pour recevoir et traiter les événements webhook, vous devez créer un endpoint HTTP dans votre application. Le service webhook enverra une requête POST à cet endpoint chaque fois qu'un événement auquel vous êtes abonné est déclenché.

### **Vérification de la signature du webhook**

Chaque requête webhook inclut un en-tête `X-Webhook-Signature`. Cet en-tête contient le jeton de vérification que vous avez fourni lors de l'enregistrement du webhook. Vous devez vérifier ce jeton dans votre endpoint pour garantir l'authenticité de la requête.

### **Exemple : Endpoint Node.js/Express**

```javascript
const express = require("express");
const app = express();
app.use(express.json());

// Remplacez par votre vrai jeton de vérification depuis le dashboard
const VERIFICATION_TOKEN = "votre-jeton-de-verification";

app.post("/votre-endpoint-webhook", (req, res) => {
  const signature = req.headers["x-webhook-signature"];
  if (signature !== VERIFICATION_TOKEN) {
    // Jeton invalide, rejeter la requête
    return res.status(401).json({ error: "Signature de webhook invalide" });
  }

  // Traitez l'événement webhook
  const { event, payload } = req.body;
  // ... votre logique ici ...

  // Toujours retourner 200 OK après un traitement réussi
  res.status(200).json({ received: true });
});

app.listen(3000, () =>
  console.log("Endpoint webhook en écoute sur le port 3000")
);
```

**Important :**

- Vérifiez toujours que l'en-tête `X-Webhook-Signature` correspond à votre jeton de vérification.
- Retournez toujours HTTP 200 après avoir traité le webhook avec succès. Si vous retournez un statut différent de 200, le webhook sera retenté.
- Assurez-vous que votre endpoint est accessible depuis Internet.

## Support

Si vous rencontrez des problèmes ou avez des questions, rejoignez notre communauté Discord : https://discord.gg/JT3BhUCy
