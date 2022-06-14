import { ElementStates } from "../../types/element-states";

export const findIndex = (
  startIndex: number,
  endIndex: number,
  index: number
): ElementStates | undefined => {
  if (startIndex === index) {
    return ElementStates.Changing;
  } else if (endIndex === index) {
    return ElementStates.Changing;
  }
  if (startIndex > index) {
    return ElementStates.Modified;
  } else if (endIndex < index) {
    return ElementStates.Modified;
  } else if (startIndex === 13 && endIndex === 13) {
    return ElementStates.Modified;
  }
};
