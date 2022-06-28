/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable testing-library/await-async-utils */

describe('Проверка работы добавления/удаления элементов из стека', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/stack')
    });

    it('Кнопка добавления в состоянии disabled если инпут пустой', () => {
        cy.get('input').clear();
        cy.get('button').eq(1).should('be.disabled')
    });

    it('Добавление элемента выполняется корректно', () => {
        cy.get('input').type('1');
        cy.get('button').eq(1).click();
        const numbers = [1, 3, 5, 7]

        cy
            .get('[class*=circle_content]')
            .should('have.length', 1)
            .each((el, index) => {
                cy.wrap(el).contains(numbers[index])

            })

        cy.get('[class*=circle_content]').eq(0).find('[class*=circle_changing]');
        cy.wait(1000)
        cy.get('[class*=circle_content]').eq(0).find('[class*=circle_default]');

        cy.get('input').type('3');
        cy.get('button').eq(1).click();

        cy
            .get('[class*=circle_content]')
            .should('have.length', 2)
            .each((el, index) => {
                cy.wrap(el).contains(numbers[index])

            })
        cy.get('[class*=circle_content]').eq(1).find('[class*=circle_changing]');
        cy.wait(1000)
        cy.get('[class*=circle_content]').eq(1).find('[class*=circle_default]');

        cy.get('input').type('5');
        cy.get('button').eq(1).click();

        cy
            .get('[class*=circle_content]')
            .should('have.length', 3)
            .each((el, index) => {
                cy.wrap(el).contains(numbers[index])

            })
        cy.get('[class*=circle_content]').eq(2).find('[class*=circle_changing]');
        cy.wait(1000)
        cy.get('[class*=circle_content]').eq(2).find('[class*=circle_default]');

        cy.get('input').type('7');
        cy.get('button').eq(1).click();

        cy
            .get('[class*=circle_content]')
            .should('have.length', 4)
            .each((el, index) => {
                cy.wrap(el).contains(numbers[index])

            })
        cy.get('[class*=circle_content]').eq(3).find('[class*=circle_changing]');
        cy.wait(1000)
        cy.get('[class*=circle_content]').eq(3).find('[class*=circle_default]');
    })

    it('Элемент удаляется корректно', () => {
        cy.get('input').type('7');
        cy.get('button').eq(1).click();
        cy.get('button').eq(2).click();

        cy.get('[class*=circle_content]').eq(0).find('[class*=circle_changing]');
        cy.wait(1000);
        cy.get('[class*=circle_content]').should('not.exist');

    })

    it('Кнопка очистить удаляет все элементы стека', () => {
        cy.get('input').type('7');
        cy.get('button').eq(1).click();
        cy.wait(1000)
        cy.get('input').type('8');
        cy.get('button').eq(1).click();
        cy.wait(1000)
        cy.get('input').type('9');
        cy.get('button').eq(1).click();
        cy.wait(1000)
        cy.get('button').eq(3).click();
        cy.get('[class*=circle_content]').should('not.exist');

    })


})