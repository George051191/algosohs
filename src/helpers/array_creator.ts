import { randomNumberCreator } from "./random_arr";

export const randomArr = (min: number, max: number): number[] => {
  const size = randomNumberCreator(min, max);

  const arr: number[] = [];
  for (let i = 0; i <= size; i++) {
    arr[i] = randomNumberCreator(0, 100);
  }
  const filteredArr = arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });

  return filteredArr;
};
