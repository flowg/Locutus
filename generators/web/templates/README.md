**Use-cases to check**

At the root of the project :
1. `npm start` => _should launch the JIT app with live-reload_
2. Make a change to JIT app => _should reflect it automatically in the browser_
3. `npm run lint` => _should check validity of files in the app_
4. `npm run copy-to-aot` => _should add files to /app/aot_
5. `npm run build:aot && npm run lite:aot` => _should AOT-compile the app, Tree Shake it and launch it in the browser_