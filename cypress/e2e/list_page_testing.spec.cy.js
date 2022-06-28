/* Проверьте, что если в инпуте пусто, то кнопка добавления недоступна, кнопки добавления по индексу и удаления по индексу недоступны тоже.
Проверьте корректность:
отрисовки дефолтного списка.
добавления элемента в head.
добавления элемента в tail.
добавления элемента по индексу.
удаления элемента из head.
удаления элемента из tail.
удаления элемента по индексу. */

describe('Проверка работы добавления/удаления элементов из очереди', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/list')
    });

    it('Кнопка добавления/добавления по индексу/удалению по индексу в состоянии disabled если инпут пустой', () => {
        cy.get('input').eq(0).clear();
        cy.get('button').eq(1).should('be.disabled');
        cy.get('button').eq(2).should('be.disabled');

        cy.get('input').eq(1).clear();
        cy.get('button').eq(5).should('be.disabled');
        cy.get('button').eq(6).should('be.disabled');
    });

    it('Проверка отрисовки рандомного массива', () => {
        cy.get('[class*=circles_box]').children('[class*=elements_wrapper]').should('exist');
        cy.get('[class*=circle_content]').eq(0).contains('head');
        cy.get('[class*=circle_content]').last().contains('tail')


        // cy.get('[class*=circles_box]').children().its('length').then(($length) => {

        //cy.get('input').eq(1).type($length - 1)
        // })
    })

    it('Добавление элемента в head выполняется корректно', () => {
        cy.get('input').eq(0).type('8');
        cy.get('button').eq(1).click();
        cy.get('[class*=circle_content]').eq(0).find('[class*=circle_changing]');


    })

})