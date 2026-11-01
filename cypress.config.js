const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: 1,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Cypress E2E Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: "http://automationexercise.com",
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
});


