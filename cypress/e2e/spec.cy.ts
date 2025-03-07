describe('Popular News UI Tests', () => {
  it('should display news tiles on the page', () => {
    // Visit application page
    cy.visit('http://localhost:3000');

    cy.intercept('GET', 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json*', {
      fixture: 'mockPopularNews.json' // Use a fixture for mock data
    }).as('getPopularNews');

    // Wait for the API call to complete
    cy.wait('@getPopularNews');

    // Check if the news tiles are displayed
    cy.get('[data-testid="news-card"]').should('have.length', 20);
    cy.get('[data-testid="news-card"]')
      .first()
      .should(
        'contain',
        '‘It Was 90-Plus Minutes of Bad Moments’: 9 Opinion Writers on Trump’s Address to Congress'
      );
  });

  it('should handle errors gracefully when the API fails', () => {
    // Simulate an API failure
    cy.intercept('GET', 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json*', {
      statusCode: 500
    }).as('getPopularNewsFailure');

    // Visit the page
    cy.visit('http://localhost:3000');

    // Wait for the error response
    cy.wait('@getPopularNewsFailure');

    // Check that the error message is displayed
    cy.get('[data-testid="news-error"]').should('exist');
  });

  it('should display a news details drawer when a news card is clicked', () => {
    // Visit the page
    cy.visit('http://localhost:3000');

    // Wait for the news data to be loaded
    cy.intercept('GET', 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json*', {
      fixture: 'mockPopularNews.json'
    }).as('getPopularNews');
    cy.wait('@getPopularNews');

    // Click on the first news card
    cy.get('[data-testid="news-card"]').first().click();

    // Check if the drawer is displayed after clicking the news card
    cy.get('[data-testid="drawer"]').should('exist');

    // Click on the close button
    cy.get('[data-testid="drawer-close"]').click();

    // Check if the drawer is closed after clicking the close button
    cy.get('[data-testid="drawer"]').should('not.exist');
  });
});
