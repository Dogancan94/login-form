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
    cy.get('[cy-data-button="sign-in"]').should("exist");
    cy.get('[cy-data-button="sign-in"]').should("be.disabled");
  });

  it("Invalid emails show error message II", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[cy-data-email="email"]').type("dogancanworkintech");
    cy.get('[cy-data-email-error="email-error"]').should("exist");
    cy.get('[cy-data-email="email"]').clear();
    cy.get('[cy-data-email="email"]').type("dogancanworkintech.com.tr");
    cy.get('[cy-data-email-error="email-error"]').should("exist");
    cy.get('[cy-data-button="sign-in"]').should("exist");
    cy.get('[cy-data-button="sign-in"]').should("be.disabled");
  });

  it("Invalid emails show error message III", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[cy-data-email="email"]').type("dogancan@workintech.com.tr");
    cy.get('[cy-data-email-error="email-error"]').should("not.exist");
    cy.get('[cy-data-email="email"]').clear();
    cy.get('[cy-data-email-error="email-error"]').should("exist");
    cy.get('[cy-data-button="sign-in"]').should("exist");
    cy.get('[cy-data-button="sign-in"]').should("be.disabled");
  });

  it("Email Inputs Works correctly I", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[cy-data-email="email"]').type("dogancan@workintech.com.tr");
    cy.get('[cy-data-email-error="email-error"]').should("not.exist");
  });

  it("Invalid password show error message I", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[cy-data-password="password"]').type("123");
    cy.get('[cy-data-password-error="password-error"]').should("exist");
    cy.get('[cy-data-button="sign-in"]').should("exist");
    cy.get('[cy-data-button="sign-in"]').should("be.disabled");
  });

  it("Invalid password show error message II", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[cy-data-password="password"]').type("1234");
    cy.get('[cy-data-password-error="password-error"]').should("not.exist");
    cy.get('[cy-data-password="password"]').clear();
    cy.get('[cy-data-password="password"]').type("123");
    cy.get('[cy-data-button="sign-in"]').should("exist");
    cy.get('[cy-data-button="sign-in"]').should("be.disabled");
  });

  it("Password Input Works correctly I", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[cy-data-password="password"]').type("1234");
    cy.get('[cy-data-password-error="password-error"]').should("not.exist");
  });

  it("All Inputs Works correctly I", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[cy-data-email="email"]').type("dogancan@workintech.com.tr");
    cy.get('[cy-data-email-error="email-error"]').should("not.exist");
    cy.get('[cy-data-password="password"]').type("1234");
    cy.get('[cy-data-password-error="password-error"]').should("not.exist");
  });

  it("All Fields Works correctly I", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[cy-data-email="email"]').type("dogancan@workintech.com.tr");
    cy.get('[cy-data-email-error="email-error"]').should("not.exist");
    cy.get('[cy-data-password="password"]').type("1234");
    cy.get('[cy-data-terms="terms"]').check();
    cy.get('[cy-data-button="sign-in"]').not("be.disabled");
    cy.get('[cy-data-success-title="success-title"]').should("not.exist");
  });

  it("Success Page works", () => {
    cy.visit("http://localhost:5173/");
    cy.get('[cy-data-email="email"]').type("dogancan@workintech.com.tr");
    cy.get('[cy-data-email-error="email-error"]').should("not.exist");
    cy.get('[cy-data-password="password"]').type("1234");
    cy.get('[cy-data-terms="terms"]').check();
    cy.get('[cy-data-button="sign-in"]').not("be.disabled");
    cy.get('[cy-data-button="sign-in"]').click();
    cy.get('[cy-data-success-title="success-title"]').should("exist");
  });
});
