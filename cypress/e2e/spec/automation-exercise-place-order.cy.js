/// <reference types="cypress" />

import { navegarParaPaginaInicial } from "../../helpers/navigation";
import { deleteAccount } from "../../helpers/deleteAccount";
import { criarUsuarioDeTeste } from "../../helpers/criarUsuarioDeTeste";
const loginUsuario = require("../../modules/login/index.js");
const cadastro = require("../../modules/cadastro/index.js");
const produto = require("../../modules/produto/index.js");
const pedido = require("../../modules/pedido/index.js");

describe("Automation Exercise - Place Order", () => {
  it("Place Order: Register before Checkout", () => {
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

  it("Place Order: Login before Checkout", () => {
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

      cy.get('[data-qa="pay-button"]')
        .contains("Pay and Confirm Order")
        .click();

      pedido.verificarSePagamentoFoiEfetuadoComSucesso();

      deleteAccount();
    });
  });
});
