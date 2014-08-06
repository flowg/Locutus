/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = function(grunt) {
  grunt.registerTask('checkVersion', 'Checks if version release has been provided and pass it to Grunt', function() {
    var bool = (typeof(grunt.option('tag')) === 'number' || typeof(grunt.option('tag')) === 'string') && grunt.option('tag') !== 0;
    
    if (!bool) {
        grunt.fatal('Please provide a valid version number (not null) for tagging of this release\nYou should type "grunt build --tag=X.X.X"');
    }
    
    grunt.config.set('pkg.version', grunt.option('tag'));
    grunt.file.write('package.json', JSON.stringify(grunt.config('pkg')));
    
    grunt.config.set('bower.version', grunt.option('tag'));
    grunt.file.write('bower.json', JSON.stringify(grunt.config('bower')));
  });
};
