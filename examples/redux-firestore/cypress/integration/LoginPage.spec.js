import { createSelector } from '../utils'

describe('Login Page', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('/login')
  })

  it('Shows Login Through Google Button', () => {
    cy.url().should('include', '/login')
    cy.get(createSelector('google-auth-button')).should('exist')
  })
})
