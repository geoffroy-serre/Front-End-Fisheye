# Base de code du projet P6 - Parcours Front-end

## Démarrer le projet

Le projet utilisant les modules ES6, il ne peut être executé que sur un environnement web. Sans cela , le navigateur renverra une erreur 'CORS'.

Pour remédier à ce souci, utilisez sois l'extension live-server sur vscode, sois les dépendances dev et le script fournis dans le package.json
Le serveur ouvre lui même le navigateur sur le fichier index.html.

Cependant, si vous avez un back-end springboot par exemple utilisant le port 8080, une configuration supplémentaire peut être nescessaire, le live-server utilisant le port 8080 par defaut.

```bash
npm install
```

```bash
npm run live-server
```
