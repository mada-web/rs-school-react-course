/// <reference types="cypress" />

describe('Main page E2E', () => {
  it('should open modal with details', () => {
    cy.visit('/');

    cy.get('input').should('have.value', '');
    cy.wait(500);

    cy.get('[data-testid="cards-container"]').should('have.length', 1);
    cy.get('[data-testid="movie-card"]').should('have.length', 20);
    cy.wait(1000);

    cy.get('[data-testid="movie-title"]').first().should('have.text', 'The Godfather').click();
    cy.wait(1000);

    cy.get('[data-testid="movie-budget"]').should('have.text', 'Budget: 6000000$');
    cy.wait(500);
  });
});

describe('Form page E2E', () => {
  it('should fill in and submit form', () => {
    cy.visit('/forms');

    cy.get('[data-testid="form"]').should('have.length', 1);

    cy.get('input').should('have.length', 7);
    cy.wait(500);

    cy.get('input[type=text]').type('React').should('have.value', 'React');
    cy.wait(200);

    cy.get('input[type=date]').type('2020-01-01').should('have.value', '2020-01-01');
    cy.wait(200);

    cy.get('input[type=radio]').should('have.value', 'Functions').check();
    cy.wait(200);

    cy.get('input[type=file]').selectFile('cypress/fixtures/react.png');
    cy.wait(200);

    cy.get('input[type=checkbox]').check();
    cy.wait(200);

    cy.get('select').select('Angular').should('have.value', 'Angular');
    cy.wait(200);

    cy.get('input[type=submit]').click();
    cy.get('[data-testid="popup"]').should('have.text', 'CARD HAS BEEN CREATED');
  });
});

describe('About page E2E', () => {
  it('should have text on the page', () => {
    cy.visit('/about');

    cy.get('h5').should('have.text', 'OUR PRINCIPLES');
    cy.wait(2000);

    cy.go('back');
  });
});
