# 🧑‍💻 Partie 2 — Documentation Développeur (API REST)

## 🔒 Authentification

- ``POST /auth/signup`` → création de compte

- ``POST /auth/login`` → connexion

- ``GET /auth/verify-email?token=...`` → validation de l'e-mail

- Sécurité : JWT dans header ``Authorization: Bearer <token>``

## 🏠 Campagnes

- ``GET /campaigns`` : liste paginée des campagnes actives

- ``POST /campaigns`` : création d'une nouvelle campagne (auth requise)

- ``GET /campaigns/:id`` : détails d'une campagne

## 🎫 Tickets

- ``POST /campaigns/:id/tickets`` : achat de X tickets

- - Redirection vers Stripe Checkout avec ID de session retourné
- - Chaque ticket = une chance de gagner (1 ligne par ticket)

## 💳 Webhooks & Paiements

- ``POST /webhooks/stripe``

- - Reçoit tous les événements Stripe

- - Crée tickets si paiement = success

- - Gère remboursements et transferts seller

## 🌟 Tirage

- ``POST /campaigns/:id/draw``

- - Tirage automatique ou forcé (admin)

- - Un ticket est tiré au sort par algorithme aléatoire

- - Stockage du winning_ticket_id dans la table draws

## 🛠️ Outils et Format

- OpenAPI 3.0 disponible [partichance_openapi.yaml]

- Auth JWT ou Session token (configurable)

- Format de réponse JSON

- Middleware de vérification d'authentification pour toutes les routes /me, /campaigns, /tickets

## 🚀 Roadmap technique

- Ajouter KYC et vérification d'identité pour les vendeurs

- Système de notification (email, in-app)

- Dashboard admin pour suivi global des campagnes