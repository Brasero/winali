# 📄 Documentation PartiChance

## 👨‍💼 Partie 1 — Documentation Utilisateur

### ▶️ Pour les vendeurs

`Objectif :` Vendre un bien (voiture, téléphone, etc.) sous forme de tickets de loterie

`✅ Étapes :`

1. `Créer un compte` sur la plateforme avec un e-mail valide

2. `Valider son e-mail` en cliquant sur le lien reçu

3. `Se connecter` et accéder à l'espace vendeur

4. > `Créer une campagne :` 
> - Titre, description, photos du bien
> - Prix unitaire du ticket
> - Nombre minimum de tickets à vendre pour valider la vente
> - Date limite du tirage
> - Option pour permettre la vente de tickets au-delà du minimum

5. `Suivre en temps réel` la progression (nombre de tickets vendus)

6. > `Tirage au sort automatique :`
> - Si l'objectif est atteint → un ticket est tiré au sort
> - Sinon, tous les participants sont remboursés

7. `Réception des fonds :` vous recevez la somme totale nette de commission via Stripe

### ▶️ Pour les acheteurs

`Objectif :` Acheter un ou plusieurs tickets pour tenter de gagner un bien mis en jeu

`✅ Étapes :`

1. ``Créer un compte`` sur la plateforme avec un e-mail

2. ``Naviguer dans les campagnes`` actives

3. ``Choisir une campagne`` et consulter les détails

4. ``Acheter 1 ou plusieurs tickets`` via Stripe (paiement sécurisé)

5. ``Suivre la campagne`` jusqu'à la date de tirage

6. ``Recevoir une notification`` si vous êtes tiré au sort

7. ``Remboursement automatique`` si la campagne échoue (objectif non atteint)