import {
  getBubbleSortAscendSteps,
  getSelectSortAscendSteps,
  getBubbleSortDesscendSteps,
  getSelectSortDescendSteps,
} from "./utils";

describe("Сортировка пузырьком по возрастанию корректна", () => {
  it("при пустом массиве", () => {
    const steps = getBubbleSortAscendSteps([]);
    expect(steps[steps.length - 1].arr).toEqual([]);
  });

  it("с одним элементом в массиве", () => {
    const steps = getBubbleSortAscendSteps([1]);
    expect(steps[steps.length - 1].arr).toEqual([1]);
  });

  it("с несколькими элементами в массиве", () => {
    const steps = getBubbleSortAscendSteps([3, 1, 9]);
    expect(steps[steps.length - 1].arr).toEqual([1, 3, 9]);
  });
});

describe("Сортировка пузырьком по убыванию корректна", () => {
  it("при пустом массиве", () => {
    const steps = getBubbleSortDesscendSteps([]);
    expect(steps[steps.length - 1].arr).toEqual([]);
  });

  it("с одним элементом в массиве", () => {
    const steps = getBubbleSortDesscendSteps([1]);
    expect(steps[steps.length - 1].arr).toEqual([1]);
  });

  it("с несколькими элементами в массиве", () => {
    const steps = getBubbleSortDesscendSteps([3, 1, 9]);
    expect(steps[steps.length - 1].arr).toEqual([9, 3, 1]);
  });
});

describe("Сортировка выбором по возрастанию корректна", () => {
  it("при пустом массиве", () => {
    const steps = getSelectSortAscendSteps([]);
    expect(steps[steps.length - 1].arr).toEqual([]);
  });

  it("с одним элементом в массиве", () => {
    const steps = getSelectSortAscendSteps([1]);
    expect(steps[steps.length - 1].arr).toEqual([1]);
  });

  it("с несколькими элементами в массиве", () => {
    const steps = getSelectSortAscendSteps([3, 1, 9]);
    expect(steps[steps.length - 1].arr).toEqual([1, 3, 9]);
  });
});

describe("Сортировка выбором по убыванию корректна", () => {
  it("при пустом массиве", () => {
    const steps = getSelectSortDescendSteps([]);
    expect(steps[steps.length - 1].arr).toEqual([]);
  });

  it("с одним элементом в массиве", () => {
    const steps = getSelectSortDescendSteps([1]);
    expect(steps[steps.length - 1].arr).toEqual([1]);
  });

  it("с несколькими элементами в массиве", () => {
    const steps = getSelectSortDescendSteps([3, 1, 9]);
    expect(steps[steps.length - 1].arr).toEqual([9, 3, 1]);
  });
});
