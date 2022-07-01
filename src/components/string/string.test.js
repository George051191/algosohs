import { reverseStarting } from "./utils";

describe("Корректный разворот строки", () => {
  it("Разворот строки с четным кол. символов и отправка в стейт проходят успешно", async () => {
    const mockFn = jest.fn();
    await reverseStarting(
      "рога",
      () => {},
      () => {},
      () => {},
      () => {},
      mockFn,
      () => {},
      () => {}
    );
    expect(mockFn).toHaveBeenCalledWith("агор");
  });

  it("Разворот строки с нечетным кол. символов и отправка в стейт проходят успешно", async () => {
    const mockFn = jest.fn();
    await reverseStarting(
      "три",
      () => {},
      () => {},
      () => {},
      () => {},
      mockFn,
      () => {},
      () => {}
    );
    expect(mockFn).toHaveBeenCalledWith("ирт");
  });

  it("Разворот строки с одним символов и отправка в стейт проходят успешно", async () => {
    const mockFn = jest.fn();
    await reverseStarting(
      "t",
      () => {},
      () => {},
      () => {},
      () => {},
      mockFn,
      () => {},
      () => {}
    );
    expect(mockFn).toHaveBeenCalledWith("t");
  });

  it("Разворот пустой строки и отправка в стейт проходят успешно", async () => {
    const mockFn = jest.fn();
    await reverseStarting(
      " ",
      () => {},
      () => {},
      () => {},
      () => {},
      mockFn,
      () => {},
      () => {}
    );
    expect(mockFn).toHaveBeenCalledWith(" ");
  });
});
