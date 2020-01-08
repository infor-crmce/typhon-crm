module.exports = function gruntJasmine(grunt) {
  grunt.config('jasmine', {
    basic: {
      src: ['src-out/**/*.js', 'configuration/**/*.js', 'localization/**/*.js'],
      options: {
        specs: 'tests/**/*.spec.js',
        host: 'http://127.0.0.1:8001/products/typhon-crm/',
        template: 'GruntRunnerBasic.tmpl',
        summary: true,
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
};
