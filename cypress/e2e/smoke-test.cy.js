describe('Anon User Browsing', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8000/')
  })

  it('visits the homepage and browses works', () => {

    cy.get('[data-testid="browse-cards"]').first().click()

    cy.url().should('include', '/search/?work_type')

    cy.get('[data-testid="works-tab"]').invoke("text").should("contain", "Works")

    cy.get('[data-testid="ourchive-logo-link"]').click()

    cy.get('[data-testid="browse-cards"]').first().click()

    cy.url().should('include', '/search/?work_type')

    cy.get('[id$=-tile-card]').first().should('exist')

    cy.visit('http://127.0.0.1:8000/username/1/')

    cy.get('[id="user_collections_selector"]').click()

    cy.get('[id^=bkcol-tile-card-]').first().should('exist')

    // series
    cy.get('[id="user_series_selector"]').click()

    cy.get('[data-testid="series-card-title"]').first().should('exist')

    // anthologies

    cy.get('[id="user_anthologies_selector"]').click()

    cy.get('[data-testid="anthology-card-title"]').first().should('exist')

  })

  it('executes a search', () => {

    cy.get('#nav-search-input')
      .should('be.visible')
      .type('untitled')

    cy.get('[data-testid="navbar-search-submit"]')
      .should('be.visible')
      .click()

    cy.get('[data-testid="work-tile-title"]').first().should('exist')
  })
})