function iniciarCadastro(nome, email) {
  cy.get('[data-qa="signup-name"]').type(nome)
  cy.get('[data-qa="signup-email"]').type(email)

  cy.get('[data-qa="signup-button"]').click()
}

function preencherCadastro() {
  cy.fixture('userData').then((data) => {
  // radio buttons -> check
  cy.get('#id_gender2').check()

  cy.get('[data-qa="password"]').type(data.password)

  // Selects e Comboboxes -> select
  cy.get('[data-qa="days"]').select(data.days)
  cy.get('[data-qa="months"]').select(data.months)
  cy.get('[data-qa="years"]').select(data.years)

  // checkboxes -> check
  cy.get('#newsletter').check()
  cy.get('#optin').check()
  cy.get('[data-qa="first_name"]').type(data.firstName)
  cy.get('[data-qa="last_name"]').type(data.lastName)
  cy.get('[data-qa="company"]').type(data.company)
  cy.get('[data-qa="address"]').type(data.address)

  cy.get('[data-qa="country"]').select(data.country)
  cy.get('[data-qa="state"]').type(data.state)
  cy.get('[data-qa="city"]').type(data.city)
  cy.get('[data-qa="zipcode"]').type(data.zipcode)

  cy.get('[data-qa="mobile_number"]').type(data.mobileNumber)

  cy.get('[data-qa="create-account"]').click()
  })
}

function verificarSeCadastroFoiEfetuadoComSucesso() {
  cy.get('[data-qa="account-created"]')
    .should('be.visible')
    .and('contain', 'Account Created!')

}

function verificarSeMensagemDeCadastroExistenteFoiExibida() {
  cy.get('form[action*=signup] p')
    .should('exist')
    .should('be.visible')
    .should('contain', 'Email Address already exist!')
    .and('contain.text', 'Email Address already exist!')
}

function deletarCadastro() {
  cy.get('[data-qa="continue-button"]').click()
  cy.get('a[href*="delete_account"]').should('be.visible')
  cy.get('a[href*="delete-account"]').click()
}

module.exports = {
  iniciarCadastro,
  preencherCadastro,
  verificarSeCadastroFoiEfetuadoComSucesso,
  verificarSeMensagemDeCadastroExistenteFoiExibida,
  deletarCadastro
}