---
sidebar_position: 1
---

# Pourquoi utiliser des clés API ?

Les **clés API** sont essentielles pour intégrer les API de Mileston. Elles jouent un rôle crucial en permettant une communication sécurisée et efficace entre votre application et nos services. Voici pourquoi nous utilisons des clés API :

- **Créer des paiements par programmation** : Les clés API permettent à votre application de créer des liens de paiement, des factures et des paiements récurrents de façon automatisée et fluide.
- **Autorisation d'entreprise** : Chaque clé API est unique à votre entreprise, garantissant que seules les applications autorisées peuvent interagir avec votre compte.
- **Sécurité renforcée** : Les clés API offrent un moyen sécurisé d'authentifier les requêtes, protègent les données sensibles et assurent que seules les requêtes vérifiées sont traitées.
- **Intégration simplifiée** : Avec les clés API, pas besoin de mécanismes d'authentification complexes. C'est simple à utiliser sur toutes les plateformes.

### Associez la clé API à votre identifiant d'entreprise

En plus de votre clé API, vous aurez besoin de votre **identifiant d'entreprise** pour autoriser les requêtes API. Vous trouverez cet identifiant dans le menu déroulant à côté de votre logo d'entreprise sur le tableau de bord.

Une fois votre clé API et votre identifiant d'entreprise obtenus, vous êtes prêt à utiliser nos API ! 🚀

---

### Types de clés API

Mileston propose deux types de clés API, chacune conçue pour des cas d'usage spécifiques :

1. **Clé API normale** :

   - Utilisée dans les intégrations backend.
   - Permet des opérations sécurisées comme la création de liens de paiement, de factures et de paiements récurrents.
   - Doit être stockée en toute sécurité dans votre environnement backend.
   - **Format** :
     - Test : `Mileston_TEST_abcdefgh1234567890...`
     - Live : `Mileston_LIVE_abcdefgh1234567890...`

2. **Clé API Checkout** :
   - Utilisée dans les intégrations frontend.
   - Permet d'initier des paiements et de récupérer leur statut dans les SDK côté client comme `mileston-payment-client`.
   - Conçue avec un périmètre limité pour garantir la sécurité côté frontend.
   - **Format** :
     - Test : `Mileston_TEST_CHECKOUTKEY_abcdefgh1234567890`
     - Live : `Mileston_LIVE_CHECKOUTKEY_abcdefgh1234567890`

---

### Comment obtenir vos clés API

Pour accéder à vos clés API :

1. Rendez-vous sur le tableau de bord à [business.mileston.co](https://business.mileston.co).
2. Allez dans l'onglet **Développeurs**.
3. Vous y trouverez les clés suivantes :
   - **Clé API normale** : pour les opérations backend.
   - **Clé API Checkout** : pour les intégrations frontend.

---

### Clé API Checkout : Quoi et pourquoi ?

La **clé API Checkout** est une clé spécialisée conçue pour les applications côté client. Elle permet des interactions sécurisées avec l'API Mileston pour initier des paiements et récupérer leur statut.

#### Points clés :

- **Périmètre limité** : Restreinte à des actions spécifiques comme l'initiation de paiements et la récupération de statuts, sans accès aux opérations backend sensibles.
- **Adaptée au frontend** : Conçue pour être utilisée en toute sécurité dans les SDK côté client comme `mileston-payment-client`.
- **Facilité d'intégration** : Permet une intégration directe et simple côté frontend.

#### Considérations de sécurité :

- Utilisez toujours la clé API Checkout avec HTTPS pour garantir la sécurité des échanges.
- Évitez de coder la clé en dur dans votre code source. Utilisez des variables d'environnement ou des outils de build sécurisés pour l'injecter lors du déploiement.

---

### Envie d'en savoir plus sur Mileston ?

Visitez notre [site web](https://mileston.co) pour découvrir tous nos outils et fonctionnalités.
