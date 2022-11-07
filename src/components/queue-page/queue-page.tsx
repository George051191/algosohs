import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Queue } from "./queue";
import { Circle } from "../ui/circle/circle";
import { setState } from "./utils";
import { sleep } from "../../helpers/sleep-func";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";



export const QueuePage: React.FC = () => {
  const [value, setValue] = React.useState("");
  const [array, setArray] = React.useState<(string | null | number)[]>();
  const [addButtonState, setAddButtonState] = React.useState<boolean>();
  const [changeColor, setChangeColor] = React.useState<boolean>();
  const [styleMode, setStyleMode] = React.useState<boolean>(true);
  const [addWorkingStatus, setAddWorkingStatus] = React.useState<boolean>();
  const [deleteWorkingStatus, setDeleteWorkingStatus] =
    React.useState<boolean>();

  const queue = React.useMemo(()=> new Queue<string | null | number>(7), [] )
  const setQueueMember = async (): Promise<void> => {
    setAddWorkingStatus(true);
    queue.enqueue(value, setAddButtonState);
    setChangeColor(true);
    await sleep(SHORT_DELAY_IN_MS);
    setArray([...queue.elements()]);
    setValue("");
    setChangeColor(false);
    setAddWorkingStatus(false);
  };

  const deleteQueueMember = async (): Promise<void> => {
    setDeleteWorkingStatus(true);
    setStyleMode(false);
    queue.dequeue();
    setChangeColor(true);
    await sleep(SHORT_DELAY_IN_MS);
    setArray([...queue.elements()]);
    setChangeColor(false);
    setStyleMode(true);
    setDeleteWorkingStatus(false);
  };

  const clearQueue = (): void => {
    queue.clear();
    setArray([...queue.elements()]);
    setAddButtonState(false);
    setValue("");
  };

  const setHead = (index: number) => {
    if (
      array &&
      array.indexOf(queue.getHead()) === index &&
      queue.getHead() !== null &&
      queue.getHead() !== undefined
    ) {
      return "head";
    }
  };

  const setTail = (index: number) => {
    if (array && queue.getLength() - 1 === index && queue.getTail() !== null) {
      return "tail";
    }
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.manage_elements_box}>
        <Input
          value={value}
          maxLength={4}
          isLimitText={true}
          onChange={(e) => setValue(e.currentTarget.value)}
          onKeyUp={(e) => {
            if (value.match(/^[ ]+$/)) {
              setValue("");
            }
          }}
        />
        <Button
          isLoader={addWorkingStatus}
          disabled={!!!value || addButtonState || value === ""}
          onClick={setQueueMember}
          text="Добавить"
        />
        <Button
          isLoader={deleteWorkingStatus}
          onClick={deleteQueueMember}
          disabled={queue.isEmpty()}
          text="Удалить"
        />
        <Button
          disabled={queue.elements()[0] === undefined}
          onClick={clearQueue}
          text="Очистить"
          extraClass={styles.button_with_margin}
        />
      </div>
      <div className={styles.circles_box}>
        <Circle
          state={setState(
            queue.getHeadIndex(),
            queue.getLength(),
            1,
            changeColor!,
            styleMode
          )}
          index={0}
          letter={array && `${array[0] ?? ""}`}
          head={setHead(0)}
          tail={setTail(0)}
        />
        <Circle
          state={setState(
            queue.getHeadIndex(),
            queue.getLength(),
            2,
            changeColor!,
            styleMode
          )}
          index={1}
          letter={array && `${array[1] ?? ""}`}
          head={setHead(1)}
          tail={setTail(1)}
        />
        <Circle
          state={setState(
            queue.getHeadIndex(),
            queue.getLength(),
            3,
            changeColor!,
            styleMode
          )}
          index={2}
          letter={array && `${array[2] ?? ""}`}
          head={setHead(2)}
          tail={setTail(2)}
        />
        <Circle
          state={setState(
            queue.getHeadIndex(),
            queue.getLength(),
            4,
            changeColor!,
            styleMode
          )}
          index={3}
          letter={array && `${array[3] ?? ""}`}
          head={setHead(3)}
          tail={setTail(3)}
        />
        <Circle
          state={setState(
            queue.getHeadIndex(),
            queue.getLength(),
            5,
            changeColor!,
            styleMode
          )}
          index={4}
          letter={array && `${array[4] ?? ""}`}
          head={setHead(4)}
          tail={setTail(4)}
        />
        <Circle
          state={setState(
            queue.getHeadIndex(),
            queue.getLength(),
            6,
            changeColor!,
            styleMode
          )}
          index={5}
          letter={array && `${array[5] ?? ""}`}
          head={setHead(5)}
          tail={setTail(5)}
        />
        <Circle
          state={setState(
            queue.getHeadIndex(),
            queue.getLength(),
            7,
            changeColor!,
            styleMode
          )}
          index={6}
          letter={array && `${array[6] ?? ""}`}
          head={setHead(6)}
          tail={setTail(6)}
        />
      </div>
    </SolutionLayout>
  );
};
