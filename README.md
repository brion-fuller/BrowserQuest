BrowserQuest
============

BrowserQuest is a HTML5/JavaScript multiplayer game experiment.


Monorepo Structure
------------------

This repository uses npm workspaces with three isolated packages:

* `client/` - browser client and client build assets
* `server/` - game server code and runtime configuration
* `shared/` - shared game types

Install all workspace dependencies from the repository root:

* `npm install`

Common workspace commands from the repository root:

* `npm run build:client`
* `npm run start:server`


Documentation
-------------

Documentation is located in client and server directories.


License
-------

Code is licensed under MPL 2.0. Content is licensed under CC-BY-SA 3.0.
See the LICENSE file for details.


Credits
-------
Created by [Little Workshop](http://www.littleworkshop.fr):

* Franck Lecollinet - [@whatthefranck](http://twitter.com/whatthefranck)
* Guillaume Lecollinet - [@glecollinet](http://twitter.com/glecollinet)