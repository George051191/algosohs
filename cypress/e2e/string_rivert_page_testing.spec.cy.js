/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable testing-library/await-async-utils */
describe("Проверка правильности алгоритма разворота строки", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
  });

  it("Кнопка в состоянии disabled если инпут пустой", () => {
    cy.get("input").clear();
    cy.get("button").eq(1).should("be.disabled");
  });
  it("Разворот строки и наложение стилей корректно", () => {
    cy.get("input").type("лось");
    cy.get("button").eq(1).click();

    const letters1 = ["л", "о", "с", "ь"];
    const letters2 = ["ь", "о", "с", "л"];
    const letters3 = ["ь", "с", "о", "л"];

    cy.get("[class*=circle_content]")
      .should("have.length", 4)
      .each((el, index) => {
        cy.wrap(el).contains(letters1[index]);
      });

    cy.wait(2000);

    cy.get("[class*=circle_content]")
      .should("have.length", 4)
      .each((el, index) => {
        cy.wrap(el).contains(letters2[index]);
        if (index === 0 || index === 3) {
          cy.wrap(el).find("[class*=circle_changing]");
        }
        if (index === 1 || index === 2) {
          cy.wrap(el).find("[class*=circle_default]");
        }
      });

    cy.wait(3000);

    cy.get("[class*=circle_content]")
      .should("have.length", 4)
      .each((el, index) => {
        cy.wrap(el).contains(letters3[index]);
        if (index === 0 || index === 3) {
          cy.wrap(el).find("[class*=circle_modified]");
        }
        if (index === 1 || index === 2) {
          cy.wrap(el).find("[class*=circle_changing]");
        }
      });

    cy.wait(1000);

    cy.get("[class*=circle_content]")
      .should("have.length", 4)
      .each((el, index) => {
        cy.wrap(el).contains(letters3[index]);
        if (index === 0 || index === 3) {
          cy.wrap(el).find("[class*=circle_modified]");
        }
        if (index === 1 || index === 2) {
          cy.wrap(el).find("[class*=circle_modified]");
        }
      });
  });
});
