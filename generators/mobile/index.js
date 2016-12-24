'use strict';

let Generator = require('yeoman-generator');

class LocutusMobile extends Generator {
    /**
     * Constructor
     *
     * @note: arguments and options should be defined in the constructor
     */
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('coffee'); // This method adds support for a `--coffee` flag

        // This makes `appname` a required argument.
        this.argument('appname', { type: String, required: true });

        // And you can then access it later
        this.log(this.options.appname);
    }

    /**
     * Methods considered as tasks, which will automatically be run in sequence
     * when calling the generator.
     */
    method1() {
        //console.log('method 1 just ran'); // Wrong : always use the abstracted this.log()
    }

    // Your initialization methods (checking current project state, getting configs, etc)
    initializing() {}

    // Where you prompt users for options (where you'd call this.prompt())
    prompting() {
        return this.prompt([{
            type    : 'input',
            name    : 'name',
            message : 'Your project name',
            default : this.appname // Default to current folder name
        }, {
            type    : 'confirm',
            name    : 'cool',
            message : 'Would you like to enable the Cool feature?'
        }]).then((answers) => {
            this.log('app name', answers.name);
            this.log('cool feature', answers.cool);
        });
    }

    // Saving configurations and configure the project (creating .editorconfig files and other metadata files)
    configuring() {}

    // If the method name doesn't match a priority, it will be pushed to this group
    default() {}

    // Where you write the generator specific files (routes, controllers, etc)
    writing() {}

    // Where conflicts are handled (used internally)
    conflicts() {}

    // Where installation are run (npm, bower)
    install() {}

    // Called last, cleanup, say good bye, etc
    end() {}

    /**
     * Methods considered as private from the generator run loop's point of view.
     * They have to be called explicitly.
     * @private
     */
    _private_method() {
        this.log('private hey');
    }
}

module.exports = LocutusMobile;
