describe('Validate Header', () => {
    it('Successfully validate content-type', () => {
        cy.fixture("pokeapi")
            .request({
                method: "GET",
                url: 'https://pokeapi.co/api/v2/pokemon/ditto',
            }).as('pokemon')
            .then((response) => {
                expect(response.body.abilities[0].ability.name).to.eq('limber')
                cy.log(JSON.stringify(response.body))
            })
            cy.get('@pokemon').its('headers').its('content-type')
                .should('include', 'application/json; charset=utf-8')
            cy.get('@pokemon').its('status').should('equal', 200)
    })
});