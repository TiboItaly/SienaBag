# URS — SienaBag : Spécifications des exigences utilisateur

## 1. Objet et périmètre

Le présent document traduit le business case « Bagagerie et logistique de bagages à Sienne » et la maquette validée (dépôt SienaBag) en exigences utilisateur vérifiables, organisées par interface. Il constitue le document de référence entre le porteur du projet et l'équipe de développement, et servira de base au cahier des charges fonctionnel puis aux recettes.

Interfaces couvertes :

1. Interface client (voyageur, hébergeur prescripteur) — application mobile ou web responsive.
2. Interface commerçant partenaire — tablette ou navigateur en boutique.
3. Interface coursier — application mobile.
4. Interface administrateur — application web.

Sont hors périmètre de la présente version : l'extension multi-ville, la tarification dynamique, l'intégration aux systèmes PMS des hôtels et la billetterie transport. Ces sujets seront traités dans une version ultérieure.

## 2. Acteurs et rôles

| Acteur | Rôle | Interface principale |
|---|---|---|
| Voyageur | Réserve, paie, remet et récupère ses bagages | Client |
| Hôte ou hébergeur | Prescrit le service, souscrit l'abonnement conciergerie | Client (espace Hosts) |
| Commerçant partenaire | Accueille, scelle et restitue les bagages déposés | Commerçant |
| Coursier | Collecte, transporte et livre les bagages | Coursier |
| Administrateur | Supervise l'opération, affecte les ressources, pilote l'activité | Admin |
| Systèmes externes | Paiement, envoi de SMS, notifications push, cartographie | Transverse |

## 3. Conventions

- Identifiants : UR-CL (client), UR-CO (commerçant), UR-CU (coursier), UR-AD (administrateur), UR-TR (transverse), suivis d'un numéro séquentiel.
- Priorités selon MoSCoW : M (Must — indispensable au pilote), S (Should — nécessaire à la montée en charge), C (Could — consolidation).
- Chaque exigence est assortie d'un critère d'acceptation vérifiable lors de la recette.

## 4. Interface client

### 4.1 Accès et compte

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-CL-001 | Le voyageur peut réserver sans créer de compte, avec la seule adresse de messagerie ou le numéro de téléphone | M | Une réservation complète aboutit sans inscription préalable |
| UR-CL-002 | L'interface est disponible en anglais, italien et français, avec l'anglais par défaut | M | Les trois locales couvrent tous les écrans ; aucun texte codé en dur |
| UR-CL-003 | L'historique des réservations et le code de remise restent accessibles via un lien permanent et un code | M | Le lien de suivi reste valide au moins 12 mois |

### 4.2 Réservation

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-CL-010 | Le client choisit parmi les trois services : dépôt, collecte-livraison, transfert aéroport | M | Les trois services sont réservables de bout en bout |
| UR-CL-011 | Le client saisit le nombre de bagages, la date, le créneau horaire et le point ou l'adresse de remise | M | La réservation n'est confirmable qu'une fois tous les champs validés |
| UR-CL-012 | Le moteur calcule le prix en temps réel selon la grille du business case : 5,50 € par bagage et par jour ; 14 € jusqu'à trois bagages pour la livraison intra-Sienne ; 29 € vers Florence et 35 € vers Pise | M | Le total affiché correspond à la grille pour toute combinaison testée |
| UR-CL-013 | Le système vérifie la capacité disponible du point partenaire ou du créneau coursier avant de confirmer | M | Un point saturé ou un créneau complet n'est pas proposé |
| UR-CL-014 | Le client reçoit un code de remise à six chiffres et un lien de suivi immédiatement après paiement | M | Le code est unique, généré côté serveur et communiqué par SMS et courriel en moins de 60 secondes |
| UR-CL-015 | Le client peut annuler gratuitement jusqu'à deux heures avant le créneau réservé | M | Le remboursement est total et automatique dans ce délai |
| UR-CL-016 | Le client peut ajouter un bagage à une réservation existante avant le début du créneau | S | L'ajout recalcule le prix et met à jour la capacité du partenaire |

