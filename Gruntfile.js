module.exports = function( grunt ){


    grunt.initConfig({
        sass: {
            default: {
                files: {
                    'dist/css/main.css': 'sass/style.scss'
                }
            }
        },

        concat:  {
            default: {
                src: [ 'src/filters.js',  'src/app.js' ],
                dest: 'dist/js/app.js'
            },
            libs: {
                src: ['node_modules/angular/lib/angular.min.js', 'node_modules/markdown/lib/markdown.js'],
                dest: 'dist/js/libs.js'
            }
        },
        watch: {
            js: {
                files: 'src/**',
                tasks: ['concat']

            },
            sass: {
                files: 'sass/**',
                tasks: ['sass']
            }
        }
    });



    grunt.loadNpmTasks( 'grunt-sass' );
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask( 'default', ['sass:default', 'concat'] );
}
