describe('Authenticated User Collections CRUD', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('logs in and creates a new collection', () => {
    cy.login(Cypress.env('smokeTestUserOne'), Cypress.env('smokeTestUserOnePassword'));

    cy.get('#nav-username').click();

    cy.get('#nav-new-collection-li').click();

    cy.get('#bkcol-form-title-input').should('be.visible').type('{selectAll}');

    cy.get('#bkcol-form-title-input').should('be.visible').type('{backspace}');

    cy.get('#bkcol-form-title-input').should('be.visible').type('Collection Title');

    cy.get('#bkcol-form-short-desc-input').should('be.visible').type('This is a collection description. It shows on the tile.');

    cy.get('iframe#descriptionEditor_ifr').then(($iframe) => {
        let doc = $iframe.contents().find("body#tinymce");
        cy.wrap(doc).find("p").first().type("hello world");
        cy.wrap(doc).should("have.text", "hello world");
    });

    cy.get('#bookmark_entry').type('the');

    cy.get('.dropdown-menu').first().should('exist');

    cy.get('[data-testid="collection-autocomplete-result"]').first().click();

    cy.get('[data-testid="workidstoadd"]').first().should('exist');

    cy.get('#bkcol-form-actions-footer-submit').click();

    cy.url().should('include', 'bookmark-collections');

    cy.get('#bkcol-slideshow-parent').should('exist');

    cy.get('[data-testid="collection-work"]').should('exist');

    cy.get('[data-testid="collection-tile-short-desc"]').invoke("text").should("contain", 'This is a collection description. It shows on the tile.')

    cy.destroyTestData(Cypress.env("ourchivePath"), Cypress.env("venvFolder"), Cypress.env("venvCommand"));

  })

  it('edits an existing collection', () => {
    cy.login(Cypress.env('smokeTestUserOne'), Cypress.env('smokeTestUserOnePassword'));

    cy.get('#nav-username').click();

    cy.get('#nav-creations-li').click();

    cy.get('#collections-tab').click();

    cy.get('[data-testid="collection-tile-title"]').first().click();

    cy.get('#bkcol-edit-link').should('exist').click();

    cy.get('#bkcol-form-title-input').should('be.visible').type('{selectAll}');

    cy.get('#bkcol-form-title-input').should('be.visible').type('{backspace}');

    cy.get('#bkcol-form-title-input').should('be.visible').type('Edited Collection Title');

    cy.get('#bkcol-form-actions-footer-submit').click();

    cy.url().should('include', 'bookmark-collections');

    cy.get('[data-testid="collection-tile-title"]').invoke("text").should("equal", 'Edited Collection Title');

  });
})