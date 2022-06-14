import React, { FC } from "react";
import styles from "./listpage.module.css";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";

interface IWrapper {
  state?: ElementStates;
  letter?: string;
  head?: string | React.ReactElement | null;
  index?: number;
  tail?: string | React.ReactElement | null;
  tailType?: "string" | "element";
  extraClass?: string;
  fill?: string;
  isSmall?: boolean;
  hasArrow: boolean;
}

export const ElemenstWrapper: FC<IWrapper> = (props) => {
  return (
    <div className={styles.elements_wrapper}>
      <Circle
        state={props.state}
        tail={props.tail}
        head={props.head}
        letter={props.letter}
      />
      {!props.hasArrow && <ArrowIcon fill={props.fill} />}
    </div>
  );
};
