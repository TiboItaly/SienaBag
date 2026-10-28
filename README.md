# SienaBag — Maquette 4 interfaces

Prototype interactif du service de bagagerie et de logistique de bagages à Sienne.
Sans dependance : ouvrir `index.html` dans un navigateur.

## Structure

- `mockup/index.html` : squelette HTML de la maquette (telephone + barre de roles + drapeaux)
- `mockup/css/style.css` : styles partages des 4 interfaces
- `js/i18n.js` : traductions Client (EN / ZH / IT)
- `mockup/js/root.js` : etat global, changement de role, toast
- `mockup/js/customer.js` : interface Client
- `mockup/js/partner.js` : interface Commercant partenaire
- `mockup/js/courier.js` : interface Coursier
- `mockup/js/admin.js` : interface Administrateur
- `mockup/js/init.js` : initialisation

L'interface Client est multilingue : drapeaux UK (EN) / CN (ZH) / IT (IT) dans la barre de statut.


## Site web client

`site/index.html` est un vrai site web responsive mobile-first pour les clients (pas un mockup) :
ouvrir `index.html` (racine du depot) dans un navigateur, de preference sur smartphone ou en mode responsive.
Drapeaux UK EN / CN ZH / IT IT dans l'en-tete, contenu traduit, lien vers la maquette 4 roles (`mockup/`).
C'est cette page qui est servie a la racine sur GitHub Pages.

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
