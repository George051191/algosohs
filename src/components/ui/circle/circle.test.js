import renderer from "react-test-renderer";
import { Circle } from "./circle";

describe("Circle рендерится правильно", () => {
  it("Рендер без букв", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с буквами", () => {
    const tree = renderer.create(<Circle letter="abcd" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с head", () => {
    const tree = renderer.create(<Circle head="56" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер head с react-элементом", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с tail", () => {
    const tree = renderer.create(<Circle tail="123" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с react-элементом в tail", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с index", () => {
    const tree = renderer.create(<Circle index="5" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с пропсом isSamll", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с состоянием default", () => {
    const tree = renderer.create(<Circle state={"default"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с состоянием changing", () => {
    const tree = renderer.create(<Circle state={"changing"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Рендер с состоянием modified", () => {
    const tree = renderer.create(<Circle state={"modified"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
