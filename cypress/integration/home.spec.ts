context('Home', () => {
  beforeEach(() => {
    cy.visit('localhost:3000')
  })

  it('Header text says Employee Listing', () => {
    cy.get('#header-text').should('contain', 'Employee Listing')
  })
})
