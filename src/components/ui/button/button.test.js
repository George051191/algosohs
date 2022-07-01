import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Button } from "./button";

describe("Кнопка рендерится без ошибок", () => {
  it("Рендер кнопки с текстом", () => {
    const tree = renderer.create(<Button text="test text" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Рендер кнопки без текста", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Рендер заблокированной кнопки", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Рендер кнопки с индикацией загрузки", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Проверка работы кнопки", () => {
  it("Нажатие на кнопку вызывает колбек", () => {
    window.alert = jest.fn();
    render(<Button text="кнопка" onClick={() => alert("Работает!")} />);
    const button = screen.getByText("кнопка");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith("Работает!");
  });
});