### 4.3 Paiement

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-CL-020 | Le paiement s'effectue en ligne par carte ou portefeuille numérique au moment de la réservation | M | Aucun règlement en espèces n'est requis pour la prestation |
| UR-CL-021 | Le reçu inclut le détail des prestations et la mention de l'assurance | M | Le reçu est envoyé automatiquement et archivé |

### 4.4 Suivi et remise

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-CL-030 | Le lien de suivi affiche la chronologie du bagage : réservé, collecté, en stockage, livré | M | Chaque changement d'état notifié par les intervenants se propage en moins de 30 secondes |
| UR-CL-031 | Le client reçoit une notification à chaque changement d'état | S | Le taux de livraison des notifications dépasse 99 % |
| UR-CL-032 | La page de suivi affiche la couverture d'assurance et le plafond de 2 500 € par bagage | M | L'information est visible sans action de l'utilisateur |

### 4.5 Espace hébergeurs

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-CL-040 | L'hébergeur consulte l'offre conciergerie, souscrit l'abonnement à 39 € par mois et gère son abonnement | S | La souscription et la résiliation sont autonomes, sans intervention humaine |
| UR-CL-041 | L'hébergeur dispose d'un modèle de message d'accueil incluant un lien de réservation traçable | S | Les réservations issues du lien sont attribuées à l'hébergeur dans les rapports |
| UR-CL-042 | L'hébergeur accède à un tableau de bord : invités servis, avis, économies de temps | C | Les indicateurs sont calculés à partir des données réelles |

## 5. Interface commerçant partenaire

### 5.1 Journée et capacité

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-CO-001 | Le commerçant visualise les arrivées prévues du jour avec créneau, nom du client, nombre de bagages et code | M | La liste est fidèle aux réservations et actualisée en temps réel |
| UR-CO-002 | Le commerçant paramètre sa capacité quotidienne de bagages ; le système n'affecte pas de réservation au-delà | M | Aucune réservation n'est attribuée une fois la capacité atteinte |
| UR-CO-003 | La jauge d'occupation s'affiche en permanence avec alerte à 80 % | S | L'alerte est visible par le commerçant et l'administrateur |

### 5.2 Dépôt des bagages

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-CO-010 | Le commerçant enregistre un dépôt par scan du code QR du client ou saisie du code à six chiffres | M | Les deux méthodes ouvrent la fiche de réservation en moins de cinq secondes |
| UR-CO-011 | La fiche affiche les contrôles obligatoires : nombre de bagages, photographie, pose du scellé | M | Le dépôt n'est validable qu'après photo et scellé renseignés |
| UR-CO-012 | Le système génère une étiquette identifiant chaque bagage et l'associe à la réservation | M | Chaque bagage porte un identifiant unique et traçable |
| UR-CO-013 | Une consigne de refus (bagage interdit, suspect ou non conforme) est accessible en un geste | M | Le refus est motivé et notifie le client et l'administrateur |

### 5.3 Restitution des bagages

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-CO-020 | La restitution requiert le code client, complété par la signature du client sur l'écran | M | Aucune restitution sans les deux validations ; horodatage conservé |
| UR-CO-021 | En cas de restitution par un coursier, la validation se fait par le coursier avec son identifiant propre | M | La chaîne de responsabilité est documentée de bout en bout |

### 5.4 Rémunération et relation

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-CO-030 | Le commerçant visualise sa quote-part en temps réel (35 % du prix du dépôt) et son cumul mensuel | M | Le décompte correspond aux dépôts effectivement réalisés |
| UR-CO-031 | Le reversement est automatique chaque semaine avec justificatif téléchargeable | S | Le virement et le justificatif sont émis sans intervention manuelle |
| UR-CO-032 | Le contrat, l'attestation d'assurance et les conditions générales sont accessibles depuis l'interface | S | Les documents à jour sont téléchargeables en un clic |

