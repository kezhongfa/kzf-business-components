import React, { useState, useCallback, useEffect, useMemo } from "react";
import { createUseStyles } from "react-jss";
import update from "immutability-helper";
import { Form } from "@shuyun-ep-team/kylin-ui";
import CommonTimeSelect from "../common-time-select";
import RecentTimeFormItem from "../recent-time-form-item";
import BeforeDeadLineTimeFormItem from "../before-deadline-time-form-item";
import FreeIntervalTimeFormItem from "../free-interval-time-form-item";
import FixedPointTimeFormItem from "../fixed-point-time-form-item";
import OperateBtn from "../operator-btn";
import {
  ICommonTimeSelectValue,
  TUnit,
  TOperator,
  TCommonTimeType,
  TCommonTimeSelectType,
  TFixPointTimeValue,
} from "../../../../types";
import { timeSelectType as tType, unitJson, operatorJson } from "../../../../helpers/constant";
import * as styles from "./index.jss";

const useStyles = createUseStyles(styles);

interface IProps {
  timeType?: TCommonTimeType;
  value?: ICommonTimeSelectValue;
  onOk?: (v: ICommonTimeSelectValue) => void;
}

function initDataByTimeSelectType(timeSelectType = tType.ALL_TIME as TCommonTimeSelectType) {
  let result: ICommonTimeSelectValue = {
    timeSelectType: tType.ALL_TIME,
  };
  if (timeSelectType === tType.RECENT_TIME) {
    result = {
      timeSelectType,
      includeCurrentPeriod: true,
      unit: unitJson.DAY as TUnit,
    };
  } else if (timeSelectType === tType.BEFORE_DEADLINE_TIME) {
    result = {
      timeSelectType,
      unit: unitJson.DAY as TUnit,
    };
  } else if (timeSelectType === tType.FIXED_POINT_TIME) {
    result = {
      timeSelectType,
      operator: operatorJson.GE_LE as TOperator,
    };
  } else if (timeSelectType === tType.FREE_INTERVAL_TIME) {
    result = {
      timeSelectType,
      unit: unitJson.DAY as TUnit,
    };
  }
  return result;
}

const CommonTime = (props: IProps) => {
  const { value, timeType, onOk } = props;
  const styles = useStyles();
  const [curValue, setCurValue] = useState(() => value || initDataByTimeSelectType());
  const { timeSelectType = tType.ALL_TIME } = curValue || {};

  useEffect(() => {
    if (value) {
      setCurValue(value);
    }
  }, [value]);

  const onValueChange = useCallback(
    (value: any) => {
      setCurValue(
        update(curValue, {
          value: { $set: value },
        })
      );
    },
    [curValue]
  );

  const onOperatorChange = useCallback(
    (operator: TOperator) => {
      setCurValue(
        update(curValue, {
          operator: {
            $set: operator,
          },
        })
      );
    },
    [curValue]
  );

  const onIncludeCurrentPeriodChange = useCallback(
    (includeCurrentPeriod: boolean) => {
      setCurValue(
        update(curValue, {
          includeCurrentPeriod: {
            $set: includeCurrentPeriod,
          },
        })
      );
    },
    [curValue]
  );

  const onTimeSelectTypeChange = useCallback((timeSelectType: TCommonTimeSelectType) => {
    setCurValue(initDataByTimeSelectType(timeSelectType));
  }, []);

  const onUnitChange = useCallback(
    (unit: TUnit) => {
      setCurValue(
        update(curValue, {
          unit: {
            $set: unit,
          },
        })
      );
    },
    [curValue]
  );

  const _onOk = useCallback(() => {
    onOk && onOk(curValue);
  }, [onOk, curValue]);

  const curFormItem = useMemo(() => {
    let result;
    const { value, unit, includeCurrentPeriod, timeSelectType, operator } = curValue;
    if (timeSelectType === tType.ALL_TIME) {
      result = <OperateBtn onOk={_onOk} />;
    } else if (timeSelectType === tType.RECENT_TIME) {
      result = (
        <RecentTimeFormItem
          value={value as number}
          unit={unit}
          includeCurrentPeriod={includeCurrentPeriod}
          onValueChange={onValueChange}
          onUnitChange={onUnitChange}
          onIncludeCurrentPeriodChange={onIncludeCurrentPeriodChange}
          onOk={_onOk}
        />
      );
    } else if (timeSelectType === tType.BEFORE_DEADLINE_TIME) {
      result = (
        <BeforeDeadLineTimeFormItem
          value={value as number}
          unit={unit}
          onValueChange={onValueChange}
          onUnitChange={onUnitChange}
          onOk={_onOk}
        />
      );
    } else if (timeSelectType === tType.FIXED_POINT_TIME) {
      result = (
        <FixedPointTimeFormItem
          value={value as TFixPointTimeValue}
          timeType={timeType}
          operator={operator}
          onValueChange={onValueChange}
          onOperatorChange={onOperatorChange}
          onOk={_onOk}
        />
      );
    } else if (timeSelectType === tType.FREE_INTERVAL_TIME) {
      result = (
        <FreeIntervalTimeFormItem
          value={value as [number, number]}
          unit={unit}
          onValueChange={onValueChange}
          onUnitChange={onUnitChange}
          onOk={_onOk}
        />
      );
    }
    return result;
  }, [
    timeType,
    curValue,
    _onOk,
    onValueChange,
    onUnitChange,
    onOperatorChange,
    onIncludeCurrentPeriodChange,
  ]);

  return (
    <div className={styles.wrapper}>
      <Form.Item>
        <CommonTimeSelect
          style={{ width: 316 }}
          value={timeSelectType as TCommonTimeSelectType}
          onChange={onTimeSelectTypeChange}
        />
      </Form.Item>
      {curFormItem}
    </div>
  );
};

export default CommonTime;
