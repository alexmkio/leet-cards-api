Cypress.Commands.add('loadHome', () => {
  cy.intercept('GET', 'https://leet-cards.herokuapp.com/cards', 
      { statusCode: 200, fixture: 'cards.json' })
    .visit('http://localhost:3000')
});