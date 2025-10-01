# Guide de Reproduction de l'Application : ISP Bukavu Student Manager

Ce document explique comment cloner, installer, configurer et exécuter l'application "ISP Bukavu Student Manager" sur n'importe quelle machine de développement.

## 1. Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre système :

- **[Node.js](https://nodejs.org/)** (Version 18.x LTS ou plus récente est recommandée)
- **[npm](https://www.npmjs.com/)** (généralement inclus avec Node.js)
- **[Git](https://git-scm.com/)** (pour cloner le projet)

## 2. Installation

Suivez ces étapes pour installer le projet localement :

1.  **Cloner le dépôt :**
    Ouvrez votre terminal ou invite de commandes et clonez le code source du projet. (Note : L'URL du dépôt est un placeholder, vous devrez utiliser l'URL de votre projet).
    ```bash
    git clone <URL_DU_DEPOT_GIT>
    cd isp-bukavu-student-manager
    ```

2.  **Installer les dépendances :**
    Une fois dans le répertoire du projet, exécutez la commande suivante pour installer toutes les dépendances nécessaires listées dans le fichier `package.json`.
    ```bash
    npm install
    ```
    Cette commande installera Angular, Tailwind CSS, TypeScript, et d'autres outils de développement.

## 3. Lancement en Mode Développement

Pour lancer l'application en mode développement avec rechargement automatique (hot-reloading) :

```bash
npm start
```

Cette commande effectue les actions suivantes :
1.  Compile les fichiers TypeScript (`.ts`) en JavaScript.
2.  Compile les styles Tailwind CSS (`styles.css`).
3.  Lance un serveur de développement local (généralement sur `http://localhost:3000` ou un port similaire).
4.  Surveille les changements dans les fichiers TypeScript et CSS pour recompiler automatiquement.

Après avoir lancé la commande, ouvrez votre navigateur et accédez à l'URL fournie dans le terminal pour voir l'application.

## 4. Compilation pour la Production

Pour créer une version optimisée de l'application pour le déploiement :

```bash
npm run build
```

Cette commande va :
1.  Compiler les fichiers TypeScript.
2.  Compiler et minifier les styles Tailwind CSS.
3.  Copier les fichiers nécessaires (`index.html`, etc.) dans le répertoire `dist/`.

Le contenu du dossier `dist/` est prêt à être déployé sur un serveur web statique.

## 5. Structure du Projet

Voici un aperçu des fichiers et dossiers importants :

-   `index.html`: Le point d'entrée HTML de l'application.
-   `index.tsx`: Le point d'entrée TypeScript qui initialise et "bootstrap" l'application Angular.
-   `package.json`: Définit les scripts (`start`, `build`) et les dépendances du projet.
-   `tailwind.config.js`: Fichier de configuration pour Tailwind CSS.
-   `tsconfig.json`: Fichier de configuration pour le compilateur TypeScript.
-   `src/`: Contient tout le code source de l'application Angular.
    -   `app.component.ts`: Le composant racine de l'application.
    -   `app.routes.ts`: Définit les routes de l'application.
    -   `components/`: Contient tous les composants Angular (pages et éléments partagés).
    -   `services/`: Contient les services Angular pour la logique métier (authentification, gestion des données).
    -   `models.ts`: Définit les interfaces TypeScript pour les structures de données (Student, Course, etc.).
    -   `students.json`: Un fichier de données initial pour peupler l'application.
    -   `styles.css`: Le fichier source pour les styles Tailwind CSS.
-   `dist/`: Le dossier de sortie contenant les fichiers compilés pour la production.

## 6. Technologies Clés

-   **Framework :** Angular 20+ (avec Standalone Components, Signals et Zoneless Change Detection).
-   **Langage :** TypeScript.
-   **Styling :** Tailwind CSS.
-   **Visualisation de données :** D3.js.

En suivant ces instructions, vous devriez être en mesure de reproduire, d'exécuter et de modifier l'application "ISP Bukavu Student Manager" sur votre environnement local.
