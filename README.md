# Homedraw2d

## Structure du projet

La structure de ce projet suit celle d'une application Angular standard qui est détaillée ci-dessous.

### Modules [*.module.ts]

Les [modules](https://angular.io/guide/architecture-modules) permettent de définir les différents composants et service d'une partie de l'application (cf: shapes.module.ts) et de les utiliser dans d'autres parties.

Exemple: Le ShapesModule déclare les différents composant shapes, et ont l'importe dans le AppModule pour que le composant Canvas puisse l'utiliser

Pour créer un module, il faut executer la commande `npx ng g m nomdumodule` dans le repertoire voulu.


### Composants [app/components]
Les composants s'occupent de tout ce qui concerne l'affichage d'un element et les interactions avec celui-ci.

Pour se faire, tout les [evenements HTML classiques](https://developer.mozilla.org/fr/docs/Web/Events) et [specifiques a Angular](https://angular.io/guide/event-binding) sont utilisables.

Chaques composants possédents des attributs et des [services](https://angular.io/guide/architecture-services), chacun définis et initialisé dans le constructeur de celui-ci.

Pour créer un composant, il faut le créer avec la commande  `npx ng g c nomducomposant` dans le repertoire voulu.

Ensuite, il faut l'importer dans un module pour pouvoir l'utiliser et lui fournir les services et autres modules dont il a besoin.


### Services [app/services]
Les [services](https://angular.io/guide/architecture-services) sont des sortes de petites bases de données qui sont accessible à tout moment dans l'application.

On peut executer des actions sur ces services, ou écouter les changements à l'aide d'[EventEmitter](https://angular.io/api/core/EventEmitter).

Afin d'utiliser un service, il faut l'importer dans le module dans lequel le composant est défini, puis dans le constructeur du composant l'ajouter en argument grace a l'[injection de dépendances](https://angular.io/guide/dependency-injection).

Pour créer un service il faut le créer avec la commande `npx ng g s nomduservice` dans le dossier app/service

### Commandes [app/commands]
Les commandes ne sont pas directement existante dans angular mais sont la pierre angulaire de ce projet.

Celles-ci controlent tout ce qui se passe dans l'application suite a une action de l'utilisateur et qui doit pouvoir être annulée.

Exemple: Création de Shape, déplacement d'un Node.

### Core [app/core]
Le dossier core contient des fichiers importants qui ne dépendent pas d'angular directement (ou pas du tout dans le meilleur des cas).

Celui-ci contient différentes classes, ainsi que leurs méthodes associées.
