# Locutus Generator / WORK IN PROGRESS

## Purpose

A Yeoman generator for MEAN web apps with Typescript/Angular and NativeScript for Mobile native apps.

## Prerequisites

1. Install Node.js ( it will also install NPM ) : https://nodejs.org/en/
2. Install the Yeoman NPM module :

        npm install -g yo
        
3. _( Optional )_ Install MongoDB locally if you plan to use the whole MEAN stack
suggested by Locutus : https://www.mongodb.com/download-center#community

## How to check if package.json is up-to-date ?

1. Check the package.json on that GitHub ( https://github.com/angular/quickstart/blob/master/package.json ) for Front-End related NPM modules
2. Check the package.json obtained by generating a project with `express myapp` for Back-End related NPM modules
3. Create a Locutus project and type `npm update --save` in Terminal, at the working directory, then use that package.json to watch for any change in versions