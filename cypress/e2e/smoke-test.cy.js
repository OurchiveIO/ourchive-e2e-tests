describe('Anon User Browsing', () => {
  it('visits the homepage and browses works', () => {
    cy.visit('http://127.0.0.1:8000/')

    cy.get('[data-testid="browse-cards"]').first().click()

    cy.url().should('include', '/search/?work_type')

    cy.get('[data-testid="works-tab"]').invoke("text").should("contain", "Works")

    cy.get('[data-testid="nav-works"]').click()

    cy.url().should('include', '/works')

    cy.get('[id$=-tile-card]').first().should('exist')

    cy.get('[data-testid="nav-collections"]').click()

    cy.url().should('include', '/bookmark-collections')

    cy.get('[id^=bkcol-tile-card-]').first().should('exist')

  })
})