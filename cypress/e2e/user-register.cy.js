describe('Register user', () => {
  it('New user -> show success toast', () => {
    cy.visit('/register')
      .should('have.text', 'User Registration')
      .get('#cy-reg-name')
      .type('name')
      .get('#cy-reg-email')
      .type('email@email.com')
      .get('form')
      .submit()
  })

  it('User is exist -> show error toast', () => {
    cy.visit('/register')
      .should('have.text', 'User Registration')
      .get('#cy-reg-name')
      .type('name')
      .get('#cy-reg-email')
      .type('email@email.com')
      .get('form')
      .submit()
  })
})
