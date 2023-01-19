// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const token = "27863c081527040c8c1be5739d4aa0e6f630a32b2d901d2edfaa8ad528f38368"

Cypress.Commands.add('createNewUser', () => {
    cy.fixture("UserApi").then((user) => {
        cy.request({
            method: "POST",
            url: `${Cypress.env('apiUrl')}/public/v1/users`,
            headers: {
                'Authorization': 'Bearer '+ token
            },
            // failOnStatusCode: false,
            body: {
                "name": user.name,
                "email": user.email,
                "gender": user.gender,
                "status": user.status
            }
        }).then((Response) => {
            expect(Response.status).eq(201)
            expect(Response.body.data).to.have.property('name', user.name)
            expect(Response.body.data).to.have.property('email', user.email)
            expect(Response.body.data).to.have.property('gender', user.gender)
            expect(Response.body.data).to.have.property('status', user.status)
            // expect(response.body.name).to.eq(user.name)
            // expect(response.body.email).to.eq(user.email)
            // expect(response.body.gender).to.eq(user.gender)
            // expect(response.body.status).to.eq(user.status)
        })
    })
})