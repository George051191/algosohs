describe('Проверка правильности алгоритма фибоначи', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/fibonacci')
    });

    it('Кнопка в состоянии disabled если инпут пустой', () => {
        cy.get('input').clear();
        cy.get('button').eq(1).should('be.disabled')
    });

    it('Значения из последовательности выводятся по порядку', () => {
        cy.get('input').type('5');
        cy.get('button').eq(1).click();


        const array = [1, 1, 2, 3, 5, 8]
        cy
            .get('[class*=circle_visible]')
            .should('have.length', 1)
            .each((el, index) => {
                cy.wrap(el).contains(array[index])
            })
        cy
            .get('[class*=circle_visible]')
            .should('have.length', 2)
            .each((el, index) => {
                cy.wrap(el).contains(array[index])
            })
        cy
            .get('[class*=circle_visible]')
            .should('have.length', 3)
            .each((el, index) => {
                cy.wrap(el).contains(array[index])
            })
        cy
            .get('[class*=circle_visible]')
            .should('have.length', 4)
            .each((el, index) => {
                cy.wrap(el).contains(array[index])
            })
        cy
            .get('[class*=circle_visible]')
            .should('have.length', 5)
            .each((el, index) => {
                cy.wrap(el).contains(array[index])
            })
        cy
            .get('[class*=circle_visible]')
            .should('have.length', 6)
            .each((el, index) => {
                cy.wrap(el).contains(array[index])
            })



    })

})