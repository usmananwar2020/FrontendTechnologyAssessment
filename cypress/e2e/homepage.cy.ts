describe('Homepage Tests', () => {
    it('should load the homepage', () => {
      cy.visit('/');
      cy.contains('Day').should('be.visible'); // Replace 'Day' with text from your app
    });
  
    it('should navigate to articles', () => {
      cy.get('button').contains('Day').click(); // Replace with your button selector
      cy.url().should('include', '/articles'); // Replace with your route
    });
  });