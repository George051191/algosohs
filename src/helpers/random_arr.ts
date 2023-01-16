export const randomNumberCreator = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const makeUniqueArray = (arr: number[]) => {
  const uniqArr = [...new Set(arr)];
  return uniqArr.map(el => {
    return { colorType: 'default', value: el}
  })
 
};
