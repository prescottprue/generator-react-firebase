describe('Home', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('/')
  })

  it('Shows features', () => {
    cy.findByRole('article').should('exist')
  })
})
