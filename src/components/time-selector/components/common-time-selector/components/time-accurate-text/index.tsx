import React from "react";
import { createUseStyles } from "react-jss";
import * as styles from "./index.jss";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  describe?: string;
  time?: string;
  prefixText?: string;
  suffixText?: string;
}

const useStyles = createUseStyles(styles);

export default function TimeAccurateText(props: IProps) {
  const { prefixText, suffixText, describe, time } = props;
  const styles = useStyles();
  return (
    <div className={styles.wrapper}>
      {describe && (
        <div>
          {prefixText}
          {describe}
          {suffixText}
        </div>
      )}

      <div>{time}</div>
    </div>
  );
}

TimeAccurateText.defaultProps = {};
