describe("Роутинг работает корректно", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("Открылась главная страница по умолчанию", () => {
    cy.contains("МБОУ АЛГОСОШ");
    cy.location("pathname").should("eq", `/`);
    cy.get("a").should("have.length", "6");
  });
  it("Переходы на все страницы работают корректно", () => {
    const pages = [
      "recursion",
      "fibonacci",
      "sorting",
      "stack",
      "queue",
      "list",
    ];
    pages.forEach((page) => {
      cy.get(`a[href*=${page}]`).click();
      cy.location("pathname").should("eq", `/${page}`);
      cy.go("back");
    });
  });
});
