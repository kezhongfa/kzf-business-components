import React, { useState, useImperativeHandle, forwardRef, useContext, useCallback } from "react";
import { Form, TimePicker } from "@shuyun-ep-team/kylin-ui";
import moment from "moment";
import { createUseStyles } from "react-jss";
import OperatorSelect from "../operator-select";
import { TOperator, validateStatus, TIntervalValue } from "../../../../types";
import { operatorJson } from "../../../../helpers/constant";
import { getTimeDiff } from "../../../../../../helpers/handle-data";
import { isEmptyValue } from "../../../../../../helpers";
import { getStartTimeDisabled, getEndTimeDisabled } from "./helper";
import { translate } from "../../../../../../helpers/translate";
import * as i18nMap from "../../../../i18n.map";
import { RootI18nContext } from "../../../../../../contexts";
import * as styles from "./index.jss";

const useStyles = createUseStyles(styles);
export interface IProps {
  value?: TIntervalValue;
  operator?: TOperator;
  onTimeChange?: (v: TIntervalValue) => void;
  onOperatorChange?: (v: TOperator) => void;
}

export const IntervalTimePicker = (props: IProps, ref: any) => {
  const { value = [], operator, onTimeChange, onOperatorChange } = props;
  const styles = useStyles();
  const rootI18nContext = useContext(RootI18nContext);
  const { i18n } = rootI18nContext;

  const [isDirty, setIsDirty] = useState(false); //是否操作过

  const handleIsDirty = useCallback(() => {
    if (isDirty) {
      setIsDirty(true);
    }
  }, [isDirty]);

  const validateStartTime = useCallback(() => {
    let result = {
      validateStatus: validateStatus.success,
      help: "",
    };
    const help = translate(i18n, i18nMap.i18n.ERROR_COMMON_TEXT);
    if (!Array.isArray(value)) {
      result = {
        validateStatus: validateStatus.error,
        help,
      };
    } else {
      const [startTime, endTime] = value;
      if (isEmptyValue(startTime)) {
        result = {
          validateStatus: validateStatus.error,
          help,
        };
      } else {
        if (!isEmptyValue(endTime)) {
          if (operator === operatorJson.GE_LE) {
            if (getTimeDiff(startTime, endTime as any) > 0) {
              result = {
                validateStatus: validateStatus.error,
                help,
              };
            }
          } else if (
            operator === operatorJson.GT_LT ||
            operator === operatorJson.GE_LT ||
            operator === operatorJson.GT_LE
          ) {
            if (getTimeDiff(startTime, endTime as any) >= 0) {
              result = {
                validateStatus: validateStatus.error,
                help,
              };
            }
          }
        }
      }
    }

    return result;
  }, [value, operator]);

  const validateOperate = useCallback(() => {
    let result = {
      validateStatus: validateStatus.success,
      help: "",
    };
    const help = translate(i18n, i18nMap.i18n.ERROR_COMMON_TEXT);
    const operators = [
      operatorJson.GE_LE,
      operatorJson.GT_LT,
      operatorJson.GE_LT,
      operatorJson.GT_LE,
    ];
    if (operator === undefined || !operators.includes(operator)) {
      result = {
        validateStatus: validateStatus.error,
        help,
      };
    }
    return result;
  }, [operator]);

  const validateEndTime = useCallback(() => {
    let result = {
      validateStatus: validateStatus.success,
      help: "",
    };
    const help = translate(i18n, i18nMap.i18n.ERROR_COMMON_TEXT);
    if (!Array.isArray(value)) {
      result = {
        validateStatus: validateStatus.error,
        help,
      };
    } else {
      const [startTime, endTime] = value;
      if (isEmptyValue(endTime)) {
        result = {
          validateStatus: validateStatus.error,
          help,
        };
      } else {
        if (!isEmptyValue(startTime)) {
          if (operator === operatorJson.GE_LE) {
            if (getTimeDiff(startTime, endTime as any) > 0) {
              result = {
                validateStatus: validateStatus.error,
                help,
              };
            }
          } else if (
            operator === operatorJson.GT_LT ||
            operator === operatorJson.GE_LT ||
            operator === operatorJson.GT_LE
          ) {
            if (getTimeDiff(startTime, endTime as any) >= 0) {
              result = {
                validateStatus: validateStatus.error,
                help,
              };
            }
          }
        }
      }
    }
    return result;
  }, [value, operator]);

  // 验证
  const validate = useCallback(() => {
    const list = [validateStartTime(), validateOperate(), validateEndTime()];
    const validateResult = list.some((item) => item.validateStatus !== validateStatus.success);

    return !validateResult;
  }, [validateStartTime, validateOperate, validateEndTime]);

  useImperativeHandle(
    ref,
    () => ({
      validate,
    }),
    [validate]
  );
  const onStartTimeChange = useCallback(
    (v: moment.Moment) => {
      if (v) {
        handleIsDirty();
        const result = [...value];
        result[0] = v;
        onTimeChange && onTimeChange(result as TIntervalValue);
      }
    },
    [handleIsDirty, onTimeChange, value]
  );

  const onEndTimeChange = useCallback(
    (v: moment.Moment) => {
      if (v) {
        handleIsDirty();
        const result = [...value];
        result[1] = v;
        onTimeChange && onTimeChange(result as TIntervalValue);
      }
    },
    [handleIsDirty, onTimeChange, value]
  );

  const _onOperatorChange = useCallback(
    (v: TOperator) => {
      handleIsDirty();
      onOperatorChange && onOperatorChange(v);
    },
    [onOperatorChange, handleIsDirty]
  );

  //格式化props数据
  const formatData = useCallback(() => {
    let startTime,
      endTime,
      _operator = operatorJson.GE_LE as TOperator;
    if (Array.isArray(value)) {
      const [bt, at] = value;
      if (bt) {
        startTime = moment(value[0]);
      }
      if (at) {
        endTime = moment(value[1]);
      }
    }
    if (operator) {
      _operator = operator;
    }
    return {
      startTime,
      endTime,
      operator: _operator,
    };
  }, [value, operator]);

  const { startTime, endTime, operator: ot } = formatData();
  const startTimeTimeProps = getStartTimeDisabled(startTime, endTime, ot);
  const endTimeProps = getEndTimeDisabled(startTime, endTime, ot);
  const startTimeValidateProps = isDirty ? validateStartTime() : {};
  const operateValidateProps = isDirty ? validateOperate() : {};
  const endTimeValidateProps = isDirty ? validateEndTime() : {};

  return (
    <div className={styles.itemWrapper} ref={ref}>
      <Form.Item className={styles.formItem} {...startTimeValidateProps}>
        <TimePicker
          className={styles.timePicker}
          {...startTimeTimeProps}
          allowClear={false}
          value={startTime}
          onChange={onStartTimeChange}
        />
      </Form.Item>
      <Form.Item className={styles.formItem} {...operateValidateProps}>
        <OperatorSelect style={{ width: "100px" }} value={operator} onChange={_onOperatorChange} />
      </Form.Item>
      <Form.Item className={styles.formItem} {...endTimeValidateProps}>
        <TimePicker
          className={styles.timePicker}
          {...endTimeProps}
          allowClear={false}
          value={endTime}
          onChange={onEndTimeChange}
        />
      </Form.Item>
    </div>
  );
};

export default forwardRef(IntervalTimePicker);
