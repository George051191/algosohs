import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Button } from "../ui/button/button";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import styles from "./sortingpage.module.css";
import { Choice } from "../../types/func-choice";
import { Direction } from "../../types/direction";
import { randomArr } from "./utils";
import {
  getBubbleSortAscendSteps,
  getSelectSortAscendSteps,
  getBubbleSortDesscendSteps,
  getSelectSortDescendSteps,
} from "./utils";

import { TStep } from "./types";
import { sleep } from "../../helpers/sleep-func";
import { makeUniqueArray } from "../../helpers/random_arr";
import { randomNumberCreator } from "../../helpers/random_arr";
import { valueCheck } from "../fibonacci-page/utils";

export const SortingPage: React.FC = () => {
  const [array, setArray] = React.useState<number[]>();
  const [funcChoice, setFuncChoice] = React.useState<Choice>();
  const [buttonState, setButtonState] = React.useState<boolean>();
  const [isWorking, setWorkingStatus] = React.useState<boolean>();
  const [isArrayCreated, setArrayStatus] = React.useState<boolean>();
  const [rule, setRule] = React.useState<Direction>();
  
  const animateSteps = async (steps: TStep[]) => {
    for (const step of steps) {
      const { type, data, arr } = step;
      const [first, second, third] = data;
      await sleep(1000);

      if (type === "swap") {
        document
          .querySelector(`.column-${first}`)
          ?.classList.add(styles.column_on_change);
        document
          .querySelector(`.column-${second}`)
          ?.classList.add(styles.column_on_change);
      } else if (type === "select") {
        document
          .querySelector(`.column-${first}`)
          ?.classList.add(styles.column_on_change);
        document
          .querySelector(`.column-${second}`)
          ?.classList.add(styles.column_on_change);
      }
      if (type === "end") {
        document
          .querySelector(`.column-${first}`)
          ?.classList.add(styles.column_algo_end);
        Array.from(document.querySelectorAll(".node")).forEach((node) => {
          node.classList.remove(styles.column_default, styles.column_on_change);
        });
      }
      if (type === "default") {
        document
          .querySelector(`.column-${first}`)
          ?.classList.add(styles.column_default);
        document
          .querySelector(`.column-${second}`)
          ?.classList.add(styles.column_on_change);
        document
          .querySelector(`.column-${third}`)
          ?.classList.add(styles.column_on_change);
      }
      if (type === "default_1") {
        document
          .querySelector(`.column-${first}`)
          ?.classList.add(styles.column_on_change);
        document
          .querySelector(`.column-${second}`)
          ?.classList.add(styles.column_default);
        document
          .querySelector(`.column-${third}`)
          ?.classList.add(styles.column_on_change);
      }

      await sleep(1000);
      if (type === "swap" && arr) {
        setArray(arr);
      }
    }
  };


  const algoStart = async (algo: string, funcChoice: Choice) => {
    algo && funcChoice && setWorkingStatus(true);
    let steps = [];
    if (algo === Direction.Ascending && funcChoice === Choice.bubble ) {
      steps = getBubbleSortAscendSteps(array);
      await animateSteps(steps);
      setWorkingStatus(false);
    }
    if (algo === Direction.Descending && funcChoice === Choice.bubble) {
      steps = getBubbleSortDesscendSteps(array);
      await animateSteps(steps);
      setWorkingStatus(false);
    }
    if (algo === Direction.Ascending && funcChoice === Choice.selectsort) {
      steps = getSelectSortAscendSteps(array);
      await animateSteps(steps);
      setWorkingStatus(false);
    }
    if (algo === Direction.Descending && funcChoice === Choice.selectsort) {
      steps = getSelectSortDescendSteps(array);
      await animateSteps(steps);
      setWorkingStatus(false);
    }
  };

  const getDefaultStyles = (): void => {
    Array.from(document.querySelectorAll(".node")).forEach((node) => {
      node.classList.remove(
        styles.column_default,
        styles.column_on_change,
        styles.column_algo_end
      );
    });
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.manage_box}>
        <div className={styles.inputs_box}>
          <RadioInput
            name="radio"
            label="Выбор"
            value="sort"
            onClick={() => setFuncChoice(Choice.selectsort)}
          />
          <RadioInput
            name="radio"
            label="Пузырек"
            value="bubble"
            onClick={() => setFuncChoice(Choice.bubble)}
          />
        </div>
        <div className={styles.button_box}>
          <Button
            isLoader={isWorking && rule === Direction.Ascending}
            disabled={(isArrayCreated && funcChoice && buttonState && isWorking) || array?.length === 0}
            text="По возрастанию"
            sorting={Direction.Ascending}
            extraClass="mr-12"
            onClick={() => {
              algoStart(Direction.Ascending, funcChoice!);
              setButtonState(true);
              setRule(Direction.Ascending);
              getDefaultStyles();
            }}
          />
          <Button
            isLoader={isWorking && rule === Direction.Descending}
            disabled={(isArrayCreated && funcChoice && buttonState && isWorking) || array?.length === 0 }
            text="По убыванию"
            sorting={Direction.Descending}
            extraClass="mr-40"
            onClick={() => {
              algoStart(Direction.Descending, funcChoice!);
              setButtonState(true);
              setRule(Direction.Descending);
              getDefaultStyles();
            }}
          />
          <Button
            disabled={isArrayCreated && funcChoice && buttonState && isWorking  }
            text="Новый массив"
            onClick={() => {
              randomArr(setArray,makeUniqueArray,randomNumberCreator);
              setArrayStatus(true);
              getDefaultStyles();
            }}
          />
        </div>
      </div>
      <div className={styles.range_box}>
        {array?.map((el, index) => (
          <Column
            key={index}
            index={el}
            extraClass={`${styles.column_extra} column-${index} node`}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};


/* randomArr(setArray,makeUniqueArray,randomNumberCreator);  */
