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
                src: [ 'src/app.js' ],
                dest: 'dist/js/app.js'
            }
        }
    });

    grunt.loadNpmTasks( 'grunt-sass' );
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask( 'default', ['sass:default', 'concat'] );
}