## 6. Interface coursier

### 6.1 Tournée

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-CU-001 | Le coursier consulte sa tournée du jour ordonnée, avec pour chaque tappa : action (collecte ou livraison), adresse, créneau, nombre de bagages, client | M | La tournée est réceptionnée avant le départ et synchronisée en cas de changement |
| UR-CU-002 | La tournée est optimisée par regroupement des collectes et livraisons | S | L'ordre proposé minimise la distance totale |
| UR-CU-003 | Le coursier visualise ses statistiques : tappas réalisées, bagages transportés, kilomètres, rémunération de la journée | M | Les compteurs s'actualisent à chaque validation de tappa |

### 6.2 Exécution d'une tappa

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-CU-010 | La collecte suit la checklist obligatoire : vérification du code client, comptage, photographie, pose du scellé | M | La tappa n'est pas validable sans les quatre contrôles renseignés |
| UR-CU-011 | Le changement d'état notifie automatiquement le client et l'administrateur | M | La notification part en moins de 30 secondes après validation |
| UR-CU-012 | Le coursier peut signaler un incident (client absent, bagage non conforme, refus) avec photo et commentaire | M | L'incident alerte l'administrateur en temps réel et ouvre un dossier |
| UR-CU-013 | La livraison se clôt par signature du destinataire ou vérification de son code | M | Aucune clôture sans preuve de remise horodatée |

### 6.3 Navigation

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-CU-020 | La carte affiche l'itinéraire de la tappa, la position courante et la tappa suivante avec distance et durée estimées | S | L'estimation est réactualisée à intervalle régulier |
| UR-CU-021 | Le passage au GPS externe (application de navigation du téléphone) est possible en un geste | S | Le point de destination se transmet correctement à l'application externe |

## 7. Interface administrateur

### 7.1 Supervision temps réel

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-AD-001 | Le tableau de bord affiche les indicateurs du jour : bagages en transit, en stockage, coursiers actifs, chiffre d'affaires | M | Les indicateurs sont exacts à moins d'une minute près |
| UR-AD-002 | La carte opérationnelle localise points partenaires, coursiers et bagages en transit | M | Les positions s'actualisent sans rechargement manuel |
| UR-AD-003 | Le flux d'activité recense les événements : dépôts, collectes, livraisons, incidents, alertes de capacité | S | Aucun événement critique ne reste invisible plus de cinq minutes |

### 7.2 Gestion des ordres

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-AD-010 | L'administrateur consulte tout ordre avec sa chronologie complète, son prix et son intervenant | M | La chronologie reflète l'ensemble des validations des autres interfaces |
| UR-AD-011 | L'administrateur réaffecte un ordre à un autre coursier, avec notification des deux parties | M | La réaffectation prend effet sans ressaisie |
| UR-AD-012 | L'administrateur traite un litige (retard, perte, dommage) avec dossier, photos et déclenchement de l'assurance | S | Un dossier de sinistre complet est exportable pour l'assureur |

### 7.3 Gestion des points partenaires

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-AD-020 | L'administrateur gère le cycle de vie d'un point partenaire : recrutement, période d'essai, activation, suspension | M | Seuls les points actifs reçoivent des réservations |
| UR-AD-021 | L'administrateur visualise l'occupation de chaque point et les volumes mensuels | M | L'occupation affichée correspond à la réalité opérationnelle |
| UR-AD-022 | L'administrateur ajuste la capacité d'un point à la demande du commerçant | S | Le changement est effectif immédiatement |

### 7.4 Gestion des coursiers

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-AD-030 | L'administrateur gère les coursiers : création, vacation, statut (en tournée, en pause, hors service) | M | La liste reflète l'état réel des tournées |
| UR-AD-031 | L'administrateur construit ou ajuste les tournées, y compris en séquence (affectation de tappas) | S | Une tappa peut être réaffectée en moins d'une minute |

