describe('Authenticated User Works CRUD', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('logs in and creates a new work', () => {
    cy.login(Cypress.env('smokeTestUsername'), Cypress.env('smokeTestPassword'))

    cy.get('#nav-username').click()

    cy.get('#nav-new-work-li').click()

    cy.get('#work-form-title-input').should('be.visible').type('{selectAll}')

    cy.get('#work-form-title-input').should('be.visible').type('{backspace}')

    cy.get('#work-form-title-input').should('be.visible').type('Work Title')

    cy.get('#work-form-type-select').select('Fic')

    //cy.url().should('include', '/search/?work_type')

    //cy.get('[data-testid="works-tab"]').invoke("text").should("contain", "Works")

    //cy.get('[data-testid="ourchive-logo-link"]').click()



    //cy.get('[data-testid="navbar-search-submit"]').should('be.visible').click({force: true})

  })
})