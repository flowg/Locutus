'use strict';

let Generator          = require('yeoman-generator');
let copyTemplatedFiles = require('../app/common-helpers').copyTemplatedFiles;
let formatForPackageJSONName = require('../app/common-helpers').formatForPackageJSONName;

class LocutusWeb extends Generator {
    /**
     * Constructor
     * @note: arguments and options which can be passed while calling the generator on the CLI
     * should be defined in the constructor
     */
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }

    /**
     * Methods considered as tasks, which will automatically be run in sequence
     * when calling the generator
     */

    /**
     * Your initialization methods (checking current project state, getting configs, etc)
     */
    initializing() {
        this.log('Web app assimilation process has begun');
    }

    /**
     * Where you prompt users for options (where you'd call this.prompt())
     */
    prompting() {
        // TODO: use the www and app.js from DTEC-Website and adapt them ( done when no more code commented )

        // TODO: read https://angular.io/docs/ts/latest/guide/reactive-forms.html

        /*
         * TODO: implement DB interaction with MongoDB & Mongoose and a first example of CRUD
         * TODO: 1) What to implement ? a basic "Posts for a Blog" Model
         * TODO: 2) How to implement ? read about Mongoose (http://mongoosejs.com/docs/index.html)
         * TODO: and API naming best practices (http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api,
         * TODO: https://blog.philipphauer.de/restful-api-design-best-practices/, http://gaboesquivel.com/blog/2015/best-practices-for-designing-web-apis/)
         * TODO: 3) Steps to implement ? Mongoose Schemas & Models, API routes & controllers, Front-End part
         *
         *
         *
         *
         *
         * TODO: ->>>>>   Turn root.express.ts to a class-based file and use it to create /API/express.api.ts
         *
         *
         *
         *
         *
         */

        // TODO: work on morgan to log things

        // TODO: create a way to generate automatically a skeleton CRUD for a given Model

        // TODO: implement root.scss with _main.scss and @fontface with roboto

        // TODO: implement login feature with Passport and JWT

        // TODO: implement the AssimilatedFormsModule and find a way to put the correct type on Metadata classes

        // TODO: enable the user to choose the view engine in Express
    }

    /**
     * Saving configurations and configure the project
     * (creating .editorconfig files and other metadata files)
     */
    configuring() {
    }

    /**
     * If the method name doesn't match a priority, it will be pushed to this group
     */
    default() {
    }

    /**
     * Where you write the generator specific files
     * (see http://yeoman.io/authoring/file-system.html)
     */
    writing() {
        /*
         * Copying everything from ./templates recursively
         * into destinationPath : it respects the folder structure
         */
        this.fs.copy(
            this.templatePath(''),
            this.destinationPath(''),
            {
                globOptions: { dot: true }
            }
        );

        /*
         * Copying a file with a <%=  %> placeholder in it.
         * The template root is by default ./templates/ .
         * The destination root is where the end user will bootstrap its project
         */
        let filesToCopy = [
            {
                name:         "package.json",
                replacements: {
                    appName:  formatForPackageJSONName(this.config.get('appName')),
                    useDB:  this.config.get('useDB'),
                    useJWT: this.config.get('useJWT')
                }
            },
            {
                name:         "README.md",
                replacements: {
                    appName:  this.config.get('appName')
                }
            },
            {
                name:         "root.express.ts",
                replacements: {
                    appName:  this.config.get('appName'),
                    useDB:  this.config.get('useDB'),
                    dbName: this.config.get('dbName')
                }
            },
            {
                name:         "Angular/RootModule/central-nexus.service.ts",
                replacements: {
                    useJWT: this.config.get('useJWT')
                }
            },
            {
                name:         "Angular/RootModule/root.module.ts",
                replacements: {
                    useJWT: this.config.get('useJWT')
                }
            }
        ];

        let copyTemplatedFilesWeb = copyTemplatedFiles.bind(this);
        copyTemplatedFilesWeb(filesToCopy);
    }

    /**
     * Where conflicts about overwriting pre-existing files are handled
     * (used internally)
     */
    conflicts() {
    }

    /**
     * Where installations are run (npm, bower)
     */
    install() {
    }

    /**
     * Called last, cleanup, say good bye, etc
     */
    end() {
    }

    /**
     * Methods considered as private from the generator run loop's point of view.
     * They have to be called explicitly
     * @private
     */
}

module.exports = LocutusWeb;
