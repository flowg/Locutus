'use strict';

/**
 * Third-party requires
 */
const Generator = require('yeoman-generator');
const chalk     = require('chalk');

class Locutus extends Generator {
    /**
     * Constructor
     * @note: arguments and options which can be passed while calling the generator on the CLI
     * should be defined in the constructor
     */
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Initializing class attributes
        this.configuration = {};
    }

    /**
     * Methods considered as tasks, which will automatically be run in sequence
     * when calling the generator
     */

    /**
     * Your initialization methods (checking current project state, getting configs, etc)
     */
    initializing() {
    }

    /**
     * Where you prompt users for options (where you'd call this.prompt())
     */
    prompting() {
        return this.prompt(
            [
                {
                    type:    'input',
                    name:    'appName',
                    message: 'Your project name',
                    default: this.appname // Default to current folder name
                },
                {
                    type:    'list',
                    name:    'appType',
                    message: 'What kind of application would you like to create?',
                    choices: [
                        {
                            name:  'Web only',
                            value: 'web'
                        },
                        {
                            name:  'Mobile only',
                            value: 'mobile'
                        }
                    ]
                },
                {
                    type:    'confirm',
                    name:    'useDB',
                    message: 'Will your application need a database?',
                    default: true
                },
                {
                    type:    'list',
                    name:    'dbType',
                    message: 'Among the ones currently supported by Locutus, which DB technology do you want to use?',
                    choices: [
                        {
                            name:  'MongoDB',
                            value: 'mongo'
                        }
                    ],
                    when:    answers => answers.useDB
                },
                {
                    type:    'input',
                    name:    'dbName',
                    message: 'Choose a name for the database',
                    default: 'test',
                    when:    answers => answers.useDB
                },
                {
                    type:    'confirm',
                    name:    'useForms',
                    message: 'Will your application need to implement forms?',
                    default: true
                },
                {
                    type:    'confirm',
                    name:    'userSystem',
                    message: 'Will your application need to handle user authentication/authorization?',
                    default: true
                },
                {
                    type:    'list',
                    name:    'userSystemType',
                    message: 'Among the ones currently supported by Locutus, which user system type do you want to use?',
                    choices: [
                        {
                            name:  'JSON Web Tokens',
                            value: 'JWT'
                        }
                    ],
                    when:    answers => answers.userSystem
                },
            ]
        ).then((answers) => {
            this.configuration = {
                appName:        answers.appName,
                appType:        answers.appType,
                useDB:          answers.useDB,
                dbType:         answers.dbType,
                dbName:         answers.dbName,
                useForms:       answers.useForms,
                userSystem:     answers.userSystem,
                userSystemType: answers.userSystemType
            };
        });
    }

    /**
     * Saving configurations and configure the project
     * (creating .editorconfig files and other metadata files)
     */
    configuring() {
        this.config.set(this.configuration);
    }

    /**
     * If the method name doesn't match a priority, it will be pushed to this group
     */
    default() {
        // Compose with the requested sub-generator
        let path = `../${this.configuration.appType}`;
        this.composeWith(require.resolve(path));
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
     * Where installation are run (npm, bower)
     */
    install() {
        // Initializing the package.json file, common to all app types
        this.spawnCommandSync('npm', [ 'init' ]);

        // Installing everything in the package.json file, common to all app types
        this.npmInstall();
    }

    /**
     * Called last, cleanup, say good bye, etc
     */
    end() {
        this.log('Assimilation complete');

        if (this.configuration.useDB) {
            switch (this.configuration.dbType) {
                case 'mongo':
                    this.log(chalk.red("\nDon't forget to install MongoDB:"));
                    this.log(chalk.cyan("https://www.mongodb.com/download-center#community"));
                    this.log(chalk.red("\nThen, at the root of your project, create a local folder to host your DB and run a mongod server BEFORE using 'npm start'."));
                    this.log(chalk.red("Simply go to the root of your project in your Terminal ( same level as package.json ) and type:"));
                    this.log(chalk.green("\n\t\tmkdir db && mongod --dbpath db\n"));
                    break;
            }
        }
    }

    /**
     * Methods considered as private from the generator run loop's point of view.
     * They have to be called explicitly
     * @private
     */
}

module.exports = Locutus;
