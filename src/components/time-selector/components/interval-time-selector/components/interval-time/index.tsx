/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Form } from "@shuyun-ep-team/kylin-ui";
import { createUseStyles } from "react-jss";
import update from "immutability-helper";
import TimeTypeSelect from "../time-type-select";
import IntervalTimePicker from "../interval-time-picker";
import OperateBtn from "../operator-btn";
import { IIntervalTimeSelectValue, TIntervalValue, TOperator } from "../../../../types";
import { timeSelectType as tType, operatorJson } from "../../../../helpers/constant";
import * as styles from "./index.jss";

const useStyles = createUseStyles(styles);

interface IProps {
  value?: IIntervalTimeSelectValue;
  onOk?: (v: IIntervalTimeSelectValue) => void;
}

const IntervalTime = (props: IProps) => {
  const { value, onOk } = props;
  const styles = useStyles();
  const intervalTimePickerRef = useRef<any>();

  const [curValue, setCurValue] = useState(() => {
    const _value = value || {};
    return {
      value: (_value.value || []) as TIntervalValue,
      operator: (_value.operator || operatorJson.GE_LE) as TOperator,
    };
  });
  const [isDirty, setIsDirty] = useState(false);
  const [operateBtnDisabled, setIsOperateBtnDisabled] = useState(true);

  const onTimeChange = useCallback((v) => {
    if (v) {
      setCurValue((preState) =>
        update(preState, {
          value: { $set: v },
        })
      );
    }
  }, []);
  const onOperatorChange = useCallback((v) => {
    if (v) {
      setCurValue((preState) =>
        update(preState, {
          operator: { $set: v },
        })
      );
    }
  }, []);

  const validate = useCallback(() => {
    return intervalTimePickerRef.current?.validate();
  }, [intervalTimePickerRef.current]);

  const onOperateClick = useCallback(() => {
    if (validate()) {
      onOk && onOk(curValue);
    }
  }, [curValue]);

  useEffect(() => {
    if (isDirty) {
      setIsOperateBtnDisabled(!validate());
    } else {
      setIsDirty(true);
    }
  }, [curValue]);

  return (
    <div className={styles.wrapper}>
      <Form.Item>
        <TimeTypeSelect style={{ width: "316px" }} defaultValue={tType.TIME_INTERVAL_TIME} />
      </Form.Item>
      <IntervalTimePicker
        ref={intervalTimePickerRef}
        value={curValue.value}
        operator={curValue.operator}
        onTimeChange={onTimeChange}
        onOperatorChange={onOperatorChange}
      />
      <OperateBtn disabled={operateBtnDisabled} onOk={onOperateClick} />
    </div>
  );
};
export default IntervalTime;
