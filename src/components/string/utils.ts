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

export const reverseStarting = async (
  value: string,
  circleStateCallback: React.Dispatch<React.SetStateAction<boolean>>,
  inputStateCallback: React.Dispatch<React.SetStateAction<boolean>>,
  buttonStateCallback: React.Dispatch<React.SetStateAction<boolean>>,
  helper: (milliseconds: number) => Promise<unknown>,
  valueStateCallback: React.Dispatch<React.SetStateAction<string>>,
  startStateCallback: React.Dispatch<React.SetStateAction<number | undefined>>,
  endStateCallback: React.Dispatch<React.SetStateAction<number | undefined>>
): Promise<void> => {
  circleStateCallback(true);
  inputStateCallback(true);
  buttonStateCallback(true);
  let arr = value.split("");
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    await helper(1000);
    startStateCallback(start);
    endStateCallback(end);
    await helper(1000);
    const temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    valueStateCallback(arr.join(""));
    await helper(1000);
    start++;
    end--;
  }
  startStateCallback(13);
  endStateCallback(13);
  inputStateCallback(false);
  buttonStateCallback(false);
};
