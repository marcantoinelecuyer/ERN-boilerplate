# ERN Boilerplate

A full ERN boilerplate (Express-React-Node) for Web Apps.

The project has the client and server code separated.

## Server

Server can be started with `yarn server`.

### File structure

```
server
└───src
    └───server.js
    └───routes
        └─ ...
    └───endpoints
        └─ ...
    └───controllers
        └─ ...
    └───models
        └─ ...
    └───endpoints
        └─ ...
    └───helpers
        └──auth-helper.js
        └──capture.js
        └──ErrorHandler.js
        └──errors.js

```
## Client

Client can be started with `yarn client` on [http://localhost:3000](http://localhost:3000)

### File structure

```
client
└───public
    └─ ...
└───src
    └───index.js
    └───assets
        └─ ...
    └───components
        └─ ...
    └───global
        └─ ...
    └───pages
        └─ ...
    └───styles
        └──index.css
        └──components
           └─ ...
        └──pages
           └─ ...

```