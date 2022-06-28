import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack } from "./stack";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";
import { nanoid } from "nanoid";
import { sleep } from "../../helpers/sleep-func";
import { findHead, setColor } from "./utils";

const st = new Stack<number | string>();

export const StackPage: React.FC = () => {
  const [value, setValue] = React.useState("");
  const [array, setArray] = React.useState<Array<number | string>>([]);
  const [currentCount, setCurrentCount] = React.useState<number>(0);
  const [addStatus, setAddStatus] = React.useState<boolean>();
  const [deleteStatus, setDeleteStatus] = React.useState<boolean>();
  const [isChange, setChangeStatus] = React.useState<boolean>();
  const [isInProcess, setProcess] = React.useState<boolean>();
  
  return (
    <SolutionLayout title="Стек">
      <div className={styles.manage_elements_box}>
        <Input
          value={value}
          maxLength={4}
          isLimitText={true}
          onChange={(e) => setValue(e.currentTarget.value)}
          onKeyUp={(e)=>{  if (value.match(/^[ ]+$/)){ setValue('')}} }
        />
        <Button
          disabled={isInProcess || value.length === 0 || value === '' || array.length > 9}
          isLoader={addStatus}
          text="Добавить"
          onClick={() => {
            st.push(
              value,
              setArray,
              setChangeStatus,
              sleep,
              1000,
              setAddStatus,
              setProcess,
              setValue
            );
            setCurrentCount(currentCount + 1);
            setAddStatus(true);
          }}
        />
        <Button
          disabled={isInProcess || array.length === 0}
          isLoader={deleteStatus}
          text="Удалить"
          onClick={() => {
            st.pop(
              setArray,
              setChangeStatus,
              sleep,
              1000,
              setDeleteStatus,
              setProcess
            );
            setCurrentCount(currentCount - 1);
            setDeleteStatus(true);
          }}
        />
        <Button
          disabled={isInProcess || array.length === 0}
          text="Очистить"
          extraClass={styles.button_with_margin}
          onClick={() => {
            st.clear(setArray);
            setCurrentCount(0);
          }}
        />
      </div>
      <div className={styles.circles_box}>
        {array.map((item: number | string, index: number) => (
          <Circle
            key={nanoid()}
            state={setColor(currentCount, index, deleteStatus!, isChange!)}
            head={
              !deleteStatus
                ? findHead(currentCount, index)
                : findHead(currentCount, index - 1)
            }
            letter={`${item}`}
            index={index}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
