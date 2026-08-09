// Karma configuration file, see link for more information
// https://karma-runner.github.io/latest/config/configuration-file.html
// The Angular CLI supplies the framework, plugins and reporters; this file only
// adds a sandbox-free headless launcher for CI environments.

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter')
    ],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    }
  });
};
