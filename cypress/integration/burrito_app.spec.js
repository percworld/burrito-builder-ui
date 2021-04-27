import OrderForm from "../../src/components/OrderForm/OrderForm"

describe('Dashboard view', () => {
    beforeEach(() => {
        cy.intercept('http://localhost:3001/api/v1/orders', { fixture: 'orders.json' })
        cy.intercept({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            url: 'http://localhost:3001/api/v1/orders'
        }, { fixture: 'order.json' })
    })

    it('Should display a landing page for current burrito orders', () => {
        cy.visit('http://localhost:3000/')
            .get('h1').contains('Burrito Builder')
            .get('section[data-cy="orders"]').should('have.length', 1)

    })

    it('Should make a reservation for a user', () => {
        cy.visit('http://localhost:3000/')
            .get('input[data-cy="name"]').type('Phil')
            .get('button').first().click()
        cy.get('button[data-cy="submit"]').click()
    })
})