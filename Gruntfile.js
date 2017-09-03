module.exports = function (grunt) {


    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

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
                    'app/style.css': 'app/styles/style.scss',

                    'app/ie8.css': 'app/styles/ie8.scss',
                    
                    'app/normalize.css': 'app/styles/normalize.scss'

                    /*where file goes-----/where file from*/
                }
            },

            dist: {
                options: {
                    style: "compressed",
                    sourcemap: 'auto'
                },
                files: {
                    'app/style-min.css': 'app/styles/style.scss',

                    'app/ie8-min.css': 'app/styles/ie8.scss',
                    
                    'app/normalize-min.css': 'app/styles/normalize.scss'

                    /*where file goes-----/where file from*/
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

    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);


}

/* add bag (!) to wordpress css theme top-title so that it shows on minified file*/