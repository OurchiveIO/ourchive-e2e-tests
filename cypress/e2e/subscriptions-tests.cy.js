describe('Authenticated User Subscriptions CRUD', () => {

  after(() => {
    cy.destroyTestData(Cypress.env("ourchivePath"), Cypress.env("venvFolder"), Cypress.env("venvCommand"));
  });

  it('logs in and subscribes to a user', () => {
    cy.login(Cypress.env('smokeTestUserOne'), Cypress.env('smokeTestUserOnePassword'));

    cy.get('[data-testid="browse-cards"]').first().click();

    cy.get('[data-testid="work-user-link"]').first().click();

    cy.get('#user-subscribe-link').click();

    cy.get('#user-subscribe').should('be.visible');

    cy.get('#user-subscribe-works-checkbox').check();

    cy.get('#user-subscribe-collections-checkbox').check();

    cy.get('#user-subscribe-series-checkbox').check();

    cy.get('#user-subscribe-submit').click();

    cy.url().should('include', 'username');

     cy.get('#nav-username').click();

    cy.get('#nav-subscriptions-parent').click();

    cy.get('[data-testid="subscribed-user"]').first().should("exist");
    cy.get('[data-testid="subscribed-user-subscriptions"]').first().invoke("text").should("contain", 'Works');
    cy.get('[data-testid="subscribed-user-subscriptions"]').first().invoke("text").should("contain", 'Series');
    cy.get('[data-testid="subscribed-user-subscriptions"]').first().invoke("text").should("contain", 'Collections');
    cy.get('[data-testid="subscribed-user-subscriptions"]').first().invoke("text").should("not.contain", 'Anthologies');
    cy.get('[data-testid="subscribed-user-unsubscribe"]').click();

    cy.get('[data-testid="unsubscribe-work"]').check().should('be.checked');

    cy.get('[data-testid="unsubscribe-work"]').check();

    cy.get('[data-testid="unsubscribe-submit"]').first().click();

    cy.get('[data-testid="subscribed-user-subscriptions"]').first().invoke("text").should("not.contain", 'Works');
    cy.get('[data-testid="subscribed-user-unsubscribe"]').click();
    cy.get('[data-testid="unsubscribe-all"]').check();
    cy.get('[data-testid="unsubscribe-submit"]').first().click();
    cy.get('#user-subscriptions-none-message').should("be.visible");

  });
})