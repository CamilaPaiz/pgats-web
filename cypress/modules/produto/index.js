function navegaParaProdutos() {
  cy.get('a[href*="/products"]').click();
  cy.url().should("include", "products");

  cy.get('h2[class="title text-center"]')
    .should("be.visible")
    .and("contain", "All Products");
}

function validarDetalhesDoProduto() {
  cy.get('div[class="product-information"]')
    .should("be.visible")
    .and("contain", "Blue Top");
  cy.get("p").contains("Category: Women > Tops").should("be.visible");
  cy.get("span").contains("Rs. 500").should("be.visible");
  cy.get("p").contains("Availability: In Stock").should("be.visible");
  cy.get("p").contains("Condition: New").should("be.visible");
  cy.get("p").contains("Brand: Polo").should("be.visible");
}

function verificaModalDeProdutoAdicionado() {
  cy.get(".modal-content").should("be.visible").and("contain", "Added!");

  cy.get(".modal-content").contains("Continue Shopping").click();
}

function selecionarProdutos() {
  cy.get("div[class='single-products']")
    .first()
    .contains("Add to cart")
    .click();

  verificaModalDeProdutoAdicionado();
  cy.get("div[class='single-products']").eq(1).contains("Add to cart").click();
}

module.exports = {
  navegaParaProdutos,
  verificaModalDeProdutoAdicionado,
  selecionarProdutos,
  validarDetalhesDoProduto
};
