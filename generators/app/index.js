'use strict';

let Generator = require('yeoman-generator');

class Locutus extends Generator {
    /**
     * Constructor
     * @note: arguments and options should be defined in the constructor
     */
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Initializing class attributes
        this.configuration = {};
    }

    /**
     * Methods considered as tasks, which will automatically be run in sequence
     * when calling the generator.
     */

    // Your initialization methods (checking current project state, getting configs, etc)
    initializing() {}

    // Where you prompt users for options (where you'd call this.prompt())
    prompting() {
        return this.prompt(
            [
                {
                    type    : 'input',
                    name    : 'name',
                    message : 'Your project name',
                    default : this.appname // Default to current folder name
                },
                {
                    type    : 'list',
                    name    : 'appType',
                    message : 'What kind of application would you like to create?',
                    choices: [
                        {
                            name: 'Web only',
                            value: 'web'
                        },
                        {
                            name: 'Mobile only',
                            value: 'mobile'
                        }
                    ]
                }
            ]
        ).then((answers) => {
            this.configuration = {
                appName: answers.appName,
                appType: answers.appType
            }
        });
    }

    // Saving configurations and configure the project (creating .editorconfig files and other metadata files)
    configuring() {
        this.config.set(this.configuration);
    }

    // If the method name doesn't match a priority, it will be pushed to this group
    default() {
        // Compose with the requested sub-generator
        let path = `../${this.configuration.appType}`;
        this.composeWith(require.resolve(path));
    }

    // Where you write the generator specific files (see http://yeoman.io/authoring/file-system.html)
    writing() {}

    // Where conflicts about overwriting pre-existing files are handled (used internally)
    conflicts() {}

    // Where installation are run (npm, bower)
    install() {
        // Initializing the package.json file, common to all app types
        this.spawnCommandSync('npm', ['init']);
    }

    // Called last, cleanup, say good bye, etc
    end() {
        this.log('Assimilation complete');
    }

    /**
     * Methods considered as private from the generator run loop's point of view.
     * They have to be called explicitly.
     * @private
     */
}

module.exports = Locutus;
