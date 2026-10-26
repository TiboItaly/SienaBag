# SienaBag — Maquette 4 interfaces

Prototype interactif du service de bagagerie et de logistique de bagages à Sienne.
Fichier unique, sans dépendance : ouvrir `index.html` dans un navigateur.

## Documentation

- [URS — Exigences utilisateur des quatre interfaces](URS-SienaBag.md) : spécifications par interface (client, commerçant partenaire, coursier, administrateur), priorisation MoSCoW, critères d'acceptation et jalons alignés sur la feuille de route.

## Les quatre interfaces

| Rôle | Contenu |
|---|---|
| Client (anglais) | Accueil, réservation (dépôt 5,50 EUR/jour, collecte-livraison 14 EUR, transfert aéroport 29 EUR), suivi du bagage, offre hébergeurs |
| Commerçant partenaire (italien) | Jauge de capacité, mouvements du jour, scan QR ou code à 6 chiffres, dépôt scellé, restitution avec signature cliente |
| Coursier (italien) | Tournée du jour tappa par tappa, checklist (photo, sigillo), carte de navigation type GPS, statistiques de fin de tournée |
| Administrateur (français) | Vue temps réel (KPI, carte opérationnelle, flux), ordres et timelines, points partenaires avec occupation, équipe de coursiers |

## Notes

- Maquette de démonstration : aucune donnée réelle, aucun paiement. Codes de démonstration : 582914 (dépôt) et 124076 (restitution).
- Les prix, la structure de coûts et les points partenaires cités (Tabaccheria la Lizza à Piazza Gramsci, Waterland Via dei Rossi) proviennent de la phase d'étude du business case.

## Modèle de la solution

Plateforme légère sans entrepôt : commerçants partenaires rémunérés au volume (35 % du prix du dépôt), coursiers saisonniers en two-roues, assurance 2 500 EUR par bagage, micro-hub de stockage tampon pour la collecte-livraison.
