import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./listpage.module.css";
import { nanoid } from "nanoid";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { LinkedListNode } from "./list";
import { LinkedList } from "./list";
import { ElemenstWrapper } from "./elements_wrapper";
import { Circle } from "../ui/circle/circle";
import { randomArr } from "../../helpers/array_creator";
import { sleep } from "../../helpers/sleep-func";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: React.FC = () => {
  const [value, setValue] = React.useState("");
  const [array, setArray] = React.useState<any>([]);
  const [index, setIndex] = React.useState("");
  const [isHeadChange, setHeadChange] = React.useState<boolean>();
  const [isTailChange, setTailChange] = React.useState<boolean>();
  const [currentHeadState, setCurrentHeadState] =
    React.useState<ElementStates>();
  const [currentTailState, setCurrentTailState] =
    React.useState<ElementStates>();
  const [currentIndexForSearch, setCurrentIndexForSearch] = React.useState<
    number | null
  >(null);
  const [currentTailIndex, setCurrentTailIndex] = React.useState<number | null>(
    null
  );
  const [lastTailIndex, setLastTailIndex] = React.useState<number | null>();
  const [isSearching, setSearching] = React.useState<boolean>();
  const [isSmallCircle, setSmallCircle] = React.useState<boolean>();
  const [isCycle, setCycle] = React.useState<boolean>();
  const [isDeleting, setDeliting] = React.useState<boolean>(true);
  const [isHeadDelete, setHeadDelete] = React.useState<boolean>();
  const [isTailDelete, setTailDelete] = React.useState<boolean>();
  const [isWorking, setWorking] = React.useState<boolean>();

  const ref = React.useRef<LinkedList<string | number> | null>(null);

  function addList(): LinkedList<string | number> {
    if (ref.current === null) {
      ref.current = new LinkedList<string | number>(array);
    }
    return ref.current;
  }

  const list = addList();

  const generatArray = () => {
    randomArr(3, 5).forEach((el) => {
      list.append(el);
    });
    setArray(list.toArray());
  };

  React.useEffect(() => {
    generatArray();
  }, []);

  const prepend = async (value: string | number) => {
    setWorking(true);
    setHeadChange(true);
    await sleep(SHORT_DELAY_IN_MS);
    list.prepend(value);
    await sleep(SHORT_DELAY_IN_MS);
    setArray(list.toArray());
    setCurrentHeadState(ElementStates.Modified);
    setValue("");
    setHeadChange(false);
    await sleep(SHORT_DELAY_IN_MS);
    setCurrentHeadState(ElementStates.Default);
    setWorking(false);
  };

  const append = async () => {
    setWorking(true);
    setTailChange(true);
    await sleep(SHORT_DELAY_IN_MS);
    list.append(value);
    await sleep(SHORT_DELAY_IN_MS);
    setArray(list.toArray());
    setCurrentTailState(ElementStates.Modified);
    setValue("");
    setTailChange(false);
    await sleep(SHORT_DELAY_IN_MS);
    setCurrentTailState(ElementStates.Default);
    setWorking(false);
  };

  const deleteFromHead = async () => {
    setWorking(true);
    setHeadDelete(true);
    await sleep(1000);
    list.deleteHead();
    setArray(list.toArray());
    setHeadDelete(false);
    setValue("");
    setWorking(false);
  };

  const deleteFromTail = async () => {
    setWorking(true);
    setTailDelete(true);
    await sleep(1000);
    list.deleteTail();
    setArray(list.toArray());

    setValue("");
    setWorking(false);
    setTailDelete(false);
  };

  const addByIndex = async (value: string | number, index: string | number) => {
    setWorking(true);
    setSearching(true);
    setSmallCircle(true);
    let i = 0;
    setCycle(true);
    while (i <= index) {
      setCurrentIndexForSearch(i);
      await sleep(SHORT_DELAY_IN_MS);
      i++;
    }
    await sleep(SHORT_DELAY_IN_MS);
    setCycle(false);
    list.addByIndex(value, Number(index));
    setArray(list.toArray());
    setSmallCircle(false);
    await sleep(1000);

    setCurrentIndexForSearch(null);
    setSearching(false);
    await sleep(SHORT_DELAY_IN_MS);
    setValue("");
    setIndex("");
    setWorking(false);
  };

  const deleteByIndex = async (index: string | number) => {
    setCycle(true);
    setWorking(true);
    setSearching(true);
    setDeliting(true);
    setSmallCircle(true);
    let i = 0;
    while (i <= index) {
      setCurrentTailIndex(i);
      await sleep(SHORT_DELAY_IN_MS);
      i++;
    }
    await sleep(1000);
    setLastTailIndex(i - 1);
    await sleep(SHORT_DELAY_IN_MS);
    //list.deleteByIndex(Number(index))
    setDeliting(false);
    await sleep(SHORT_DELAY_IN_MS);
    setSearching(false);
    await SHORT_DELAY_IN_MS;
    list.deleteByIndex(Number(index));
    setArray(list.toArray());
    setDeliting(true);
    setCycle(false);
    setSmallCircle(false);
    await sleep(SHORT_DELAY_IN_MS);
    setLastTailIndex(null);
    setIndex("");
    setCurrentTailIndex(null);
    setWorking(false);
  };

  const setHead = (
    item: LinkedListNode<number | string>,
    index: number,
    value: string | number,
    isHeadChange: boolean
  ) => {
    if (
      index === 0 ||
      (!!currentIndexForSearch && currentIndexForSearch === 0)
    ) {
      return isHeadChange || (currentIndexForSearch === 0 && isSmallCircle) ? (
        <Circle
          state={ElementStates.Changing}
          isSmall={true}
          letter={`${value}`}
        />
      ) : (
        "head"
      );
    } else if (index === currentIndexForSearch && isSmallCircle) {
      return (
        <Circle
          state={ElementStates.Changing}
          isSmall={true}
          letter={`${value}`}
        />
      );
    } else if (item.next === null && isTailChange) {
      return (
        <Circle
          state={ElementStates.Changing}
          isSmall={true}
          letter={`${item.value}`}
        />
      );
    }
  };

  const setTail = (item: LinkedListNode<number | string>, index: number) => {
    if (index === lastTailIndex && !isDeleting) {
      return (
        <Circle
          state={ElementStates.Changing}
          isSmall={true}
          letter={`${item.value}`}
        />
      );
    } else if (index === 0 && isHeadDelete) {
      return (
        <Circle
          state={ElementStates.Changing}
          isSmall={true}
          letter={`${item.value}`}
        />
      );
    } else if (item.next === null) {
      if (index === array.length - 1 && isTailDelete) {
        return (
          <Circle
            state={ElementStates.Changing}
            isSmall={true}
            letter={`${item.value}`}
          />
        );
      }
      return "tail";
    }
  };

  const setState = (
    currentHeadState: ElementStates,
    index: number,
    item: LinkedListNode<number | string>,
    stateIndex: number | string
  ) => {
    if (index === 0 && !isSearching) {
      return !!currentHeadState ? currentHeadState : ElementStates.Default;
    } else if (item.next === null && !isSearching) {
      return !!currentTailState ? currentTailState : ElementStates.Default;
    } else if (isSearching && index <= currentIndexForSearch!) {
      if (index === Number(stateIndex) && isSearching && !isCycle) {
        return ElementStates.Modified;
      }
      return ElementStates.Changing;
    } else if (isSearching && index <= currentTailIndex!) {
      return ElementStates.Changing;
    }
  };

  const changeValue = (
    item: LinkedListNode<any>,
    ind: number,
    index: number | string,
    isChanged: boolean
  ) => {
    if (Number(index) === ind && !isChanged) {
      return "";
    } else if (ind === 0 && isHeadDelete) {
      return "";
    } else if (ind === array.length - 1 && isTailDelete) {
      return "";
    }

    return item.value;
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.manage_buttons_conteiner}>
        <Input
          value={value}
          maxLength={4}
          placeholder="Введите значение"
          isLimitText={true}
          onChange={(e) => setValue(e.currentTarget.value)}
          onKeyUp={(e)=>{  if (value.match(/^[ ]+$/)){ setValue('')}} }
        />
        <Button
          disabled={isWorking || !value}
          isLoader={isHeadChange}
          text="Добавить в head"
          onClick={() => prepend(value)}
        />
        <Button
          disabled={isWorking || !value}
          isLoader={isTailChange}
          text="Добавить в tail"
          onClick={() => append()}
        />
        <Button
          disabled={isWorking || array.length === 0}
          isLoader={isHeadDelete}
          text="Удалить из head"
          onClick={() => deleteFromHead()}
        />
        <Button
          disabled={isWorking || array.length === 0}
          isLoader={isTailDelete}
          text="Удалить из tail"
          onClick={() => deleteFromTail()}
        />
        <Input
          value={index}
          type='number'
          placeholder="Введите индекс"
          onChange={(e) => setIndex(e.currentTarget.value)}
          onKeyUp={(e)=>{  if (index.match(/^[ ]+$/)){ setIndex('')}} }
        />
        <Button
          disabled={
            isWorking || !value || !index || Number(index) > array.length - 1
          }
          isLoader={!(currentIndexForSearch === null)}
          text="Добавить по индексу"
          extraClass={styles.extra_button_for_add}
          onClick={() => addByIndex(value, index)}
        />
        <Button
          disabled={isWorking || !index || Number(index) > array.length - 1}
          isLoader={!(currentTailIndex === null)}
          text="Удалить по индексу"
          extraClass={styles.extra_button_for_delete}
          onClick={() => deleteByIndex(index)}
        />
      </div>
      <div className={styles.circles_box}>
        {array &&
          array.map((item: LinkedListNode<any>, ind: number) => (
            <ElemenstWrapper
              hasArrow={array.length - 1 === ind}
              state={setState(currentHeadState!, ind, item, index)}
              tail={setTail(item, ind)}
              head={setHead(item, ind, value, isHeadChange!)}
              key={nanoid()}
              letter={`${changeValue(item, ind, index, isDeleting!)}`}
              fill={
                currentIndexForSearch! > ind || currentTailIndex! > ind
                  ? "#D252E1"
                  : "#0032FF"
              }
            />
          ))}
      </div>
    </SolutionLayout>
  );
};
