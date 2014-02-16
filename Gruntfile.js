module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');
    pkg.name = pkg.name.toLowerCase(); // Fix "camelCase"

    grunt.initConfig({
        pkg: pkg,
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - <%= pkg.repository.url %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['<%= pkg.name %>.js'],
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> - <%= pkg.repository.url %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['<%= pkg.name %>.css'],
                dest: 'build/<%= pkg.name %>.min.css'
            }            
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['uglify', 'cssmin']);

};
