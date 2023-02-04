module.exports = function (grunt) {
  grunt.loadNpmTasks("grunt-screeps");

  grunt.initConfig({
    screeps: {
      options: {
        //server: 'season'
        branch: "default",
        email: "<your account email>",
        password: "<your password>",
        // token: "<your auth token>",
      },
      dist: {
        src: ["dist/*"],
      },
    },
  });
};
