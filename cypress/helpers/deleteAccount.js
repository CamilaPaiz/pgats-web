export function deleteAccount() {
    cy.get('a[href*="delete_account"]').should("be.visible");

    cy.get('a[href*="delete_account"]').click();

    cy.get('[data-qa="account-deleted"]')
      .should("be.visible")
      .and("contain", "Account Deleted!");
}
