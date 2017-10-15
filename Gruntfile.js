module.exports = function (grunt) {


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        /**
         * Concat
         */
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['scripts/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        /**
         * Uglify
         */
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        /**
         * sass Task
         */
        sass: {
            dev: {
                options: {
                    style: "expanded",
                    sourcemap: 'auto'
                },
                files: {
                    'style.css': 'styles/style.scss',
                    'ie8.css': 'styles/ie8.scss',
                    'normalize.css': 'styles/normalize.scss'
                            /*where file goes-----/where file from*/
                }
            },

            dist: {
                options: {
                    style: "compressed",
                    sourcemap: 'auto'
                },
                files: {
                    'style-min.css': 'styles/style.scss',
                    'ie8-min.css': 'styles/ie8.scss',
                    'normalize-min.css': 'styles/normalize.scss'
                            /*where file goes-----/where file from*/
                }
            }
        },

        /**
         * QUnit
         */

        qunit: {
            files: ['test/**/*.html']
        },

        /**
         * JS Hint
         */
        jshint: {
            files: ['Gruntfile.js', 'scripts/**/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults

                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        /**
         * Watch task
         */
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
          }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('default', ['watch', 'jshint', 'qunit', 'concat', 'uglify','sass']);

}

/* add bag (!) to wordpress css theme top-title so that it shows on minified file*/
