/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: grunt.file.readJSON('bower.json'),
    variables: {
        tags: '../tags',
        prod: '../prod'  
    },
    sass: {
        dev: {
            files: [
                {
                    expand: true,
                    cwd: 'app/webroot/sass/',
                    src: ['**/*.scss', '!main.scss'],
                    dest: 'app/webroot/css/',
                    ext: '.css'
                }
            ]
        }
    },
    jshint: {
        dev: {
            files: [
                {
                    expand: true,
                    src: ['Gruntfile.js', 'GruntCustomTasks/**/*.js', 'app/webroot/js/**/*.js', '!app/webroot/js/Vendors/**/*.js']                    
                }
            ]
        }   
    },
    clean: {
        prod: {
            files: [
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= variables.prod %>',
                    src: ['**']
                }
            ],
            options: {
                force: true
            }
        }
    },
    copy: {
        tags: {
            files: [
                {
                    expand: true,
                    dot: true,
                    dest: '<%= variables.tags %>/<%= pkg.name %>-<%= grunt.option("tag") %>',
                    src: [
                        '**',
                        '!.svn',
                        '!.svn/**/*',
                        '!.sass-cache',
                        '!.sass-cache/**/*',
                        '!app/webroot/sass',
                        '!app/webroot/sass/**/*',
                        '!node_modules',
                        '!node_modules/**/*',
                        '!bower_components',
                        '!bower_components/**/*',
                        '!nbproject',
                        '!nbproject/**/*',
                        '!GruntCustomTasks',
                        '!GruntCustomTasks/**/*',
                        '!Gruntfile.js',
                        '!bower.json',
                        '!package.json'
                    ]
                }
            ],
            options: {
                nonull: true
            }
        },
        prod: {
            files: [
                {
                    expand: true,
                    dot: true,
                    cwd: '<%= variables.tags %>/<%= pkg.name %>-<%= grunt.option("tag") %>',
                    src: ['**'],
                    dest: '<%= variables.prod %>'
                }
            ],
            options: {
                nonull: true
            }
        }
    },
    uglify: {
        tags: {
            files: [{
                expand: true,
                cwd: '<%= variables.tags %>/<%= pkg.name %>-<%= grunt.option("tag") %>/app/webroot/js/',
                src: '**/*.js',
                dest: '<%= variables.tags %>/<%= pkg.name %>-<%= grunt.option("tag") %>/app/webroot/js/'
            }]
        }
    },
    cssmin: {
        tags: {
            files: [{
                expand: true,
                cwd: '<%= variables.tags %>/<%= pkg.name %>-<%= grunt.option("tag") %>/app/webroot/css/',
                src: '**/*.css',
                dest: '<%= variables.tags %>/<%= pkg.name %>-<%= grunt.option("tag") %>/app/webroot/css/'
            }]
        }
    }
  });
  
  
  
  // Load the official Grunt tasks
  require('load-grunt-tasks')(grunt);
  
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load the custom Grunt tasks
  grunt.loadTasks('GruntCustomTasks');

  // Register the default task
  grunt.registerTask('default', ['sass', 'newer:jshint']);

  // Register the build task
  grunt.registerTask('build', [
      'checkVersion',
      'copy:tags',
      'uglify',
      'cssmin',
      'clean',
      'copy:prod'
  ]);
};
