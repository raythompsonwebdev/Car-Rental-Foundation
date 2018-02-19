module.exports = function(grunt){


    grunt.initConfig({

            pkg: grunt.file.readJSON('package.json'),
		
		
		responsive_images: {
		  dev: {
			options: {
			  engine: 'im',
			  sizes: [
				  
				{
				  name:'quantamsmall',
				  width: 80,
				},
				{
				  name:'microsmall',
				  width: 120,
				},
				{
				  name: 'extrasmall',
				  width: 240,
				},
				{
				  name:'small',
				  width: 500,
				},
				{
				  name:'medium',	
				  width: 980,
				},
			  	{
				  name:'large',	
				  width: 1200,
				}]
			},

			/*
			You don't need to change this part if you don't change
			the directory structure.
			*/
			files: [{
			  expand: true,
			  src: ['*.{gif,jpg,png}'],
			  cwd: 'car-rental-app/images/',
			  dest: 'car-rental-app/images/images/'
			}]
		  }
		},

		/* Clear out the images directory if it exists */
		clean: {
		  dev: {
			src: ['images'],
		  },
		},

		/* Generate the images directory if it is missing */
		mkdir: {
		  dev: {
			options: {
			  create: ['images']
			},
		  },
		},
		
		
		htmlmin: {                                     // Task
			dist: {                                      // Target
			  options: {                                 // Target options
				removeComments: true,
				collapseWhitespace: true
			  },
			  files: {                                   // Dictionary of files
				'car-rental-app/dist/index.html': 'car-rental-app/index.html',     // 'destination': 'source'
				'car-rental-app/dist/about.html': 'car-rental-app/about.html',
				'car-rental-app/dist/cars.html': 'car-rental-app/cars.html',   
				'car-rental-app/dist/contact.html': 'car-rental-app/contact.html',   
				'car-rental-app/dist/specials.html': 'car-rental-app/specials.html',  
				'car-rental-app/dist/location.html': 'car-rental-app/location.html',  
				'car-rental-app/dist/500.html': 'car-rental-app/500.html',   
				  
				'car-rental-app/dist/404.html': 'car-rental-app/404.html',  
				'car-rental-app/dist/401.html': 'car-rental-app/401.html',   
				}
			}
		  },

		/**
         * Concat
         */
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['car-rental-app/scripts/**/*.js'],
                dest: 'car-rental-app/dist/<%= pkg.name %>.js'
            }
        },
        
        /**
         * Uglify
         */
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
			
			my_target: {
			  files: {
				'car-rental-app/dist/output.min.js': ['car-rental-app/scripts/main.js', 'car-rental-app/scripts/jquery.validate.min.js']
			  }
			},
			
            
        },

		/**
		 * sass Task
		 */
        sass:{

                dev:{
                    options:{
                            style:"expanded",
                            sourcemap:'auto'
                    },

                    files:{
														'car-rental-app/style.css':'car-rental-app/styles/style.scss',
														'car-rental-app/normalize.css.css':'car-rental-app/styles/normalize.scss',                           
                            'car-rental-app/ie8.css':'car-rental-app/styles/ie8.scss'
                            /*where file goes-----/where file from*/
                    }
                },

                    dist:{
                        options:{
                                style:"compressed",
                                sourcemap:'auto'
                        },
                        files:{
                            'car-rental-app/dist/style-min.css':'car-rental-app/styles/style.scss', 'car-rental-app/dist/normalize-min.css.css':'car-rental-app/styles/normalize.scss',      'car-rental-app/dist/ie8-min.css':'car-rental-app/styles/ie8.scss'
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
            files: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js'],
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
         * watch
         */
		watch:{

                css:{
                        files:'car-rental-app/**/*.scss',
                        tasks:['sass', 'jshint', 'htmlmin', 'uglify', 'concat', 'responsive_images' ]
                }
            }


    });

grunt.loadNpmTasks('grunt-responsive-images');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-mkdir');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-qunit');
grunt.loadNpmTasks('grunt-contrib-concat');

grunt.registerTask('test', ['jshint', 'qunit']);

grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify', 'clean', 'mkdir', 'htmlmin']);
grunt.registerTask('default', ['sass', 'watch' ,'responsive_images']);
	
	


};

/* add bag (!) to wordpress css theme top-title so that it shows on minified file*/