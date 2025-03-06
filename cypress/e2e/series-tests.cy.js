describe('Authenticated User Series CRUD', () => {

  after(() => {
    cy.destroyTestData(Cypress.env("ourchivePath"), Cypress.env("venvFolder"), Cypress.env("venvCommand"));
  });

  it('logs in and creates a new series', () => {
    cy.login(Cypress.env('smokeTestUserOne'), Cypress.env('smokeTestUserOnePassword'));

    cy.get('#nav-username').click();

    cy.get('#nav-new-series-li').click();

    cy.get('#series-form-title-input').should('be.visible').type('{selectAll}');

    cy.get('#series-form-title-input').should('be.visible').type('{backspace}');

    cy.get('#series-form-title-input').should('be.visible').type('My New Series');

    cy.get('iframe#descriptionEditor_ifr').then(($iframe) => {
        let doc = $iframe.contents().find("body#tinymce");
        cy.wrap(doc).find("p").first().type("hello world (from series)");
        cy.wrap(doc).should("have.text", "hello world (from series)");
    });

    cy.get('#series_entry').type('the');

    cy.get('.dropdown-menu').first().should('exist');

    cy.get('[data-testid="collection-autocomplete-result"]').first().click();

    cy.get('.series-tracker').first().should('exist');

    cy.get('#series-form-actions-footer-submit').click();

    cy.url().should('include', 'series');

    cy.get('#series-parent-sm').should('exist');

    cy.get('[data-testid="series-work"]').should('exist');

    cy.get('[data-testid="series-description"]').invoke("text").should("contain", 'hello world (from series)')

  })

  it('edits an existing series', () => {
    cy.login(Cypress.env('smokeTestUserOne'), Cypress.env('smokeTestUserOnePassword'));

    cy.get('#nav-username').click();

    cy.get('#nav-creations-li').click();

    cy.get('#series-tab').click();

    cy.get('[data-testid="series-tile-title"]').first().click();

    cy.get('#series-edit-link').should('exist').click();

    cy.get('#series-form-title-input').should('be.visible').type('{selectAll}');

    cy.get('#series-form-title-input').should('be.visible').type('{backspace}');

    cy.get('#series-form-title-input').should('be.visible').type('Edited Series Title');

    cy.get('#series-form-actions-footer-submit').click();

    cy.url().should('include', 'series');

    cy.get('[data-testid="series-tile-title"]').invoke("text").should("equal", 'Edited Series Title');

  });
})