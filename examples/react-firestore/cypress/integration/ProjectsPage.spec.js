describe('Projects Page', () => {
  beforeEach(() => {
    // Login using custom token
    cy.login()
    // Go to projects page
    cy.visit('/projects')
  })

  const newProjectTitle = 'Test project'
  describe('Add Project', () => {
    it('creates project when provided a valid name', () => {
      cy.findByRole('button', { name: /Add Project/i }).click()
      // Type name of new project into input
      cy.findByRole('textbox').type(newProjectTitle)
      // Click on the new project button
      cy.findByRole('button', { name: /Create/i }).click()
      cy.findByRole('alert').should('have.text', 'Project added successfully')
      // Confirm first project tile has title passed to new project input
      cy.findAllByRole('listitem').first().should('have.text', newProjectTitle)
    })
  })

  describe('Delete Project', () => {
    it('allows project to be deleted by project owner', () => {
      cy.findAllByRole('listitem')
        .first()
        .within(() => {
          cy.findByRole('button', { name: /delete/i }).click()
        })
      cy.findByRole('alert').should('have.text', 'Project deleted successfully')
    })
  })
})
