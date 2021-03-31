# td1

Application des cours d'ember js reçu au long de mon semestre 4 de DUT Informatique.
Le projet final (le plus interessant) se trouve sur la branche Eval. Le contenu de ce ReadMe parlera majoritairement de ce projet.

##Le framework ember

Le framework ember permet de développer du code facilement évolutif lorsque la source de donnée change.
En effet, les modèles de chaque page sont dotés d'un attribut "store" permettant d'executer des requêtes de manière uniformisée, peu importe la source de donnée (API Rest, base de donée), le dialecte SQL (apache database, MongoDB, MySql...) ou même l'encodage (xml, json...)
Il implémente également l'architecture modèle vue controlleur et permet d'écrire un code facile à comprendre et à évoluer.
De plus, il est compatible avec beaucoup de frameworks CSS et permet d'ajouter ses propres composants HTML ou d'en importer, afin de pouvoir très rapidement créer une page complexe.
Il a enfin des "helpers", des fonctions qui sont appelées directement dans la vue, pour faciliter l'implantation du pluriel, le formatage des dates et beaucoup de petites choses qui font la différence entre un bon site web, et LE site web.

## Prerequisites (from initial ReadMe)

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation (from initial ReadMe)

* `git clone <repository-url>` this repository
* `cd td1`
* `npm install`

## Running / Development (from initial ReadMe)

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Un des gros avantages d'ember js et la possibilité de générer du code facilement.
Vous pouvez par exemple générer une route, un controlleur ou un model en tapant
"ember g route <name>" ou "ember g model <name>"

### Building (from initial ReadMe)

* `ember build` (development)
* `ember build --environment production` (production)

## Further Reading / Useful Links (from initial ReadMe)

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
