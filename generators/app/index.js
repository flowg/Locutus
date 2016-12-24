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

        /**
         * Next, add your custom code
         */

        // This method adds support for a `--coffee` flag
        this.option('coffee');

        // This makes `appname` a required argument.
        //this.argument('appname', { type: String, required: true });

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
            this.log('app name', answers.name);
            this.log('app type', answers.appType);
        });
    }

    // Saving configurations and configure the project (creating .editorconfig files and other metadata files)
    configuring() {}

    // If the method name doesn't match a priority, it will be pushed to this group
    default() {
        // Plug in another generator
        this.composeWith(require.resolve('../web'));
    }

    // Where you write the generator specific files (see http://yeoman.io/authoring/file-system.html)
    writing() {
        // Copying a file with a <%= title %> placeholder in it
        // The template root is by default ./templates/
        // The destination root is where the end user will bootstrap its project
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('public/index.html'),
            { title: 'Templating with Yeoman' }
        );
    }

    // Where conflicts about overwriting pre-existing files are handled (used internally)
    conflicts() {}

    // Where installation are run (npm, bower)
    install() {
        // Use a normal Bash command (normalizing command so it can run on any platform)
        // You can use the asynchronous version too, named spawnCommand()
        this.spawnCommandSync('npm', ['init']);

        // Use this to install an NPM module as a DevDependency
        this.npmInstall(['lodash'], { 'save-dev': true });
    }

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

module.exports = Locutus;
