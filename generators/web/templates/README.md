**Workflow to check**

At the root of the project :
1. `npm start` => _Should compile TS to JS and SASS to CSS + launch the Express server app, with the JIT Angular app + 
file watch on both. Then open up a new Terminal tab, since this one will be busy displaying the Express server messages.
 Take your browser to localhost:4200 by default._
2. Make a change to the JIT Angular app => _Should reflect it in the browser **after refreshing the page**, since file 
watch for tsc and node-sass will recompile everything changed._
3. Make a change to the Express server app => _Ctrl+C in the Terminal tab displaying the Express server app, 
then `npm start` again._
3. `npm run lint` => _Should check validity of TS files in the app._
4. `npm run build` => _Should copy necessary files in /Angular/aot folder to prepare for compilation + AOT compile 
the Angular app + Tree Shake the AOT compiled app_
5. `npm run start:aot` => _Should launch the Express server app, with the AOT Angular app. Take your browser to localhost:4242 by default._