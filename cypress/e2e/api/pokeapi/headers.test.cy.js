describe('Automation API with PokeAPI', () => {
    it('Successfully validate content-type', () => {
        cy.fixture("pokeapi").then((user) => {
            cy.request({
                method: "GET",
                url: 'https://pokeapi.co/api/v2/pokemon/ditto',
            }).as('pokemon')
                .then((response) => {
                    expect(response.body.abilities[0].ability.name).to.eq(user.abilities[0].ability.name)
                    cy.log(JSON.stringify(response.body))
                })
            cy.get('@pokemon').its('headers').its('content-type')
                .should('include', 'application/json; charset=utf-8')
            // cy.get('@pokemon').its('status').should('equal', 200)
        })
    })
    it('Successfully validate status code', () => {
        cy.request('https://pokeapi.co/api/v2/pokemon/ditto').as('ditto')
        cy.get('@ditto').its('status').should('equal', 200)
    });

    it('Successfully validate status code with params', () => {
        cy.request({
            method: "GET",
            url: 'https://pokeapi.co/api/v2/pokemon/ditto',
            }).as('ditto2')
        cy.get('@ditto2').its('status').should('equal', 200)
    });

    it('Successfully validate content', () => {
        cy.request('https://pokeapi.co/api/v2/pokemon/bulbasaur').as('bulbasaur')
        cy.get('@bulbasaur').its('body').should('include', {name: 'bulbasaur'})
    });
});