describe("Login Page Successfully Created", () => {
  it("Page successfull loaded", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[data-testId="cypress-title"]')
      .should("exist")
      .should("have.text", "Sign In");
  });

  it("Email Inputs exists", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[cy-data-email="email"]').should("exist");
    cy.get('[cy-data-email-error="email-error"]').should("exist");

    cy.get('[cy-data-email="email"]').type("dogancan@work");
    cy.get('[cy-data-email-error="email-error"]').should("exist");
  });

  it("Invalid emails show error message I", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[cy-data-email="email"]').type("dogancan@work");
    cy.get('[cy-data-email-error="email-error"]').should("exist");
  });

  it("Invalid emails show error message II", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[cy-data-email="email"]').type("dogancanworkintech");
    cy.get('[cy-data-email-error="email-error"]').should("exist");
  });

  it("Invalid emails show error message III", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[cy-data-email="email"]').type("dogancan@workintech.com.tr");
    cy.get('[cy-data-email-error="email-error"]').should("not.exist");
    cy.get('[cy-data-email="email"]').clear();
    cy.get('[cy-data-email-error="email-error"]').should("exist");
  });

  it("Email Inputs Works correctly I", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[cy-data-email="email"]').type("dogancan@workintech.com.tr");
    cy.get('[cy-data-email-error="email-error"]').should("not.exist");
  });
});
