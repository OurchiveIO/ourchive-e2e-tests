describe('Authenticated User Bookmarks CRUD', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  after(() => {
    cy.destroyTestData(Cypress.env("ourchivePath"), Cypress.env("venvFolder"), Cypress.env("venvCommand"));
  });

  it('logs in and creates a new bookmark', () => {
    cy.login(Cypress.env('smokeTestUserOne'), Cypress.env('smokeTestUserOnePassword'));

    cy.get('[data-testid="browse-cards"]').first().click();

    cy.get('[data-testid="work-tile-title"]').first().click();

    cy.get('#work-bookmark-link').click();

    cy.get('#bookmark-form-title-input').should('be.visible').type('{backspace}');

    cy.get('#bookmark-form-title-input').should('be.visible').type('Bookmark Title');

    cy.get('iframe#descriptionEditor_ifr').then(($iframe) => {
        let doc = $iframe.contents().find("body#tinymce");
        cy.wrap(doc).find("p").first().type("I liked this chive!");
        cy.wrap(doc).should("have.text", "I liked this chive!");
    });

    cy.get('#bookmark-form-actions-footer-submit').click();

    cy.url().should('include', 'bookmarks');

    cy.get('[data-testid="bookmark-description"]').should('exist');

    cy.get('[data-testid="bookmark-description"]').invoke("text").should("contain", 'I liked this chive!');

    cy.get('[data-testid="bookmark-tile-title"]').invoke("text").should("contain", 'Bookmark Title');

  })

  it('edits an existing bookmark', () => {
    cy.login(Cypress.env('smokeTestUserOne'), Cypress.env('smokeTestUserOnePassword'));

    cy.get('#nav-username').click();

    cy.get('#nav-creations-li').click();

    cy.get('#bookmarks-tab').click();

    cy.get('[data-testid="edit-bookmark"]').first().click();

    cy.get('#bookmark-form-title-input').should('be.visible').type('{selectAll}');

    cy.get('#bookmark-form-title-input').should('be.visible').type('{backspace}');

    cy.get('#bookmark-form-title-input').should('be.visible').type('Edited Bookmark Title');

    cy.get('#bookmark-form-actions-footer-submit').click();

    cy.url().should('include', 'bookmarks');

    cy.get('[data-testid="bookmark-tile-title"]').invoke("text").should("contain", 'Edited Bookmark Title');

  });
})