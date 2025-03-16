describe('Search with include/exclude filters', () => {

  it('executes a search with include/exclude filters', () => {

    cy.visit('/');

    cy.get('[data-testid="accept-cookies-btn"]').click();

    cy.get('#nav-search-input').should('be.visible').type(Cypress.env('searchTerm'));

    cy.get('[data-testid="navbar-search-submit"]').should('be.visible').click({force: true});

    cy.get('[data-testid="work-tile-title"]').first().should('exist');

    cy.get('[data-testid="result-filter-pane"]').should('exist');

    cy.get(`[data-testid="include-facet-child-label-${Cypress.env('facetFilter')}"]`).should('exist').click();

    cy.get('#accordion-item-1').click();

    cy.get('.choices__input--cloned').first().type('the').type('{enter}');

    cy.get('[data-testid="facet-label"]').first().click();

    cy.get('[data-testid="exclude-multiselect"]').first().siblings('.choices__input--cloned').first().type('read').type('{enter}');

    cy.get('[data-testid="search-facet-form-submit"]').click();

    cy.get(`[data-testid="include-facet-child-label-${Cypress.env('facetFilter')}"]`).siblings('input').first().should('be.checked');

    cy.get('#accordion-item-1').click();

    cy.get('select[data-testid="include-multiselect"] option:selected').should('exist');

    cy.get('select[data-testid="exclude-multiselect"] option:selected').should('exist');

  });
})