describe('Login Page', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('/login')
  })

  it('Shows Login Through Google Button', () => {
    cy.url().should('include', '/login')
    cy.findByRole('button', { name: /Sign in with Google/i }).should('exist')
  })
})
