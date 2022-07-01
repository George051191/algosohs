export const randomNumberCreator = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const makeUniqueArray = (arr: number[]) => {
  let filteredArr = arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
  return filteredArr;
};
