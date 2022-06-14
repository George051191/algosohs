import { ElementStates } from "../../types/element-states";

export const findHead = (currentCount: number, index: number) => {
  if (currentCount === index + 1) {
    return "top";
  }
};

export const setColor = (
  currentCount: number,
  index: number,
  deleteStatus: boolean,
  isChange: boolean
) => {
  if (findHead(currentCount, index) === "top" && isChange && !deleteStatus) {
    return ElementStates.Changing;
  } else if (
    findHead(currentCount, index - 1) === "top" &&
    isChange &&
    deleteStatus
  ) {
    return ElementStates.Changing;
  }
  return ElementStates.Default;
};
