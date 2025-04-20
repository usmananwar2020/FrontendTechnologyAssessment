const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Replace with your app's URL
    supportFile: 'cypress/support/e2e.js',
  },
});