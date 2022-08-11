const { Login } = require("../pages/Login");

describe("Login form test", () => {
  it("should have text 'Login App'", () => {
    cy.visit("http://localhost:3000/login");

    cy.focused().should("have.text", "Login App");
  });
});
