/// <reference types="cypress" />

describe('Main page E2E', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have search input', () => {
    cy.get('input').should('have.value', '');
  });

  it('should have movie cards', () => {
    cy.get('[data-testid="cards-container"]').should('have.length', 1);
    cy.get('[data-testid="movie-card"]').should('have.length', 20);
  });

  it('should open modal with details', () => {
    cy.get('[data-testid="movie-title"]').first().should('have.text', 'The Godfather').click();
    cy.wait(500);

    cy.get('[data-testid="movie-budget"]').should('have.text', 'Budget: 6000000$');
    cy.wait(500);
  });
});

describe('Form page E2E', () => {
  beforeEach(() => {
    cy.visit('/forms');
  });

  it('should have form', () => {
    cy.get('[data-testid="form"]').should('have.length', 1);
  });

  it('should have inputs', () => {
    cy.get('input').should('have.length', 7);
  });

  it('should fill in and submit form', () => {
    cy.get('input[type=text]').type('React').should('have.value', 'React');
    cy.wait(100);
    cy.get('input[type=date]').type('2020-01-01').should('have.value', '2020-01-01');
    cy.wait(100);
    cy.get('input[type=radio]').should('have.value', 'Functions').check();
    cy.wait(100);
    cy.get('input[type=file]').selectFile('cypress/fixtures/react.png');
    cy.wait(100);
    cy.get('input[type=checkbox]').check();
    cy.wait(100);
    cy.get('select').select('Angular').should('have.value', 'Angular');
    cy.wait(100);
    cy.get('input[type=submit]').click();
    cy.get('[data-testid="popup"]').should('have.text', 'CARD HAS BEEN CREATED');
  });
});

describe('About page E2E', () => {
  it('should have text', () => {
    cy.visit('/about');
    cy.get('h5').should('have.text', 'OUR PRINCIPLES').end();
  });

  it('should set pause, user can stop running tests now', () => {
    cy.pause();
  });
});
