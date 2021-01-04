
context('Login', () => {
    beforeEach(() => {
      cy.visit('localhost:3000/login')
    })

    it('Logs in', () => {    
      cy.get('[data-testid="login-button"').should('exist')
      cy.login('user', 'pass')
      cy.get('[data-testid="logout-button"').should('exist')
    })
})