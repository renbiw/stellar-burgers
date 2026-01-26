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
      cy.contains('Биокотлета').click();

      cy.contains('Детали ингредиента').should('be.visible');
      cy.contains('Биокотлета').should('be.visible');
    });

    it('закрывается по клику на крестик', () => {
      cy.contains('Биокотлета').click();

      cy.contains('Детали ингредиента')
        .closest('div') // модальное окно
        .within(() => {
          cy.get('button').first().click();
        });

      cy.contains('Детали ингредиента').should('not.exist');
    });

    it('закрывается по клику на оверлей', () => {
      cy.contains('Биокотлета').click();
      cy.contains('Детали ингредиента').should('be.visible');

      // клик по оверлею
      cy.get('body').click(0, 0);

      cy.contains('Детали ингредиента').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
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

      cy.contains('12345').should('exist');

      cy.get('body').type('{esc}');

      cy.contains('Выберите булки').should('exist');
      cy.contains('Выберите начинку').should('exist');
    });
  });
  afterEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
});
