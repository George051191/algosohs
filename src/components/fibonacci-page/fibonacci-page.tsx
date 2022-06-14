import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci.module.css";
import { sleep } from "../../helpers/sleep-func";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { valueCheck, getFibonacciNumbers, indexCheck } from "./utils";
import { nanoid } from "nanoid";

export const FibonacciPage: React.FC = () => {
  const [buttonState, setButtonState] = React.useState<boolean>(true);
  const [inputValue, setInputValue] = React.useState<number | string>();
  const [startLoader, setStartLoader] = React.useState<boolean>(false);
  const [inputState, setInputState] = React.useState(false);
  const [numberArray, setNumberArray] = React.useState<number[]>([]);
  const [currentIndex, setCurrIndex] = React.useState<number>();

  React.useEffect(() => {
    valueCheck(inputValue!, setButtonState);
  }, [inputValue]);

  const setFibonacciNumbers = async () => {
    setInputState(true);
    setStartLoader(true);
    const fibonacciArray = getFibonacciNumbers(inputValue!);
    setNumberArray(fibonacciArray);
    let i = 0;

    while (i < fibonacciArray.length) {
      setCurrIndex(i);
      await sleep(SHORT_DELAY_IN_MS);
      i++;
    }
    setInputState(false);
    setStartLoader(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.fibonacci_page_content}>
        <Input
          disabled={inputState}
          type="number"
          isLimitText={true}
          max={19}
          extraClass={styles.input_for_string}
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />
        <Button
          text={"Развернуть"}
          disabled={buttonState}
          isLoader={startLoader}
          onClick={setFibonacciNumbers}
        />
      </div>
      <div className={styles.circles_box}>
        {numberArray.map((item: number, index: number) => (
          <Circle
            key={nanoid()}
            index={index}
            letter={`${item}`}
            extraClass={
              indexCheck(index, currentIndex!)
                ? styles.circle_visible
                : styles.circle_invisible
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
