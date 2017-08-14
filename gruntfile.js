module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-screeps');

  grunt.initConfig({
    screeps: {
      options: {
        email: 'himitsu.monban@gmail.com',
        password: 'VYCVzzM7uKQgtRcL',
        branch: 'default',
        ptr: false
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**/*.js'],
            flatten: true
          }
        ]
      }
    }
  });
}
