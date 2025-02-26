describe('Authenticated User Works CRUD', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('logs in and creates a new work', () => {
    cy.login(Cypress.env('smokeTestUserOne'), Cypress.env('smokeTestUserOnePassword'));

    cy.get('#nav-username').click();

    cy.get('#nav-new-work-li').click();

    cy.get('#work-form-title-input').should('be.visible').type('{selectAll}');

    cy.get('#work-form-title-input').should('be.visible').type('{backspace}');

    cy.get('#work-form-title-input').should('be.visible').type('Work Title');

    cy.get('#work-form-type-select').select('Fic');

    cy.get('#work_form_new_user').type(Cypress.env('smokeTestUserTwo').substring(0,3));

    cy.get('.ourchive-autocomplete').first().should('exist');

    cy.get('.ourchive-autocomplete').first().invoke("text").should("contain", Cypress.env('smokeTestUserTwo'));

    cy.get('#work-form-complete-checkbox').check();

    cy.get('.choices__input--cloned').first().type('English').type('{enter}');

    cy.get('select#work-form-languages option:selected').should('have.text', 'English');

    cy.get('[data-testid="attribute-check-multi"]').first().click();

    cy.get('[data-testid="attribute-check-single"]').first().click();

    cy.get('[data-testid="tag-select-div"]>.choices>.choices__inner').children('input').first().type(Cypress.env('tagSearchTerm')).type('{enter}');

    cy.get('[data-testid="tag-select"] option:selected').should('contain.text', Cypress.env('tagSearchResult'));

    cy.get('iframe#summaryEditor_ifr').then(($iframe) => {
        let doc = $iframe.contents().find("body#tinymce");
        cy.wrap(doc).find("p").first().type("hello world");
        cy.wrap(doc).should("have.text", "hello world");
    });

    cy.get('iframe#textEditor_ifr').then(($iframe) => {
        let doc = $iframe.contents().find("body#tinymce");
        cy.wrap(doc).find("p").first().type("Chapter Content");
        cy.wrap(doc).should("have.text", "Chapter Content");
    });

    cy.get('#work-form-submit-bottom').click();

    cy.url().should('include', 'works');

    cy.get('#chapter-text').invoke("text").should("contain", "Chapter Content");

    cy.get('[data-testid="tag-type"]').should('exist');

    cy.get('[data-testid="tag-value"]').should('exist');

    cy.get('[data-testid="attribute-type"]').should('exist');

    cy.get('[data-testid="attribute-value"]').should('exist');

    cy.destroyTestData(Cypress.env("ourchivePath"), Cypress.env("venvFolder"), Cypress.env("venvCommand"));

  })

  it('edits an existing work', () => {
    cy.login(Cypress.env('smokeTestUserOne'), Cypress.env('smokeTestUserOnePassword'));

    cy.get('#nav-username').click();

    cy.get('#nav-creations-li').click();

    cy.get('#works-tab').click();

    cy.get('[data-testid="work-tile-title"]').first().click();

    cy.get('#work-edit-link').should('exist').click();

    cy.get('#work-form-title-input').should('be.visible').type('{selectAll}');

    cy.get('#work-form-title-input').should('be.visible').type('{backspace}');

    cy.get('#work-form-title-input').should('be.visible').type('Edited Work Title');

    cy.get('#work-form-submit-bottom').click();

    cy.url().should('include', 'works');

    cy.get('#work-title-link').invoke("text").should("equal", 'Edited Work Title');

  });
})