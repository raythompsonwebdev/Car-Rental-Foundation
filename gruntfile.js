module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        responsive_images: {
            dev: {
                options: {
                    engine: "im",
                    sizes: [
                        {
                            name: "quantamsmall",
                            width: 80,
                        },
                        {
                            name: "microsmall",
                            width: 120,
                        },
                        {
                            name: "extrasmall",
                            width: 240,
                        },
                        {
                            name: "small",
                            width: 500,
                        },
                        {
                            name: "medium",
                            width: 980,
                        },
                        {
                            name: "large",
                            width: 1200,
                        },
                    ],
                },

                /*
            You don't need to change this part if you don't change
            the directory structure.
            */
                files: [
                    {
                        expand: true,
                        src: ["*.{gif,jpg,png}"],
                        cwd: "images/",
                        dest: "public/images/",
                    },
                ],
            },
        },

        /* Clear out the images directory if it exists */
        clean: {
            dev: {
                src: ["images"],
            },
        },

        /* Generate the images directory if it is missing */
        mkdir: {
            // dev: {
            //     options: {
            //         create: ["images"],
            //     },
            // },
            public: {
                options: {
                    create: ["images"],
                },
            },
        },

        htmlmin: {
            // Task
            public: {
                // Target
                options: {
                    // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                },
                files: {
                    // Dictionary of files
                    // 'destination': 'source'
                    "public/index.html": "index.html",
                    "public/about.html": "about.html",
                    "public/cars.html": "cars.html",
                    "public/contact.html": "contact.html",
                    "public/specials.html": "specials.html",
                    "public/location.html": "location.html",
                    "public/404.html": "404.html",
                },
            },
        },

        /**
         * Concat
         */
        concat: {
            options: {
                separator: ";",
            },
            public: {
                src: ["scripts/main.js"],
                dest: "public/js/<%= pkg.name %>.js",
            },
        },

        /**
         * Uglify
         */
        uglify: {
            options: {
                banner:
                    '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
            },

            my_target: {
                files: {
                    "public/js/main.min.js": ["scripts/main.js"],
                },
            },
        },

        /**
         * sass Task
         */
        sass: {
            // dev: {
            //     options: {
            //         style: "expanded",
            //         sourcemap: "auto",
            //     },

            //     files: {
            //         "public/css/style.css": "sass/style.scss",
            //         "public/css/normalize.css": "sass/normalize.scss",
            //         "public/css/ie8.css": "sass/ie8.scss",
            //         /*where file goes-----/where file from*/
            //     },
            // },

            public: {
                options: {
                    style: "compressed",
                    sourcemap: "auto",
                },
                files: {
                    "public/css/style.css": "sass/style.scss",
                    "public/css/normalize.css": "sass/normalize.scss",
                    "public/css/ie8.css": "sass/ie8.scss",
                    /*where file goes-----/where file from*/
                },
            },
        },

        /**
         * QUnit
         */

        // qunit: {
        //     files: ["test/**/*.html"],
        // },

        /**
         * JS Hint
         */
        // jshint: {
        //     files: ["Gruntfile.js", "js/**/*.js", "test/**/*.js"],
        //     options: {
        //         // options here to override JSHint defaults

        //         globals: {
        //             jQuery: true,
        //             console: true,
        //             module: true,
        //             document: true,
        //         },
        //     },
        // },

        /**
         * watch
         */
        watch: {
            css: {
                files: ["sass/*.scss"],
                tasks: [
                    "sass",
                    "jshint",
                    "htmlmin",
                    "uglify",
                    "concat",
                    "responsive_images",
                ],
            },
        },
    });

    grunt.loadNpmTasks("grunt-responsive-images");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-mkdir");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-contrib-concat");

    grunt.registerTask("test", ["jshint", "qunit"]);

    grunt.registerTask("default", [
        "jshint",
        "qunit",
        "concat",
        "uglify",
        "clean",
        "mkdir",
        "htmlmin",
    ]);
    grunt.registerTask("default", ["sass", "watch", "responsive_images"]);
};

/* add bag (!) to wordpress css theme top-title so that it shows on minified file*/
