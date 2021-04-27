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
            .get('section[data-cy="orders"]').children().should('have.class', 'order')
        cy.get('section[data-cy="orders"]').first().first().contains('Jenny')
    })

    it('Should make a reservation for a user', () => {
        cy.visit('http://localhost:3000/')
            .get('input[data-cy="name"]').type('Phil')
            .get('button[name="beans"]').click()
            .get('button[name="lettuce"]').click()
            .get('button[name="guacamole"]').click()
        cy.get('button[data-cy="submit"]').click()
        cy.get('section[data-cy="orders"]').last().first().contains('Phil')
    })

    it('Should display an error if name is not submitted', () => {
        cy.visit('http://localhost:3000/')
            .get('input[data-cy="name"]').type('Phil')
        cy.get('button[data-cy="submit"]').click()
        cy.get('p[data-cy="error"]').contains('Please enter a name for the new order and at least one ingredient')
    })

    it('Should display an error if an ingredient is not submitted', () => {
        cy.visit('http://localhost:3000/')
            .get('button[name="beans"]').click()
        cy.get('button[data-cy="submit"]').click()
        cy.get('p[data-cy="error"]').contains('Please enter a name for the new order and at least one ingredient')
    })

    it('Should display a new Order when submitted', () => {
        cy.visit('http://localhost:3000/')
            .get('input[data-cy="name"]').type('Phil')
            .get('button[name="beans"]').click()
            .get('button[name="lettuce"]').click()
            .get('button[name="guacamole"]').click()
        cy.get('button[data-cy="submit"]').click()
        cy.get('section[data-cy="orders"]').last().last().contains('cilantro')
    })
})