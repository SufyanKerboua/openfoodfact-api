# openfoodfact-api

Le but de cette API NestJS est de pouvoir obtenir des informations sur des codes barres via l'API OpenFoodFact.
## Description

Cette API permet les fonctionnalités suivantes :

- Inscription d'un utilisateur via username / password
- Authentification d'un utilisateur via username / password
- Sur une route authentifiée, permettre la recherche d'un produit par son code barre sur l'API de OpenFoodFacts
- Suppression de toutes les produits d'un utilisateur
- Mise à jour du profil de l'utilisateur
- Suppression du profil de l'utilisateur

## Documentation

2 types de documentation ont été réalisé concernant ce projet:
- Un swagger de l'API
- Architecture de BDD

## Language de programmation

Concernant chaque partie du projet coté back-end voici les languages/frameworks/API utilisée.
- **Frame-work Back-end:** `NestJS`
- **BDD:** `MongoDB`
- **API externe:** `API OpenFoodFact`

### Dépendences NestJS
- axios
- passport-jwt
- mongoose

## Installation

```bash
$ npm install
# installation des packets manquants
```

A noter que toutes les configurations concernant l'API sont situées dans le fichier **src/constants.js**.

## Scripts disponibles

```bash
# mode development
$ npm run start

# production mode
$ npm run start:prod
```

## Auteur

- Sufyan Kerboua

