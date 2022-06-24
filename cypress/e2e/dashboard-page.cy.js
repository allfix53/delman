describe('Dashboard page', () => {
  it('Valid page title', () => {
    cy.visit('/')
      .get('#cy-page-title')
      .should('have.text', 'Sales Dashboard')
      //
      .wait(200)
      .get('.grid-container')
  })
})
