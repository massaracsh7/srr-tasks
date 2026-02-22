describe('User e2e scenarios', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  const loginViaUi = (email: string) => {
    cy.visit('/login');
    cy.contains('label', 'Email').parent().find('input').clear().type(email);
    cy.get('.login-form').contains('button', 'Login').click();
    cy.location('pathname').should('eq', '/');
  };

  const authAs = (email: string) => {
    loginViaUi(email);
    cy.visit('/');
    cy.get('app-header').should('exist');
  };

  it('guest can open catalog and navigate to login from header', () => {
    cy.visit('/');
    cy.contains('h2, h1, h3', 'Course catalog').should('be.visible');

    cy.contains('button', 'Login').click();
    cy.location('pathname').should('eq', '/login');
  });

  it('guest is redirected to login from protected routes', () => {
    cy.visit('/profile');
    cy.location('pathname').should('eq', '/login');

    cy.visit('/course/1/1');
    cy.location('pathname').should('eq', '/login');

    cy.visit('/create-course');
    cy.location('pathname').should('eq', '/login');
  });

  it('login shows error for unknown user', () => {
    cy.visit('/login');
    cy.contains('label', 'Email').parent().find('input').clear().type('unknown@example.com');
    cy.get('.login-form').contains('button', 'Login').click();

    cy.location('pathname').should('eq', '/login');
    cy.get('p-message, .p-message').should('be.visible');
  });

  it('student can login, open profile and logout', () => {
    loginViaUi('ivan@example.com');

    cy.contains('button', 'Profile').click();
    cy.location('pathname').should('eq', '/profile');
    cy.contains('ivan@example.com').should('be.visible');

    cy.contains('button', 'Logout').click();
    cy.location('pathname').should('eq', '/login');
    cy.contains('button', 'Login').should('be.visible');
  });

  it('student can open course details and navigate lessons', () => {
    authAs('ivan@example.com');

    cy.get('app-course-card').first().contains('button', 'Toggle Card').click();
    cy.get('app-course-card').first().contains('button', 'More info').click();

    cy.location('pathname').should('eq', '/course/1');
    cy.contains('Angular 20 Basics').should('be.visible');

    cy.contains('a', 'Components').click();
    cy.location('pathname').should('eq', '/course/1/1');
    cy.get('.lesson-container').should('be.visible');

    cy.get('.lesson-buttons .p-button-success').click();
    cy.location('pathname').should('eq', '/course/1/2');

    cy.get('.lesson-buttons .p-button-outlined').click();
    cy.location('pathname').should('eq', '/course/1');
  });

  it('student sees access denied on course creation', () => {
    authAs('ivan@example.com');

    cy.contains('button', 'Create course').click();
    cy.location('pathname').should('eq', '/create-course');
    cy.get('form').should('not.exist');
    cy.get('#title').should('not.exist');
  });

  it('guest can filter courses by category', () => {
    cy.visit('/');
    cy.get('app-course-card').should('have.length', 2);

    cy.get('.filters p-select').first().click();
    cy.contains('[role="option"]', 'Frontend').click();

    cy.get('app-course-card').should('have.length', 1);
    cy.contains('Angular 20 Basics').should('be.visible');
    cy.contains('Advanced TypeScript').should('not.exist');
  });

  it('student can switch profile language to RU', () => {
    authAs('ivan@example.com');

    cy.contains('button', 'Profile').click();
    cy.location('pathname').should('eq', '/profile');

    cy.get('select').select('RU');
    cy.get('select').should('have.value', 'RU');
    cy.get('label').should('be.visible');
  });

  it('student cannot go to next lesson from last lesson', () => {
    authAs('ivan@example.com');

    cy.get('app-course-card').first().contains('button', 'Toggle Card').click();
    cy.get('app-course-card').first().contains('button', 'More info').click();
    cy.contains('a', 'Signals').click();

    cy.get('.lesson-buttons .p-button-success').should('be.disabled');
  });

  it('teacher can open course creation and submit valid form', () => {
    authAs('anna@example.com');

    cy.contains('button', 'Create course').click();
    cy.location('pathname').should('eq', '/create-course');
    cy.get('#title').should('be.visible');
    cy.get('#description').should('be.visible');

    cy.get('form').contains('button', 'Save').should('be.disabled');

    cy.on('window:alert', () => false);

    cy.get('#title').type('E2E Course');
    cy.get('#description').type('Created in e2e test');
    cy.get('#goals').type('Goal 1, Goal 2');
    cy.get('#lessons').type('Lesson 1, Lesson 2');

    cy.get('form').contains('button', 'Save').should('not.be.disabled').click();

    cy.get('#title').should('have.value', '');
    cy.get('#description').should('have.value', '');
  });

  it('unknown route opens 404 page and allows return to home', () => {
    cy.visit('/this-route-does-not-exist');
    cy.get('app-not-found').should('exist');
    cy.get('app-not-found h1').should('be.visible');

    cy.get('app-not-found button').click();
    cy.location('pathname').should('eq', '/');
  });
});
