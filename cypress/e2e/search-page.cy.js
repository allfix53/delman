describe('Users page', () => {
  it('Valid page title', () => {
    cy.visit('/search')
      .get('#cy-page-title')
      .should('have.text', 'Search User')

      // input email to search
      .get('#cy-search-email')
      .type('test@test.com')
      .get('form')
      .submit()

      // result search
      .wait(500)
      .get('#cy-result-search-name')
      .should('have.text', 'test@test.com')

      // open drawer
      .get('#cy-result-detail-user')
      .click()
      .wait(1000)
      .get('#chakra-modal-cy-user-detail-drawer')
  })
})
