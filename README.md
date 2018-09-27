# Node 1

Toute documentation autorisée.

Le rendu de votre travail s'effectuera sous la forme d'un repository git, par exemple sur Github.
Envoyer un lien vers le repository à : [eric@rixo.fr](mailto:eric@rixo.fr).

La date butoir pour le rendu est jeudi 27 sept. à 18h.

## Consignes générales

Une (petite) partie de la note est basée sur la propreté du code rendu, selon les critères
suivants :

- La consistence dans les choix de style de code (coding style).
- Une indentation correcte.
- Pas de "cochonnerie", comme du code mort (inutilisé) ou de l'ancien code en commentaire (commented out, les commentaires normaux sont bien entendu autorisés). Supprimez ce qui ne sert à rien, utilisez git à bon escient si vous souhaitez faire des tentatives.

Dans chacun des exercices, on vous donne le nom du fichier à créer pour l'exercice. Ce nom est imposé, cependant vous n'êtes obligés de mettre tout le code pour l'exercice dans le fichier en question -- vous avez la liberté de créer des fichiers supplémentaires si vous le souhaitez.

À savoir : les exercices rapportent de moins en moins de points par rapport à leur difficulté. Conseil : faites les dans l'ordre.

Conseil git : faites un commit dès que vous avez quelque chose qui semble valoir des points
qui marche. L'historique des commits n'est pas pris en compte dans la notation. N'essayez pas
de faire un merge avec des conflits 20 min avant la fin (il y en a qui ont essayé, il a eu des
problèmes...). Autrement dit : si vous n'êtes pas hyper à l'aise avec git, ne tentez rien avec des
branches, restez sur master, commitez souvent. Si vous êtes plusieurs, mergez tôt, mergez
souvent.

## 1. Mise en route

À partir d'un repository git vierge, initialiser un projet Node.js en installant les dépendances
suivantes pour le développement :

