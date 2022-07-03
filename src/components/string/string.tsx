import React from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import { sleep } from "../../helpers/sleep-func";
import { findIndex } from "./utils";
import { nanoid } from "nanoid";
import { reverseStarting } from "./utils";

export const StringComponent: React.FC = () => {
  const [value, setValue] = React.useState("");

  const [inputState, setInputState] = React.useState(false);
  const [startIndex, setStartIndex] = React.useState<number>();
  const [endIndex, setEndIndex] = React.useState<number>();
  const [buttonState, setButtonState] = React.useState(false);
  const [circleVisibility, setCircleVisibility] = React.useState(false);

  return (
    <SolutionLayout title="Строка">
      <div className={styles.string_page_content}>
        <Input
          value={value}
          disabled={inputState}
          maxLength={11}
          isLimitText={true}
          extraClass={styles.input_for_string}
          onChange={(e) => {
            setValue(e.currentTarget.value);
            setCircleVisibility(false);
            setStartIndex(undefined);
            setEndIndex(undefined);
          }}
        />
        <Button
          text={"Развернуть"}
          isLoader={buttonState}
          disabled={buttonState || !!!value}
          onClick={() =>
            reverseStarting(
              value,
              setCircleVisibility,
              setInputState,
              setButtonState,
              sleep,
              setValue,
              setStartIndex,
              setEndIndex
            )
          }
        />
      </div>
      <div className={styles.circles_box}>
        {circleVisibility &&
          value
            .split("")
            .map((item: string, index: number) => (
              <Circle
                state={findIndex(startIndex!, endIndex!, index)}
                letter={item}
                key={nanoid()}
              />
            ))}
      </div>
    </SolutionLayout>
  );
};
