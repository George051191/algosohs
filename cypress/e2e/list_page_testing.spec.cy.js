/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable testing-library/await-async-utils */

describe("Проверка работы добавления/удаления элементов из списка", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
  });

  it("Кнопка добавления/добавления по индексу/удалению по индексу в состоянии disabled если инпут пустой", () => {
    cy.get("input").eq(0).clear();
    cy.get("button").eq(1).should("be.disabled");
    cy.get("button").eq(2).should("be.disabled");

    cy.get("input").eq(1).clear();
    cy.get("button").eq(5).should("be.disabled");
    cy.get("button").eq(6).should("be.disabled");
  });

  it("Проверка отрисовки рандомного массива", () => {
    cy.get("[class*=circles_box]")
      .children("[class*=elements_wrapper]")
      .should("exist");
    cy.get("[class*=circle_content]").each((el) => {
      cy.wrap(el)
        .find("[class*=letter]")
        .contains(/\d{1,4}/);
    });
    cy.get("[class*=circle_content]").eq(0).contains("head");
    cy.get("[class*=circle_content]").last().contains("tail");
  });

  it("Добавление элемента в head выполняется корректно", () => {
    cy.get("input").eq(0).type("8");
    cy.get("button").eq(1).click();
    cy.get("[class*=circle_content]").eq(0).find("[class*=circle_changing]");

    cy.wait(1000);
    cy.get("[class*=circle_content]")
      .eq(0)
      .find("[class*=circle_modified]")
      .contains("8");
    cy.get("[class*=circle_content]").eq(0).contains("head").should("exist");
    cy.wait(1000);
    cy.get("[class*=circle_content]")
      .eq(0)
      .find("[class*=circle_default]")
      .contains("8");
  });

  it("Добавление элемента в tail выполняется корректно", () => {
    cy.get("input").eq(0).type("8");
    cy.get("button").eq(2).click();

    cy.get("[class*=circles_box]")
      .children()
      .its("length")
      .then(($length) => {
        cy.get("[class*=circle_content]")
          .eq($length - 1)
          .find("[class*=circle_changing]");
        cy.wait(1000);
        cy.get("[class*=circle_content]")
          .eq($length)
          .find("[class*=circle_modified]")
          .contains("8");
        cy.get("[class*=circle_content]")
          .eq($length)
          .contains("tail")
          .should("exist");
        cy.wait(1000);
        cy.get("[class*=circle_content]")
          .eq($length)
          .find("[class*=circle_default]")
          .contains("8");
      });
  });

  it("Добавление элемента по индексу выполняется корректно", () => {
    cy.get("[class*=circles_box]")
      .children()
      .its("length")
      .then(($length) => {
        cy.get("input")
          .eq(1)
          .type($length - 3);
        cy.get("input").eq(0).type("8");
        cy.get("button").eq(5).click();

        for (let i = 0; i <= $length - 3; i++) {
          cy.get("[class*=circle_content]")
            .eq(i)
            .find("[class*=circle_changing]")
            .should("have.length", 2);
          cy.wait(500);
          if (i === $length - 3) {
            cy.get("[class*=circle_content]")
              .eq(i)
              .find("[class*=circle_changing]")
              .should("have.length", 2);
            cy.wait(500);
            cy.get("[class*=circle_content]")
              .eq(i)
              .find("[class*=circle_modified]")
              .contains("8");
          }
        }
        cy.wait(1000);

        cy.get("[class*=circle_content]").each((el) => {
          cy.wrap(el).find("[class*=circle_default]");
        });
      });
  });

  it("Удаление элемента по индексу выполняется корректно", () => {
    cy.get("[class*=circles_box]")
      .children()
      .its("length")
      .then(($length) => {
        cy.get("input")
          .eq(1)
          .type($length - 3);
        cy.get("button").eq(6).click();

        for (let i = 0; i <= $length - 3; i++) {
          cy.get("[class*=circle_content]")
            .eq(i)
            .find("[class*=circle_changing]");
          cy.wait(500);
          if (i === $length - 3) {
            cy.wait(1500);
            cy.get("[class*=circle_content]")
              .eq(i)
              .find("[class*=circle_changing]")
              .should("have.length", 2);
            cy.get("[class*=circle_content]")
              .eq(i)
              .find("[class*=circle_changing]")
              .eq(0)
              .should("not.have.value", /\d{1,4}/);
            cy.get("[class*=circle_content]")
              .eq(i)
              .find("[class*=small]")
              .contains(/\d{1,4}/);
            cy.wait(500);
            cy.get("[class*=circle_content]").should(
              "have.length",
              $length - 1
            );
          }
        }
        cy.get("[class*=circle_content]").each((el) => {
          cy.wrap(el).find("[class*=circle_default]");
        });
      });
  });

  it("Удаление элемента из head", () => {
    cy.get("[class*=circles_box]")
      .children()
      .its("length")
      .then(($length) => {
        cy.get("button").eq(3).click();
        cy.get("[class*=circle_content]")
          .eq(0)
          .should("not.have.value", /\d{1,4}/);
        cy.get("[class*=circle_content]")
          .eq(0)
          .find("[class*=circle_changing]")
          .contains(/\d{1,4}/);
        cy.wait(500);
        cy.get("[class*=circle_content]")
          .eq(0)
          .find("[class*=circle_changing]")
          .contains(/\d{1,4}/)
          .should("not.exist");
        cy.get("[class*=circle_content]").should("have.length", $length - 1);
      });
  });

  it("Удаление элемента из tail", () => {
    cy.get("[class*=circles_box]")
      .children()
      .its("length")
      .then(($length) => {
        cy.get("button").eq(4).click();
        cy.get("[class*=circle_content]")
          .eq($length - 1)
          .should("not.have.value", /\d{1,4}/);
        cy.get("[class*=circle_content]")
          .eq($length - 1)
          .find("[class*=circle_changing]")
          .contains(/\d{1,4}/);
        cy.wait(500);
        cy.get("[class*=circle_content]")
          .eq($length - 1)
          .find("[class*=circle_changing]")
          .contains(/\d{1,4}/)
          .should("not.exist");
        cy.get("[class*=circle_content]").should("have.length", $length - 1);
      });
  });
});
