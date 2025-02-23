describe('Anon User Browsing', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('visits the homepage and browses works', () => {

    cy.get('[data-testid="browse-cards"]').first().click()

    cy.url().should('include', '/search/?work_type')

    cy.get('[data-testid="works-tab"]').invoke("text").should("contain", "Works")

    cy.get('[data-testid="ourchive-logo-link"]').click()

    cy.get('[data-testid="browse-cards"]').first().click()

    cy.url().should('include', '/search/?work_type')

    cy.get('[id$=-tile-card]').first().should('exist')

    // navigate to user with everything
    if (Cypress.env('smokeTestUser') > 0) {

          cy.visit(`/username/${Cypress.env('smokeTestUser')}`)

          // collection
          cy.get('[id="collections-tab"]').click()

          cy.get('[data-testid="collection-tile"]').first().should('exist')

          // series
          cy.get('[id="series-tab"]').click()

          cy.get('[data-testid="series-tile"]').first().should('exist')

          // anthologies

          cy.get('[id="anthologies-tab"]').click()

          cy.get('[data-testid="anthology-tile"]').first().should('exist')
    }

  })

  it('executes a search', () => {

    cy.get('#nav-search-input').should('be.visible').type(Cypress.env('searchTerm'))

    cy.get('[data-testid="navbar-search-submit"]').should('be.visible').click({force: true})

    cy.get('[data-testid="work-tile-title"]').first().should('exist')

    cy.get('[data-testid="result-filter-pane"]').should('exist')

    cy.get(`[data-testid="include-facet-child-label-${Cypress.env('facetFilter')}"]`).should('exist').click()

    cy.get('[data-testid="search-facet-form-submit"]').click()

    cy.get('[data-testid="work-tile-title"]').first().should('exist')

    cy.get('#search-results-sort-select-visible').select('-comment_count')

    cy.get('[data-testid="work-tile-title"]').first().should('exist')

    cy.get('#search-results-sort-select-visible').select('-fingerguns', {force: true})

    cy.get('[data-testid="work-tile-title"]').first().should('exist')

    cy.get('#accordion-item-1').click()

    cy.get('.multi-select-component').first().should('exist')

    cy.get('[data-testid="include-multiselect"]').first().should('exist').select(0, {force: true})

    cy.get('[data-testid="search-facet-form-submit"]').click()

  })
})