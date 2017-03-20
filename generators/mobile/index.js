'use strict';

let Generator = require('yeoman-generator');

class LocutusMobile extends Generator {
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
        this.log('Mobile app assimilation process has begun');
    }

    /**
     * Where you prompt users for options (where you'd call this.prompt())
     */
    prompting() {
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

module.exports = LocutusMobile;
