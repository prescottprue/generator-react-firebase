import { createSelector } from '../utils'

describe('Home', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('/')
  })

  it('Shows features', () => {
    cy.get(createSelector('features')).should('exist')
  })

  it('Has link to login page', () => {
    cy.get(createSelector('sign-in')).click()
    cy.url().should('include', '/login')
  })
})
