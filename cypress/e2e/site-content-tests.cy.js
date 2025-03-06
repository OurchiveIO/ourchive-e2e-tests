describe('Site content tests', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  it('visits the homepage and browses news posts', () => {

    cy.get('#news-see-more').click()

    cy.url().should('include', 'news')

    cy.get('[data-testid="news-metadata-updated"]').first().should("exi" +
        "st")

    cy.get('[data-testid="news-item-tile-link"]').first().click()

    cy.url().should('include', 'news/')

    cy.get('#news-tile-header-content').should('exist')

  })
})