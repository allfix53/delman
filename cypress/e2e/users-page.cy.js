describe('Users page', () => {
  it('Valid page title', () => {
    cy.visit('/users')
      .get('#cy-page-title')
      .should('have.text', 'Users Data')
      //
      .wait(200)
      .get('.grid-container')
  })
})
