describe('Dashboard view', () => {
    it('Should display a landing page for current burrito orders', () => {
        cy.visit('http://localhost:3000/')
            .get('h1')

    })
})