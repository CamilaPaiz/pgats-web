function navegaParaProdutos() {
  cy.get('a[href*="/products"]').click();
  cy.url().should("include", "products");

  cy.get('h2[class="title text-center"]')
    .should("be.visible")
    .and("contain", "All Products");
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
};
