describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('ingredients');

    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    }).as('user');

    cy.intercept('POST', '**/orders', {
      fixture: 'order.json'
    }).as('order');

    cy.visit('http://localhost:4000');
    cy.wait('@ingredients');
  });

  describe('Модальные окна ингредиента', () => {
    it('открывается модальное окно ингредиента', () => {
      cy.contains('[data-cy=ingredient-link]', 'Биокотлета').click();

      cy.get('[data-cy=modal]')
        .contains('Детали ингредиента')
        .should('be.visible');
      cy.get('[data-cy=modal]').contains('Биокотлета').should('exist');
    });

    it('закрывается по клику на крестик', () => {
      cy.contains('[data-cy=ingredient-link]', 'Биокотлета').click();

      cy.get('[data-cy=modal]').within(() => {
        cy.contains('Детали ингредиента').should('be.visible');
        // клик по кнопке
        cy.get('button').first().click();
      });

      cy.get('[data-cy=modal]').should('not.exist');
    });

    it('закрывается по клику на оверлей', () => {
      cy.contains('[data-cy=ingredient-link]', 'Биокотлета').click();
      cy.get('[data-cy=modal]').should('exist');
      // клик по оверлею
      cy.get('body').click(0, 0);

      cy.get('[data-cy=modal]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('добавление ингредиента в конструктор', () => {
      cy.contains('булка')
        .parents('li')
        .contains('Добавить')
        .click({ force: true });

      cy.contains('Биокотлета')
        .parents('li')
        .contains('Добавить')
        .click({ force: true });

      cy.get('[data-cy=burger-constructor]').within(() => {
        cy.contains('Биокотлета').should('exist');
      });
    });
    it('оформление заказа', () => {
      cy.contains('булка')
        .parents('li')
        .contains('Добавить')
        .click({ force: true });

      cy.contains('Биокотлета')
        .parents('li')
        .contains('Добавить')
        .click({ force: true });

      cy.contains('Оформить заказ').click({ force: true });

      cy.wait('@order');

      cy.get('[data-cy=modal]').contains('12345').should('exist');

      cy.get('body').type('{esc}');

      cy.get('[data-cy=burger-constructor]')
        .contains('Выберите булки')
        .should('exist');
      cy.get('[data-cy=burger-constructor]')
        .contains('Выберите начинку')
        .should('exist');
    });
  });
  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
