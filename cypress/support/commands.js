// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  cy.setCookie('accept-cookies', 'true')

  cy.visit('/login')

  cy.get('input[name=username]').type(username)

  // {enter} causes the form to submit
  cy.get('input[name=password]').type(`${password}{enter}`, { log: false })

  // our auth cookie should be present
  cy.getCookie('sessionid').should('exist')

  // UI should reflect this user being logged in
  cy.get('#nav-username').should('exist')
})

Cypress.Commands.add('destroyTestData', (ourchivePath, venvFolder) => {
  cy.exec(`cd ${ourchivePath} && source ${venvFolder}/bin/activate && cd ourchive_app && python manage.py deleteintegrationtestdata --settings=ourchive_app.settings.integration && deactivate`)
})