'use strict';

// Dependencies

// Already included in Node

var url = require('url');
var https = require('https');
var util = require('util');
var path = require('path');
var fs = require('fs');

// Must be installed via NPM if missing

var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var pad = require('pad-component');


var LocutusGenerator = yeoman.generators.Base.extend({
    // Overriding the constructor for base generators
    
    constructor: function() {
        // Calling the super constructor to initialize Locutus properly
        
        yeoman.generators.Base.apply(this, arguments);
    },
    
    // Initialization method (checking current project state, getting configs, etc)
    
    initializing: function() {
        this.pkg = require('../package.json');
        
        // Have Locutus greet the user
        
        var msg1 = 'I am Locutus of Borg';
        var msg2 = 'Resistance is futile';
        var greeting = 
            '\n        .' + pad('', 26, '-') + '.' +
            '\n        |' + pad(msg1.trim(), 26) + '|' +
            '\n        |' + pad(msg2.trim(), 26) + '|' +
            '\n        \'' + pad('', 26, '-') + '\'\n';
        this.log(greeting);
    },
    
    // Prompting users for options
    
    prompting: function() {
        var done = this.async();

        var prompts = [
            {
                type: 'input',
                name: 'author',
                message: "Enter the name of this project's author",
                default: 'Locutus'
            },
            {
                type: 'input',
                name: 'appname',
                message: 'Choose a name for this assimilation project',
                default: this.appname
            },
            {
                type: 'input',
                name: 'desc',
                message: 'Enter a description for this assimilation project',
                default: "You will be assimilated into this Workflow's Collective. Your knowledge and technology will be added to our own. Your distinctiveness will enhance us. Resistance is futile."
            },
            {
                type: 'confirm',
                name: 'db',
                message: 'Do you want Locutus to assimilate MongoDB for your CakePHP application ?',
                default: false
            }
        ];

        this.prompt(prompts, function(props) {
            this.author = props.author;
            this.appname = props.appname;
            this.desc = props.desc;
            this.mongo = props.db;

            done();
        }.bind(this));
    },
    
    // Saving configurations and configure the project (creating .editorconfig files and other metadata files)
    
    configuring: function() {},
    
    // Other methods
    
    default: function() {
        // Definitions
        
        var getMongo4Cake = function() {
            var done = this.async();
            
            this.log("Assimilating CakePHP's MongoDB DataSource");
            
            var file_url = 'https://github.com/ichikaway/cakephp-mongodb/archive/cake2.2.zip';
            var DOWNLOAD_DIR = this.destinationRoot() + '/app/Plugin/Mongodb';

            this.extract(file_url, DOWNLOAD_DIR, function(err) {
                var error = true;
                
                if (!err) {
                    var path = this.destinationRoot() + '/app/Config/plugins.php';
                    var str = "\tCakePlugin::load('Mongodb');\n";
                    fs.appendFileSync(path, str);
                    
                    error = false;
                }
                
                if (error) {
                    this.log("An error has occured while assimilating MongoDB DataSource\nAssimilation failure\n");
                    this.end();
                } else {
                    this.log("Assimilation complete\nCakePHP's MongoDB DataSource has now integrated this Workflow's Collective\n");
                    done();
                }
            }.bind(this));
        }.bind(this);
        
        var getLatestCakePHP = function() {
            var done = this.async();

            this.log("Assimilating CakePHP & DebugKit latest versions");
            
            var file_url = 'https://github.com/cakephp/cakephp/archive/master.zip';
            var DOWNLOAD_DIR = this.destinationRoot();
            
            this.extract(file_url, DOWNLOAD_DIR, function(err) { 
                if (!err) {
                    var file_url = 'https://github.com/cakephp/debug_kit/archive/master.zip';
                    var DOWNLOAD_DIR = this.destinationRoot() + '/app/Plugin/DebugKit';
                    
                    this.extract(file_url, DOWNLOAD_DIR, function(err) {
                        var error = true;
                        
                        if (!err) {
                            var path = this.destinationRoot() + '/app/Config/bootstrap.php';
                            var str = "\n// Load all your Plugins in that file\n\ninclude('plugins.php');";
                            fs.appendFileSync(path, str);
                            
                            var path = this.destinationRoot() + '/app/Config/plugins.php';
                            var str = "<?php\n\n\tCakePlugin::load('DebugKit');\n";
                            fs.appendFileSync(path, str);

                            var path = this.destinationRoot() + '/app/Controller/AppController.php';
                            var str = fs.readFileSync(path, {'encoding': 'utf8'});
                            var lastId = str.lastIndexOf('}');
                            str = str.substring(0, lastId) + "\tpublic $components = array('DebugKit.Toolbar');\n}";
                            fs.writeFileSync(path, str);

                            error = false;
                        } else {
                            throw err;
                        }
                        
                        if (error) {
                            this.log("An error has occured while assimilating DebugKit\nAssimilation failure\n");
                            this.end();
                        } else {
                            this.log("Assimilation complete\nCakePHP & DebugKit have now integrated this Workflow's Collective\n");

                            if (this.mongo) {
                                getMongo4Cake();
                            } else {
                                done();
                            }
                        }
                    }.bind(this));
                } else {
                    this.log("An error has occured while assimilating CakePHP\nAssimilation failure\n");
                    this.end();
                }
            }.bind(this));
        }.bind(this);
        
        // Executions
        
        getLatestCakePHP();
    },
    
    // Writing the generator specific files (routes, controllers, etc)
    
    writing: function() {
        // Creating needed directories for the scaffolded project
        
        this.mkdir('../tags');
        this.mkdir('../prod');
        this.mkdir('app/webroot/sass');
        this.mkdir('app/webroot/fonts');
        
        // Adding configuration files for the scaffolded project
        
        this.copy('_Gruntfile.js', 'Gruntfile.js');
        this.directory('GruntCustomTasks', 'GruntCustomTasks');
        this.copy('_package.json', 'package.json');
        this.copy('_bower.json', 'bower.json');
        this.copy('jshintrc', '.jshintrc');
        
        // Adding sample sass files
        
        this.copy('SASS/bootstrap.scss', 'app/webroot/sass/bootstrap.scss');
        this.copy('SASS/main.scss', 'app/webroot/sass/main.scss');
    },
    
    // Where conflicts are handled (used internally)
    
    conflicts: function() {},
    
    // Where installations are run (npm, bower)
    
    install: function() {
        if (!this.options['skip-install']) {
            var done = this.async();
            this.installDependencies({
                'callback': function() {
                    done();
                }
            });
        }
    },
    
    // Called last, cleanup, say good bye, etc
    
    end: function() {
        this.log(chalk.yellow('\nEverything has been assimilated within standard parameters\n'));
        
        if (this.mongo) {
            this.log(chalk.red('Be aware you have to install the mongo PHP extension through PEAR/PECL on your server,'));
            this.log(chalk.red('In order to be able to query MongoDB through PHP\n'));
            this.log(chalk.red('See : ') + chalk.magenta.underline('http://php.net/manual/fr/mongo.installation.php#mongo.installation.nix') + chalk.red(' for more information\n'));
        }
        
        this.log('\nMake the Collective more efficient');
        this.log(chalk.blue.bold('Create') + ' and ' + chalk.blue.bold('Assimilate\n\n'));
    }
});

module.exports = LocutusGenerator;
