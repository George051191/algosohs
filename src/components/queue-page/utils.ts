import { ElementStates } from "../../types/element-states";

export const setState = (
  head: number,
  tail: number,
  currentIndex: number,
  changeColor: boolean,
  styleMode: boolean
) => {
  if (tail === currentIndex && changeColor && styleMode) {
    console.log(tail, head, currentIndex, "a");
    return ElementStates.Changing;
  } else if (head === currentIndex && changeColor && !styleMode) {
    console.log(tail, head, currentIndex, "b");
    return ElementStates.Changing;
  }
};
