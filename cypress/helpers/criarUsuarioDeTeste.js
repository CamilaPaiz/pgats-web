import { navegarParaPaginaInicial } from "./navigation";

const cadastro = require("../modules/cadastro/index.js");


 export function criarUsuarioDeTeste() {
  return cy.fixture("userData").then((userData) => {
    const usuario = {
      nome: userData.signUpName,
      email: `pgats-aut-${Date.now()}-${Cypress._.random(1000, 9999)}@mail.com`,
      senha: userData.password,
    };

    navegarParaPaginaInicial();
    cy.get("a[href*=login]").click();

    cadastro.iniciarCadastro(usuario.nome, usuario.email);
    cadastro.preencherCadastro();
    cadastro.verificarSeCadastroFoiEfetuadoComSucesso();

    cy.get('[data-qa="continue-button"]').click();
    cy.get('a[href*="logout"]').should("be.visible").click();

    return cy.wrap(usuario);
  });
}