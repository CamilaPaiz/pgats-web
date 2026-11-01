/// <reference types="cypress" />

import { navegarParaPaginaInicial } from "../../helpers/navigation";

describe("Automation Exercise - Subscription", () => {

  it("Verify Subscription in home page", () => {
    navegarParaPaginaInicial();

    cy.get("footer[id='footer']").scrollIntoView();

    cy.get("h2").should("be.visible").and("contain", "Subscription");

    cy.get("#susbscribe_email").type(`pgats-aut-test-${Date.now()}@mail.com`);
    cy.get("#subscribe").click();

    cy.get("#success-subscribe")
      .should("be.visible")
      .and("contain", "You have been successfully subscribed!");
  });
});
