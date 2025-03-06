describe('Authenticated User Profile Edit', () => {

  it('logs in and edits profile', () => {
    cy.login(Cypress.env('smokeTestUserOne'), Cypress.env('smokeTestUserOnePassword'));

    cy.get('#nav-username').click();

    cy.get('#nav-creations-li').click();

    cy.get('#user-profile-edit-link').click();

    cy.get('iframe#profileEditor_ifr').then(($iframe) => {
        let doc = $iframe.contents().find("body#tinymce");
        cy.wrap(doc).find("p").first().type('{selectAll}');
        cy.wrap(doc).find("p").first().type('{backspace}');
        cy.wrap(doc).find("p").first().type("I am a very powerful Ourchive user!");
        cy.wrap(doc).should("have.text", "I am a very powerful Ourchive user!");
    });

    cy.get('#profile-collapse-audio-checkbox').check();

    cy.get('#user-form-btn-submit').click();

    cy.url().should('include', 'username');

    cy.get('#user-profile-text-span').should('exist');

    cy.get('#user-profile-text-span').invoke("text").should("contain", 'I am a very powerful Ourchive user!');

    cy.get('#user-profile-edit-link').click();

    cy.get('#profile-collapse-audio-checkbox').check().should('be.checked');

  });
})