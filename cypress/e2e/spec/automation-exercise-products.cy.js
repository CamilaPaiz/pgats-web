/// <reference types="cypress" />

import { navegarParaPaginaInicial } from "../../helpers/navigation.js";
const produto = require("../../modules/produto/index.js");


describe("Automation Exercise - Products", () => {
 
  it("Verify All Products and product detail page", () => {
    navegarParaPaginaInicial();

    produto.navegaParaProdutos();

    cy.get("div[class='single-products']")
      .should("be.visible")
      .and("have.length.greaterThan", 10);

    cy.get("div[class='product-image-wrapper']")
      .first()
      .contains("View Product")
      .click();
    cy.url().should("include", "product_details/1");

    produto.validarDetalhesDoProduto();
  });

  it("Search Product", () => {
    navegarParaPaginaInicial();

    produto.navegaParaProdutos();

    cy.get("input[id='search_product']").should("be.visible").type("Madame");
    cy.get("button[id='submit_search']").click();

    cy.get("h2").should("be.visible").and("contain", "Searched Products");
    cy.get("p").should("be.visible").and("contain", "Madame Top For Women");
  });
});