- [nodemon](https://www.npmjs.com/package/nodemon)
- [browser-sync](https://www.npmjs.com/package/browser-sync)

Pensez à remplir correctement le fichier .gitignore.

Commit.

## 2. Is ready2.1. Programme

Dans un fichier `is-ready.js`, utilisez la fonction fs.stat ou la fonction fs.exists pour déterminer si le répertoire `node_modules` est présent à la racine de votre projet.

Si le répertoire n'est pas présent, afficher "not ready" en rouge et sortir du programme avec un
exit code de 255.

Si le répertoire est présent, afficher "maybe" en jaune et sortir du programme avec un exit
code de 0.

### Notes :

- Le programme **doit** fonctionner lorsqu'il est lancé à partir d'un répertoire arbitraire, pas seulement à partir du répertoire du projet.
- Vous devez utiliser soit la fonction `fs.stat`, soit `fs.exists` (autrement dit, `fs.existsSync` interdite par exemple).
- `fs.exists` est deprecated depuis longtemps mais encore présente... et son
fonctionnement est plus simple à comprendre.
    - Si vous souhaitez utilisez `fs.stat`, sachez que lorsque le fichier/dossier cible n'existe par alors on obtient une erreur. Il faut alors interpréter cette erreur pour s'assurer qu'elle signifie que la cible n'existe pas, en testant son code, ainsi : `err.code === 'ENOENT'`. Sinon, c'est qu'il s'agit d'une autre erreur qu'il convient de traiter comme une vraie erreur.

Pour les couleurs dans le terminal, vous pouvez utilisez le module chalk ou autre
méthode de votre choix.

## 2.2. Lib

Dans le fichier is-ready.js, exportez une fonction qui retourne une Promise. Cette Promise doit resolve à true si le dossier node_modules existe (selon les critères de la partie 2.1), ou false si le dossier n'existe pas. (La Promise peut, par ailleurs, être rejected si une erreur survient.)

Vous pouvez refactorer le code produit à la partie précédente, ou bien le copier-coller si vous préférez (la duplication de code n'est pas pénalisée ici).

Créez également un fichier is-ready-test.js, qui utilise la fonction que vous venez d'ajouter, et qui log le résultat de la Promise résolue.

## 2.3. Are ready

Créez un nouveau fichier are-ready.js et réimplémentez le même programme qu'à l'étape 2.1, à l'exception que vous devez tester en parallèle l'existence des 2 cibles suivantes :

- le dossier node_modules
- ET un fichier README.md

Dans cette partie, vous êtes libre d'utiliser ou non des Promise. Vous êtes libre de réutiliser (importer) du code des parties précédentes ou non.Vous devez effectuer le test pour les 2 cibles en parallèle.

### 3. Count Server

Dans un fichier http-count.js, utilisez le package express pour implémentez un programme
avec les spécifications suivantes :

- Au démarrage, lancer un serveur HTTP qui écoute sur un port passé en argument de la façon suivante : node `http-count.js -p PORT` (par exemple : `node http-count.js - p 8000`).
- Si le programme est lancé avec tout autre argument que celui indiqué (i.e. "-p PORT"), alors afficher un message d'erreur et sortir du programme avec un code non zéro.
- Lorsque le serveur est lancé, afficher le message suivant : "Listening on port PORT..." (bien entendu, remplacer PORT par le port utilisé).
    - Conseil : utilisez la callback de la méthode `App#listen` d'express (cf. <https://expressjs.com/en/4x/api.html#app.listen>). Lorsque cette callback est appelée, cela signifie que le serveur est prêt. La callback est appelée sans aucun argument -- en cas d'erreur, la callback ne sera pas appelée.
- Compteur "current" : le serveur conserve (en mémoire vive) un compteur qui est incrémenté pour chaque requête que le serveur reçoit. Autrement dit, un compteur du nombre de requête depuis que le serveur est lancé.
- Compteur "all time" : le serveur conserve, de manière persistante (solution libre pour la persistence), un compteur du nombre de requête depuis toujours (ou plus précisément depuis le dernier reset).
    - Important : les compteurs "all time" ne doivent compter que les requêtes pour un port donné. Par exemple, si vous lancez un serveur sur le port 8000 et un autre sur le port 8001, alors les comptes sont séparés. Si ensuite vous couper ces 2 serveurs, puis en relancez un sur le port 8000, alors ce dernier reprend le compteur propre au port 8000.
- Lorsque l'on accède à la racine du site (i.e. path '/'), renvoyer une page HTML avec :
    - Du style -- CSS, à partir d'un fichier CSS (style inline ne compte pas)
    - L'affichage de la valeur actuelle des 2 compteurs de requêtes (current et all- time), avec des labels permettant de comprendre ce qui est quoi. Cette information n'a pas besoin d'être mise à jour tant que la page n'est pas rechargée.
    - Un formulaire tel que décrit ci-dessous
- Le formulaire sur la page d'accueil doit contenir :
    - Une checkbox avec un label "Current"
    - Une checkbox avec un label "All time"
    - Un bouton avec un label "RESET"
- Lorsque le formulaire est envoyé (bouton "RESET") :
    - Si la checkbox "Current" était cochée, alors remettre le compteur "current" à 0.
    - Si la checkbox "All time" était cochée, alors remettre le compteur "all time" du port concerné à 0.
- Ajouter une URL (de votre choix) qui permet d'obtenir les données des 2 compteurs au format JSON.
    - Mettre un lien vers cette URL sur la page d'accueil du site.
- Prêtez attention à :
    - La gestion des erreurs.
    - Ne pas coincer l'utilisateur dans un coin du site (c'est à dire une page qui n'offrirait pas, au moins, de retourner sur la page d'accueil)...

## 4. Count Juggler

Dans un fichier `count-juggler.js`, implémenter un programme avec les spécifications suivantes :

- Au démarrage du programme, il doit lancer 2 instances du programme précédent (http-count.js) sur des ports différents.
    - Vous pouvez hardcoder les ports utilisés dans le programme -- mais choisissez des ports > 1024 (sinon il faudra être root pour lancer votre program).
    - Vous êtes autorisés à faire une copie du programme http-count.js dans un autre fichier, et à utiliser cette copie dans le cadre du présent exercice. Cela peut s'avérer utile si vous sentez que l'autre programme (le serveur) aurait besoin d'un refactor pour permettre de réaliser les fonctionnalités demandées ici et que vous ne souhaitez pas courir le risque de tout casser votre exercice précédent...
    - Vous n'avez pas besoin d'essayer de cacher les outputs de l'autre programme (le serveur).
- Lorsque les 2 instances de count servers sont prêtes (i.e. attachées à leur port respectif), alors afficher un message "All servers ready" puis passer à l'étape suivante.
- Lorsque les serveurs sont prêts, alors afficher toutes les secondes une ligne au format DATE N1 + N2 = (N1 + N2), où :
    - DATE est la date du moment (vous pouvez utilisez String(new Date()) par
exemple)
    - N1 et N2 sont les valeurs des compteurs "current" respectifs des 2 serveurs qui
ont été lancés au début du programme
(N1 + N2) doit être remplacé par le résultat réel de l'addition des 2 compteurs
- Pour obtenir les valeurs à jour des compteurs, vous devez effectuer une requête HTTP
vers chacun des 2 serveurs.

### Notes

Pour exécuter une fonction toutes les secondes, vous pouvez utilisez la fonction JS
`setInterval`. Exemple:

~~~javascript
const delay = 1000 // ms
const handler = function() { console.log('tick') }
// will log 'tick' every second
setInterval(handler, delay)
~~~

- Il vous est conseillé d'utiliser une lib existante pour effectuer les requêtes HTTP à partir
de node. Comme par exemple :
    - [axios](https://github.com/axios/axios (https://github.com/axios/axios) (promise)
    - [request](https://github.com/request/request (https://github.com/request/request) (callback)
    - [node-fetch](https://www.npmjs.com/package/node-fetch (https://www.npmjs.com/package/node-fetch) qui permet d'utiliser dans node la même API fetch que dans le browser

Si vous utilisez fetch, votre requête devrait ressembler à ça:

~~~javascript
fetch('http://localhost:8000/count.json')
.then(res => res.json())
.then(json => console.log(json));
~~~
