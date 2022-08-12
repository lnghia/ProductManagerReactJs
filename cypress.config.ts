import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: "src/cypress/fixtures",

  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "**/__tests__/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("@cypress/code-coverage/task")(on, config);
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config;
    },
  },
});
