# Locutus

## Locutus Workflow

1. **Launch the app and start coding right away ;)**
    * You can simply launch the Express server app ( this time in 
    _development_ mode, by default on port 4200 ) with a JIT compiled Angular app, 
    via :
    
            npm start
            
        Along with that, it will also start `tsc` 
        ( to compile your TypeScript files to JavaScript ), `tslint` 
        ( to make sure your TypeScript files are written properly and 
        ensure some code quality ;) and `node-sass` 
        ( to compile your SCSS files to CSS ), **all in watch mode**, 
        so that any modification to your codebase can be automatically detected
        and trigger any necessary action.
        
        _**All of that, already configured for you, just out of the box !**_
        
        > Be aware though that **any update to your Express server files will
        need a reboot of the app** to be taken into account : simply _Ctrl+C_ within 
        the Terminal tab in which you executed `npm start` and just do it again ;)
        
    * The Express server app runs with the great [debug](https://www.npmjs.com/package/debug) NPM module :
    the default setting is `*,-express:*`. You can easily change that, either to show
    everything or to focus the debugging output to what you want by using this command :
    
            npm start -- --debug=<what-you-want>

2. **When ready, build the AOT Angular app**

        npm run build

    After a last run of `tsc`, `tslint` & `node-sass` ( just to be sure ;), some necessary files will then 
    be copied to the inner _/aot_ folder of the _/Angular_ directory, we'll use `ngc` to AOT-compile the Angular app
    and _Tree-Shake_ it with `rollup` to make it lose some superfluous weight ;)
    
3. **Finally, launch the Express server app in _production_ mode**

        npm run start:aot

    The Express server app will be launched in _production_ mode, by default on port 4242,
    and serve the AOT Angular app.
    
### Other scripts

At any point in you workflow, if needed, you can :
* Compile your TypeScript files to JavaScript ( **once** ) with

        npm run tsc
        
* Compile your TypeScript files to JavaScript ( **on watch mode** ) with

        npm run tsc:w
        
* Compile your SCSS files to CSS ( **once** ) with

        npm run sass
        
* Compile your SCSS files to CSS ( **on watch mode** ) with

        npm run sass:w
        
* Ensure the quality of your TypeScript codebase ( **once** ) with

        npm run lint
        
* Ensure the quality of your TypeScript codebase ( **on watch mode** ) with

        npm run lint:w
