module.exports = function(grunt) {
  const config = require('./.screeps.json');
  let options = {
    branch: grunt.option('branch') || config.branch,
    email: grunt.option('email') || config.email,
    password: grunt.option('password') || config.password,
    ptr: grunt.option('ptr') ? true : config.ptr
  };

  grunt.loadNpmTasks('grunt-screeps');

  grunt.initConfig({
    screeps: {
      options: options,
      dist: {
        src: ['dist/*.js']
      }
    }
  });
}
