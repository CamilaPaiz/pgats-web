function irParaCarrinhoDeCompras() {
  cy.get('.navbar-nav a[href*="/view_cart"]')
    .contains("Cart")
    .should("be.visible")
    .click();
  cy.url().should("include", "view_cart");
  cy.get("li").contains("Shopping Cart");
}

function revisarProdutoAdicionadoAoCarrinho() {
  cy.get("h2").contains("Review Your Order").should("be.visible");
  cy.get("a[href*='/product_details/1']").should("be.visible");

  cy.get("a[href*='/product_details/2']").should("be.visible");
}

function revisarEnderecoDeEntrega() {
  cy.fixture("userData").then((data) => {
    cy.get("li[class='address_firstname address_lastname']")
      .contains(`${data.firstName} ${data.lastName}`)
      .should("be.visible");
    cy.get("li[class='address_address1 address_address2']")
      .contains(data.address)
      .should("be.visible");
    cy.get("li[class='address_city address_state_name address_postcode']")
      .should("contain", data.city)
      .and("contain", data.state)
      .and("contain", data.zipcode);

    cy.get("li[class='address_country_name']")
      .contains(data.country)
      .should("be.visible");
    cy.get("li[class='address_phone']")
      .contains(data.mobileNumber)
      .should("be.visible");
  });
}

function preencherFormularioDePagamento() {
  cy.fixture("cardInformation").then((cardInfo) => {
    cy.get('[data-qa="name-on-card"]').type(cardInfo.nameOnCard);
    cy.get('[data-qa="card-number"]').type(cardInfo.cardNumber);
    cy.get('[data-qa="cvc"]').type(cardInfo.cvc);
    cy.get('[data-qa="expiry-month"]').type(cardInfo.expirationMonth);
    cy.get('[data-qa="expiry-year"]').type(cardInfo.expirationYear);
  });
}

function verificarSePagamentoFoiEfetuadoComSucesso() {
  cy.get("p")
    .should("be.visible")
    .and("contain", "Congratulations! Your order has been confirmed!");
}

module.exports = {
  irParaCarrinhoDeCompras,
  revisarEnderecoDeEntrega,
  revisarProdutoAdicionadoAoCarrinho,
  preencherFormularioDePagamento,
  verificarSePagamentoFoiEfetuadoComSucesso,
};
