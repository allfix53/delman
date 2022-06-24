describe('Users page', () => {
  it('Valid page title', () => {
    cy.visit('/search').get('#cy-page-title').should('have.text', 'Search User')
  })
})
