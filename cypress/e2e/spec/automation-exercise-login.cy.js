/// <reference types="cypress" />

import { navegarParaPaginaInicial } from "../../helpers/navigation.js";
import { deleteAccount } from "../../helpers/deleteAccount.js";
import { criarUsuarioDeTeste } from "../../helpers/criarUsuarioDeTeste.js";
const loginUsuario = require("../../modules/login/index.js");

describe("Automation Exercise -Login", () => {
  let usuario;

  beforeEach(() => {
    criarUsuarioDeTeste().then((usuarioCriado) => {
      usuario = usuarioCriado;
    });
  });

  it("Login User with correct email and password", () => {
    navegarParaPaginaInicial();

    loginUsuario.preencherFormularioLogin(usuario.email, usuario.senha);

    cy.get(".navbar-nav li")
      .contains("Logged in as PGATS")
      .should("be.visible");

    deleteAccount();
  });

  it("Login User with incorrect email and password", () => {
    navegarParaPaginaInicial();

    loginUsuario.preencherFormularioLogin("teste@teste.com", "54321");

    loginUsuario.verficarmensagemDeErroLogin();
  });

  it("Logout User", () => {
    navegarParaPaginaInicial();

    loginUsuario.preencherFormularioLogin(usuario.email, usuario.senha);
    cy.get(".navbar-nav li")
      .contains("Logged in as PGATS")
      .should("be.visible");

    loginUsuario.realizarLogout();
  });
});
