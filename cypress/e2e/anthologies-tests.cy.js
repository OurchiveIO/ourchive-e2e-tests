describe('Authenticated User Works CRUD', () => {

  after(() => {
    cy.destroyTestData(Cypress.env("ourchivePath"), Cypress.env("venvFolder"), Cypress.env("venvCommand"));
  });

  it('logs in and creates a new anthology', () => {
    cy.login(Cypress.env('smokeTestUserOne'), Cypress.env('smokeTestUserOnePassword'));

    cy.get('#nav-username').click();

    cy.get('#nav-new-anthology-li').click();

    cy.get('#anthology-form-title-input').should('be.visible').type('{selectAll}');

    cy.get('#anthology-form-title-input').should('be.visible').type('{backspace}');

    cy.get('#anthology-form-title-input').should('be.visible').type('Anthology Title');

    cy.get('iframe#descriptionEditor_ifr').then(($iframe) => {
        let doc = $iframe.contents().find("body#tinymce");
        cy.wrap(doc).find("p").first().type("hello world (anthology)");
        cy.wrap(doc).should("have.text", "hello world (anthology)");
    });

    cy.get('#anthology-entry').type('the');

    cy.get('.dropdown-menu').first().should('exist');

    cy.get('[data-testid="collection-autocomplete-result"]').first().click();

    cy.get('[data-testid="workidstoadd-hidden"]').first().should('exist');

    cy.get('#anthology-form-actions-footer-submit').click();

    cy.url().should('include', 'anthologies');

    cy.get('[data-testid="works-container"]').should('exist');

    cy.get('[data-testid="anthology-work"]').should('exist');

    cy.get('[data-testid="anthology-summary"]').invoke("text").should("contain", 'hello world (anthology)')

  })

  it('edits an existing anthology', () => {
    cy.login(Cypress.env('smokeTestUserOne'), Cypress.env('smokeTestUserOnePassword'));

    cy.get('#nav-username').click();

    cy.get('#nav-creations-li').click();

    cy.get('#anthologies-tab').click();

    cy.get('[data-testid="anthology-tile-title"]').first().click();

    cy.get('#anthology-edit-link').should('exist').click();

    cy.get('#anthology-form-title-input').should('be.visible').type('{selectAll}');

    cy.get('#anthology-form-title-input').should('be.visible').type('{backspace}');

    cy.get('#anthology-form-title-input').should('be.visible').type('Edited Anthology Title');

    cy.get('#anthology-form-actions-footer-submit').click();

    cy.url().should('include', 'anthologies');

    cy.get('[data-testid="anthology-tile-title"]').invoke("text").should("equal", 'Edited Anthology Title');

  });
})