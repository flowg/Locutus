'use strict';

let Generator = require('yeoman-generator');

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
     * when calling the generator.
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
        // TODO: use the www and app.js from DTEC-Website ( no change from the version in express-generator ) and adapt them
        // TODO: try to go to Typescript for Back-End too

        // TODO: implement and test the different steps for the workflow, described in the README file ( only left the last one )

        // TODO: replace the placeholders in the package.json with user-provided infos
        // TODO: enable the user to choose the view engine in Express
    }

    /**
     * Saving configurations and configure the project
     * (creating .editorconfig files and other metadata files)
     */
    configuring() {}

    /**
     * If the method name doesn't match a priority, it will be pushed to this group
     */
    default() {}

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
    }

    /**
     * Where conflicts about overwriting pre-existing files are handled
     * (used internally)
     */
    conflicts() {}

    /**
     * Where installations are run (npm, bower)
     */
    install() {}

    /**
     * Called last, cleanup, say good bye, etc
     */
    end() {}

    /**
     * Methods considered as private from the generator run loop's point of view.
     * They have to be called explicitly.
     * @private
     */
}

module.exports = LocutusWeb;
