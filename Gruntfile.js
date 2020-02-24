module.exports = function(grunt) {

  
// Project configuration.
grunt.initConfig({

  htmlmin: {                                    
    dist: {                                      
      options: {                                 
        removeComments: true,
        collapseWhitespace: true
      },
      files: {                                
        'build/index.html'       : 'index.html',    
        'build/views/add.html'   : 'views/add.html',
        'build/views/edit.html'  : 'views/edit.html',
        'build/views/main.html'  : 'views/main.html',
        'build/views/header.html': 'views/header.html'
      }
    }
  },
  imagemin: {
    dynamic: {
        files: [{
            expand: true,
            cwd: 'images/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'build/images'
        }]
    }
},

  uglify: {
    options: {
      mangle: false
    },
    my_target: {
      files: {
        'build/js/vendor.js': ['scripts/app.js', 'scripts/factory/my-service.js', 'scripts/controllers/add-controller.js', 'scripts/controllers/edit-controller.js']
      }
    }
  },
  cssmin: {
    target: {
      files: [{
        expand: true,
        cwd: 'styles/',
        src: ['*.css', '!*.min.css'],
        dest: 'build/css',
        ext: '.min.css'
      }]
    }
  },

  sass: {
    dist: {
      files: {
        'build/css/main.css'  : 'styles/main.scss',
        'build/css/styles.css': 'styles/styles.scss',
      }
    }  
  },
  concat: {
    js: {
      src: ['scripts/app.js', 'scripts/factory/my-service.js', 'scripts/controllers/add-controller.js', 'scripts/controllers/edit-controller.js'],
      dest: 'build/js/scripts.js',
    },
    css: {
      src: ['styles/styles.css', 'styles/main.css'],
      dest: 'build/css/main.css',
    },
  },
  watch: {
    js: {
      files: ['scripts/**/*.js'],
      tasks: ['concat:js'],
    },
    css: {
      files: ['styles/**/*.css'],
      tasks: ['concat:css'],
    },
  },
});

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ['concat', 'watch', 'sass']);

  // Loading of tasks and registering tasks will be written here
};