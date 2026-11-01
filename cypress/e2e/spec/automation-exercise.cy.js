/// <reference types="cypress" />

import { navegarParaPaginaInicial } from "../../helpers/navigation";
import { deleteAccount } from "../../helpers/deleteAccount";
import { criarUsuarioDeTeste } from "../../helpers/criarUsuarioDeTeste";
import userData from "../../fixtures/userData.json";
const loginUsuario = require("../../modules/login/index.js");
const cadastro = require("../../modules/cadastro/index.js");
const produto = require("../../modules/produto/index.js");
const pedido = require("../../modules/pedido/index.js");

describe("Automation Exercise", () => {
  it("1-Register User", () => {
    navegarParaPaginaInicial();

    cy.get("a[href*=login]").click();
    cy.get('div[class="signup-form"]')
      .should("be.visible")
      .and("contain", "New User Signup!");

    cy.get('[data-qa="signup-name"]').type(`PGATS Aut`);
    cy.get('[data-qa="signup-email"]').type(
      `pgats-aut-test-${Date.now()}@mail.com`,
    );

    cy.get('[data-qa="signup-button"]').click();

    cy.get('div[class="login-form"]')
      .should("be.visible")
      .and("contain", "Enter Account Information");

    cadastro.preencherCadastro();

    cy.get('[data-qa="account-created"]')
      .should("be.visible")
      .and("contain", "Account Created!");

    cy.get('[data-qa="continue-button"]').click();

    deleteAccount();
  });

  it("5-Register User with existing email", () => {
    criarUsuarioDeTeste().then((usuario) => {
      navegarParaPaginaInicial();

      cy.get("a[href*=login]").click();

      cadastro.iniciarCadastro(usuario.nome, usuario.email);

      cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida();
    });
  });

  it("8-Verify All Products and product detail page", () => {
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

    cy.get('div[class="product-information"]')
      .should("be.visible")
      .and("contain", "Blue Top");
    cy.get("p").contains("Category: Women > Tops").should("be.visible");
    cy.get("span").contains("Rs. 500").should("be.visible");
    cy.get("p").contains("Availability: In Stock").should("be.visible");
    cy.get("p").contains("Condition: New").should("be.visible");
    cy.get("p").contains("Brand: Polo").should("be.visible");
  });

  it("9-Search Product", () => {
    navegarParaPaginaInicial();

    produto.navegaParaProdutos();

    cy.get("input[id='search_product']").should("be.visible").type("Madame");
    cy.get("button[id='submit_search']").click();

    cy.get("h2").should("be.visible").and("contain", "Searched Products");
    cy.get("p").should("be.visible").and("contain", "Madame Top For Women");
  });

  it("10-Verify Subscription in home page", () => {
    navegarParaPaginaInicial();

    cy.get("footer[id='footer']").scrollIntoView();

    cy.get("h2").should("be.visible").and("contain", "Subscription");

    cy.get("#susbscribe_email").type(`pgats-aut-test-${Date.now()}@mail.com`);
    cy.get("#subscribe").click();

    cy.get("#success-subscribe")
      .should("be.visible")
      .and("contain", "You have been successfully subscribed!");
  });

  it("15-Place Order: Register before Checkout", () => {
    navegarParaPaginaInicial();

    cy.get("a[href*=login]").click();

    cadastro.iniciarCadastro(
      `PGATS Order`,
      `pgats-aut-test-${Date.now()}@mail.com`,
    );
    cadastro.preencherCadastro();

    cadastro.verificarSeCadastroFoiEfetuadoComSucesso();

    cy.get('[data-qa="continue-button"]').click();

    loginUsuario.verificarSeUsuarioEstaLogado(`PGATS Order`);

    produto.navegaParaProdutos();

    produto.selecionarProdutos();

    produto.verificaModalDeProdutoAdicionado();

    pedido.irParaCarrinhoDeCompras();

    cy.get("a").contains("Proceed To Checkout").click();

    pedido.revisarProdutoAdicionadoAoCarrinho();
    pedido.revisarEnderecoDeEntrega();

    cy.get("textarea[name='message']").type(
      "Please deliver between 9 AM to 5 PM.",
    );

    cy.get("a[href*='/payment']").contains("Place Order").click();

    pedido.preencherFormularioDePagamento();

    cy.get('[data-qa="pay-button"]').contains("Pay and Confirm Order").click();

    pedido.verificarSePagamentoFoiEfetuadoComSucesso();

    deleteAccount();
  });

  it("16-Place Order: Login before Checkout", () => {
     criarUsuarioDeTeste().then((usuario) => {
    navegarParaPaginaInicial();

    loginUsuario.preencherFormularioLogin(usuario.email, usuario.senha);

    loginUsuario.verificarSeUsuarioEstaLogado(`PGATS`);

    produto.navegaParaProdutos();

    produto.selecionarProdutos();

    produto.verificaModalDeProdutoAdicionado();

    pedido.irParaCarrinhoDeCompras();

    cy.get("a").contains("Proceed To Checkout").click();

    pedido.revisarProdutoAdicionadoAoCarrinho();
    pedido.revisarEnderecoDeEntrega();

    cy.get("textarea[name='message']").type(
      "Please deliver between 10 AM to 6 PM.",
    );

    cy.get("a[href*='/payment']").contains("Place Order").click();

    pedido.preencherFormularioDePagamento();

    cy.get('[data-qa="pay-button"]').contains("Pay and Confirm Order").click();

    pedido.verificarSePagamentoFoiEfetuadoComSucesso();

    deleteAccount();
  })
  });
});
