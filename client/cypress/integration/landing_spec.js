describe('Landing user flows', () => {

  beforeEach(() => {
    cy.loadHome();
  });

  it('The url should be url/', () => {
    cy.url().should('include', '/')
  });

});