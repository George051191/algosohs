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

import { TStep, TArrayItem } from "./types";

import { makeUniqueArray, randomNumberCreator } from "../../helpers/random_arr";

import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const [array, setArray] = React.useState<TArrayItem[]>();
  const [funcChoice, setFuncChoice] = React.useState<Choice>();
  const [buttonState, setButtonState] = React.useState<boolean>();
  const [isWorking, setWorkingStatus] = React.useState<boolean>();
  const [isArrayCreated, setArrayStatus] = React.useState<boolean>();
  const [rule, setRule] = React.useState<Direction>();



  const algoStart = async (algo: string, funcChoice: Choice) => {
    algo && funcChoice && setWorkingStatus(true);

    if (algo === Direction.Ascending && funcChoice === Choice.bubble) {
      let steps = getBubbleSortAscendSteps(array!);
      let step = 0;
      const anima = setInterval(() => {

        setArray(steps[step])
        step++
        if (step === steps.length) {
          clearInterval(anima);
          setWorkingStatus(false)
        }
      }, 1000);

    }
    if (algo === Direction.Descending && funcChoice === Choice.bubble) {
      let steps = getBubbleSortDesscendSteps(array!);
      let step = 0;
      const anima = setInterval(() => {

        setArray(steps[step])
        step++
        if (step === steps.length) {
          clearInterval(anima);
          setWorkingStatus(false)
        }
      }, 1000);
    }
    if (algo === Direction.Ascending && funcChoice === Choice.selectsort) {

      let steps = getSelectSortAscendSteps(array!);
      let step = 0;
      const anima = setInterval(() => {

        setArray(steps[step])
        step++
        if (step === steps.length) {
          clearInterval(anima);
          setWorkingStatus(false)
        }
      }, 1000);

    }
    if (algo === Direction.Descending && funcChoice === Choice.selectsort) {

      let steps = getSelectSortDescendSteps(array!);
      let step = 0;
      const anima = setInterval(() => {

        setArray(steps[step])
        step++
        if (step === steps.length) {
          clearInterval(anima);
          setWorkingStatus(false)
        }
      }, 1000);
    }
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
            disabled={
              (isArrayCreated && funcChoice && buttonState && isWorking) ||
              array?.length === 0
            }
            text="По возрастанию"
            sorting={Direction.Ascending}
            extraClass="mr-12"
            onClick={() => {
              algoStart(Direction.Ascending, funcChoice!);
              setButtonState(true);
              setRule(Direction.Ascending);
            }}
          />
          <Button
            isLoader={isWorking && rule === Direction.Descending}
            disabled={
              (isArrayCreated && funcChoice && buttonState && isWorking) ||
              array?.length === 0
            }
            text="По убыванию"
            sorting={Direction.Descending}
            extraClass="mr-40"
            onClick={() => {
              algoStart(Direction.Descending, funcChoice!);
              setButtonState(true);
              setRule(Direction.Descending);
            }}
          />
          <Button
            disabled={isArrayCreated && funcChoice && buttonState && isWorking}
            text="Новый массив"
            onClick={() => {
              randomArr(setArray, makeUniqueArray, randomNumberCreator);
              setArrayStatus(true);
            }}
          />
        </div>
      </div>
      <div className={styles.range_box}>
        {array?.map((el, index) => (
          <Column
            key={index}
            index={el.value}
            state={el.colorType === 'select' ? ElementStates.Changing : el.colorType === 'default' ? ElementStates.Default : ElementStates.Modified}
            extraClass={`${styles.column_extra}`}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};


