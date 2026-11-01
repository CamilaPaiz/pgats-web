
function preencherFormularioLogin(email, senha) {
  cy.get("a[href*=login]").click();

  cy.get('div[class="login-form"]')
    .should("be.visible")
    .and("contain", "Login to your account");

  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(senha);

  cy.get('[data-qa="login-button"]').click();
}

function verificarSeUsuarioEstaLogado(name) {
  cy.get(".navbar-nav li")
    .contains(`Logged in as ${name}`)
    .should("be.visible");
}

function verficarmensagemDeErroLogin() {
  cy.get('form[action*="login"] > p')
      .should("exist")
      .should("be.visible")
      .should("contain", "Your email or password is incorrect!")
  };

function realizarLogout() {
  cy.get('a[href*="logout"]').should("be.visible").click();

    cy.get('a[href*="logout"]').should("not.exist");
    cy.get('[action*="login"]').should("be.visible");
    cy.url().should("include", "login");
}


module.exports = {
  preencherFormularioLogin,
  verificarSeUsuarioEstaLogado,
  verficarmensagemDeErroLogin,
  realizarLogout,
};
