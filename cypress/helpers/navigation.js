export function navegarParaPaginaInicial() {
  cy.visit('/')
  cy.get('h1').contains('AutomationExercise').should('be.visible')
}