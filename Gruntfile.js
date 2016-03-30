module.exports = function(grunt){

      grunt.initConfig({
        uglify:{
            build:{
                files:[{
                    expand:true,
                    cwd:'js/',
                    src:'**/*.js',
                    dest:'js/',
                    ext:'.min.js'
                }]
            }
        },

        cssmin:{
            build:{ 
                expand:true,
                cwd:'css/',
                src:['**/*.css', '!**/*.min.css'],
                dest:'css/',
                ext:'.min.css'
            }
        },


    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default',['uglify','cssmin']);




};