### 7.5 Pilotage et conformité

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-AD-040 | L'administrateur exporte les données de pilotage : volumes par service, chiffre d'affaires, quote-parts partenaires, rémunérations coursiers | M | Les exports couvrent une période libre et sont exploitables en tableur |
| UR-AD-041 | Le registre des dépôts (identification, mouvements, responsables) est consultable et exportable pour conformité | M | Toute entrée et sortie de bagage est tracée avec horodatage et intervenant |

## 8. Exigences transverses

| ID | Exigence | P | Critère d'acceptation |
|---|---|---|---|
| UR-TR-001 | Toutes les données personnelles sont traitées conformément au RGPD : minimisation, consentement, droit à l'effacement dans les délais légaux | M | Registre des traitements complet ; effacement exécutable en 30 jours |
| UR-TR-002 | Les codes de remise sont uniques, à usage contrôlé et expirent après la remise | M | Un code réutilisé après remise est refusé |
| UR-TR-003 | La chaîne de responsabilité de chaque bagage est ininterrompue : tout mouvement associe un intervenant identifié et un horodatage | M | L'audit d'un bagage restitue l'intégralité de ses mouvements |
| UR-TR-004 | La couverture d'assurance par bagage (plafond 2 500 €) est appliquée à toutes les prestations | M | Le plafond figure dans les conditions de réservation et le reçu |
| UR-TR-005 | L'application fonctionne sur réseaux mobiles de qualité variable ; les tappas validées hors connexion sont synchronisées à la reconnexion | S | Aucune validation n'est perdue en cas de coupure réseau |
| UR-TR-006 | Les interfaces critiques supportent les pics saisonniers (Palio, week-ends de haute saison) | S | Dégradation de service inférieure à 2 % sous charge de pointe |
| UR-TR-007 | Les sauvegardes journalières permettent une restauration en moins de quatre heures | S | Un test de restauration documenté est réalisé avant mise en production |
| UR-TR-008 | Les accès sont protégés par authentification nominative et rôles séparés ; aucune action sensible sans identité | M | Journal d'audit des accès et des actions sensibles disponible |
| UR-TR-009 | La facturation et les reversements (commerçants 35 %, coursiers, remboursements) sont calculés par le système sans ressaisie manuelle | S | Un contrôle par échantillon confirme l'exactitude sur un mois complet |

## 9. Priorisation et jalons

| Priorité | Contenu typique | Jalon associé (feuille de route du business case) |
|---|---|---|
| Must | Réservation et paiement, dépôt et restitution avec scellés et codes, tournée coursier avec checklist, supervision administrateur de base, traçabilité et RGPD | Phase 2 — pilote (une saison, trois points, services P1 et P2 manuels) |
| Should | Notifications push, optimisation de tournée, navigation GPS, espace hébergeurs avec abonnement, gestion des litiges et sinistres, reversements automatisés | Phase 3 — montée en charge (plateforme de réservation, lancement P3 et P4) |
| Could | Tableaux de bord hébergeurs, exports avancés, statistiques de fidélisation | Phase 4 — consolidation, préparation de l'extension territoriale |

## 10. Points à arbitrer avant la rédaction du cahier des charges technique

1. Application native, hybride ou web responsive pour le client et le coursier : arbitrage coût et délai, la maquette étant pleinement compatible web.
2. Paiement au moment de la réservation ou à la remise effective du bagage (impact sur les remboursements et les impayés).
3. Gestion du refus de bagage suspect : procédure détaillée et interactions avec les obligations réglementaires.
4. Choix du prestataire de paiement et du prestataire SMS en Italie (coûts unitaires sensibles sur les marges de la ligne P1).
5. Politique de retenue en cas de non-retrait d'un bagage au-delà de la durée réservée.
6. Authentification des commerçants : compte nominatif par enseigne ou par employé.

---

Document de travail — version 1, en date du 26 octobre 2026. Toute exigence modifiée après validation devra suivre une procédure de gestion des modifications avec impact sur le planning et les coûts.