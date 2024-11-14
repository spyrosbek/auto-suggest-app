describe('Search Stories Component', () => {
    it('should suggest options based on user input', () => {
        cy.visit('http://localhost:3000'); // Ensure the app is running

        cy.get('input[placeholder="Type story title..."]').type('test');
        cy.contains('Suggested Option 1').should('be.visible');
    });
});
