
context('Login', () => {
    beforeEach(() => {
      cy.visit('localhost:3000/login')
    })

    it('Logs in', () => {    
      cy.get('[data-testid="login-sidenav"').should('exist')
      cy.login('admin', 'pass')
      cy.get('[data-testid="logout-sidenav"').should('exist')
    })
})