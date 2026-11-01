/// <reference types="cypress" />

import { navegarParaPaginaInicial } from "../../helpers/navigation";
import { deleteAccount } from "../../helpers/deleteAccount";
import { criarUsuarioDeTeste } from "../../helpers/criarUsuarioDeTeste";
const cadastro = require("../../modules/cadastro/index.js");

describe("Automation Exercise - Register User", () => {
  it("Register User", () => {
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

  it("Register User with existing email", () => {
    criarUsuarioDeTeste().then((usuario) => {
      navegarParaPaginaInicial();

      cy.get("a[href*=login]").click();

      cadastro.iniciarCadastro(usuario.nome, usuario.email);

      cadastro.verificarSeMensagemDeCadastroExistenteFoiExibida();
    });
  });
});
