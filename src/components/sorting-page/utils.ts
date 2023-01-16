import { randomNumberCreator } from "../../helpers/random_arr";
import { TStep, TArrayItem } from "./types";

export const randomArr = (
  callback: React.Dispatch<React.SetStateAction<TArrayItem[] | undefined>>,
  callbackForArray: (arr: number[]) => TArrayItem[],
  createNumberFunc: (key1: number, key2: number) => number
) => {
  let size = createNumberFunc(17, 3);

  let arr: number[] = [];
  for (let i = 0; i <= size; i++) {
    arr[i] = createNumberFunc(0, 100);
  }

  callback(callbackForArray(arr));
};
////рефакт пузырька
export const getBubbleSortAscendSteps = (array: TArrayItem[]): Array<Array<TArrayItem>> => {
  let copy: TArrayItem[] = [...array];
 
  let steps: Array<Array<TArrayItem>> = [];

  for (let j = copy!.length - 1; j >= 0; j--) {
    for (let i = 0; i < j; i++) {
   
   
      copy[i] = { colorType: 'select', value: copy[i].value };
      copy[i + 1] = { colorType: 'select', value: copy[i + 1].value };
    
      steps.push([...copy]);
     

      if (copy[i].value > copy[i + 1].value) {


        const temp = copy![i];
        copy![i] = copy![i + 1];

        copy![i + 1] = temp;
        steps.push([...copy]);
      }

      copy[i] = { colorType: 'default', value: copy[i].value };
      copy[i + 1] = { colorType: 'default', value: copy[i + 1].value };
      steps.push([...copy]);

    }
    copy[j] = { colorType: 'final', value: copy[j].value }
    steps.push([...copy])
  }
  
  return steps;
};
/// пузырек
export const getBubbleSortDesscendSteps = (array: TArrayItem[]): Array<Array<TArrayItem>> => {
  let copy: TArrayItem[] = [...array];
 
  let steps: Array<Array<TArrayItem>> = [];

  for (let j = copy!.length - 1; j >= 0; j--) {
    for (let i = 0; i < j; i++) {
   
   
      copy[i] = { colorType: 'select', value: copy[i].value };
      copy[i + 1] = { colorType: 'select', value: copy[i + 1].value };
    
      steps.push([...copy]);
     

      if (copy[i].value < copy[i + 1].value) {


        const temp = copy![i];
        copy![i] = copy![i + 1];

        copy![i + 1] = temp;
        steps.push([...copy]);
      }

      copy[i] = { colorType: 'default', value: copy[i].value };
      copy[i + 1] = { colorType: 'default', value: copy[i + 1].value };
      steps.push([...copy]);

    }
    copy[j] = { colorType: 'final', value: copy[j].value }
    steps.push([...copy])
  }
  
  return steps;
};

///рефакт выбора
export const getSelectSortAscendSteps = (array: TArrayItem[]): Array<Array<TArrayItem>> => {
  let copy: TArrayItem[] = [...array];
 
  let steps: Array<Array<TArrayItem>> = [];

  const { length } = copy;
  for (let i = 0; i < length; i++) {
    let ind = i;
    for (let j = i + 1; j < length; j++) {

      copy[ind] = { colorType: 'select', value: copy[ind].value };
      copy[j] = { colorType: 'select', value: copy[j].value };
      steps.push([...copy])

      
      if (copy[j].value > copy[ind].value) {
        const temp = copy[ind];

        copy[ind] = copy[j];

        copy[j] = temp;
        steps.push([...copy]);
      }
      copy[ind] = { colorType: 'default', value: copy[ind].value };
      copy[j] = { colorType: 'default', value: copy[j].value };
      steps.push([...copy]);
    }
    copy[ind] = { colorType: 'final', value: copy[ind].value };
    steps.push([...copy]);
  }
  
  return steps;
};
////выбор
export const getSelectSortDescendSteps = (array: TArrayItem[]): Array<Array<TArrayItem>>  => {
  let copy: TArrayItem[] = [...array];
 
  let steps: Array<Array<TArrayItem>> = [];

  const { length } = copy;
  for (let i = 0; i < length; i++) {
    let ind = i;
    for (let j = i + 1; j < length; j++) {

      copy[ind] = { colorType: 'select', value: copy[ind].value };
      copy[j] = { colorType: 'select', value: copy[j].value };
      steps.push([...copy])

      
      if (copy[j].value < copy[ind].value) {
        const temp = copy[ind];

        copy[ind] = copy[j];

        copy[j] = temp;
        steps.push([...copy]);
      }
      copy[ind] = { colorType: 'default', value: copy[ind].value };
      copy[j] = { colorType: 'default', value: copy[j].value };
      steps.push([...copy]);
    }
    copy[ind] = { colorType: 'final', value: copy[ind].value };
    steps.push([...copy]);
  }
  
  return steps;
};
