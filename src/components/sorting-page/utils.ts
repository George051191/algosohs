import { randomNumberCreator } from "../../helpers/random_arr";
import { TStep } from "./types";

export const randomArr = (
  callback: React.Dispatch<React.SetStateAction<number[] | undefined>>
) => {
  let size = randomNumberCreator(17, 3);

  let arr: number[] = [];
  for (let i = 0; i <= size; i++) {
    arr[i] = randomNumberCreator(0, 100);
  }
  let filteredArr = arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });

  callback(filteredArr);
};
////рефакт пузырька
export const getBubbleSortAscendSteps = (array: number[] = []): TStep[] => {
  let copy: number[] = [...array];
  let steps: TStep[] = [];

  for (let j = copy!.length - 1; j >= 0; j--) {
    for (let i = 0; i <= j; i++) {
      let first = i;
      let second = i + 1;
      console.log(i, i + 1);
      steps.push({ type: "select", data: [first, second], arr: [...copy] });

      if (copy[i] > copy[i + 1]) {
        const temp = copy![i];

        copy![i] = copy![i + 1];

        copy![i + 1] = temp;
        steps.push({ type: "swap", data: [first, second], arr: [...copy] });
      }

      steps.push({
        type: "default",
        data: [first, second, second + 1],
        arr: { ...copy },
      });
    }
    steps.push({ type: "end", data: [j], arr: [...copy] });
  }
  return steps;
};

export const getBubbleSortDesscendSteps = (array: number[] = []): TStep[] => {
  let copy: number[] = [...array];
  let steps: TStep[] = [];

  for (let j = copy!.length - 1; j >= 0; j--) {
    for (let i = 0; i <= j; i++) {
      let first = i;
      let second = i + 1;

      steps.push({ type: "select", data: [first, second], arr: [...copy] });

      if (copy[i] < copy[i + 1]) {
        const temp = copy![i];

        copy![i] = copy![i + 1];

        copy![i + 1] = temp;
        steps.push({ type: "swap", data: [first, second], arr: [...copy] });
      }
      steps.push({
        type: "default",
        data: [first, second, second + 1],
        arr: { ...copy },
      });
    }
    steps.push({ type: "end", data: [j], arr: [...copy] });
  }
  return steps;
};

///рефакт выбора
export const getSelectSortAscendSteps = (arr: number[] = []): TStep[] => {
  let copy: number[] = [...arr];
  let steps: TStep[] = [];
  const { length } = copy;
  for (let i = 0; i < length; i++) {
    let ind = i;
    for (let j = i + 1; j < length; j++) {
      steps.push({ type: "select", data: [ind, j], arr: [...copy] });
      if (copy[j] < copy[ind]) {
        const temp = copy[ind];

        copy[ind] = copy[j];

        copy[j] = temp;
        steps.push({ type: "swap", data: [ind, j], arr: [...copy] });
      }
      steps.push({ type: "default_1", data: [i, j, i + 1], arr: { ...copy } });
    }
    steps.push({ type: "end", data: [i], arr: [...copy] });
  }
  return steps;
};

export const getSelectSortDescendSteps = (arr: number[] = []): TStep[] => {
  let copy: number[] = [...arr];
  let steps: TStep[] = [];
  const { length } = copy;
  for (let i = 0; i < length; i++) {
    let ind = i;
    for (let j = i + 1; j < length; j++) {
      steps.push({ type: "select", data: [ind, j], arr: [...copy] });
      if (copy[j] > copy[ind]) {
        const temp = copy[ind];

        copy[ind] = copy[j];

        copy[j] = temp;
        steps.push({ type: "swap", data: [ind, j], arr: [...copy] });
      }
      steps.push({ type: "default_1", data: [i, j, i + 1], arr: { ...copy } });
    }
    steps.push({ type: "end", data: [i], arr: [...copy] });
  }
  return steps;
};
