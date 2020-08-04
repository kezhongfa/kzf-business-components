import React, { useContext, useState, useCallback } from "react";
import { DatePicker, Form } from "@shuyun-ep-team/kylin-ui";
import moment from "moment";
import { DateFormats } from "@shuyun-ep-team/utils/es/date";
import { createUseStyles } from "react-jss";
import { translate } from "../../../../../../helpers/translate";
import FixedTmePointSelect from "../fixed-timepoint-select";
import OperateBtn from "../operator-btn";
import { TOperator, validateStatus, TCommonTimeType, TFixPointTimeValue } from "../../../../types";
import { operatorJson } from "../../../../helpers/constant";
import { isEmptyValue } from "../../../../../../helpers";
import { getTimeDiff } from "../../../../../../helpers/handle-data";
import * as i18nMap from "../../../../i18n.map";
import { RootI18nContext } from "../../../../../../contexts";
import * as styles from "./index.jss";

const useStyles = createUseStyles(styles);

interface IProps {
  timeType?: TCommonTimeType;
  value?: TFixPointTimeValue;
  operator?: TOperator;
  onValueChange?: (v: TFixPointTimeValue) => void;
  onOperatorChange?: (v: TOperator) => void;
  onOk?: () => void;
}

// 格式化时间范围
const range = (start: number, end: number) => {
  const result: number[] = [];
  for (let i: number = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const FixedPointTimeFormItem = (props: IProps) => {
  const {
    value = [],
    operator = operatorJson.GE_LE as TOperator,
    onValueChange,
    onOperatorChange,
    onOk,
    timeType = "dateTime",
  } = props;
  const styles = useStyles();
  const rootI18nContext = useContext(RootI18nContext);
  const { i18n } = rootI18nContext;
  const [isDirty, setIsDirty] = useState(false);

  const handleIsDirty = useCallback(() => {
    if (!isDirty) {
      setIsDirty(true);
    }
  }, [isDirty]);

  const formatData = useCallback(() => {
    let startTime, endTime;
    if (Array.isArray(value)) {
      const [bt, at] = value;
      if (bt) {
        startTime = moment(bt);
      }
      if (at) {
        endTime = moment(at);
      }
    }
    return {
      startTime,
      endTime,
    };
  }, [value]);

  const _onValueChange = useCallback(
    (v: TFixPointTimeValue) => {
      if (v) {
        handleIsDirty();
        if (operator !== operatorJson.GE_LE) {
          v.length = 1;
        }
        onValueChange && onValueChange(v);
      }
    },
    [handleIsDirty, onValueChange, operator]
  );

  const _onOperatorChange = useCallback(
    (v: TOperator) => {
      handleIsDirty();
      onOperatorChange && onOperatorChange(v);
    },
    [handleIsDirty, onOperatorChange]
  );

  const onStartTimeChange = useCallback(
    (v: moment.Moment | null) => {
      if (v) {
        const result = [...value] as TFixPointTimeValue;
        result[0] = v;
        _onValueChange(result);
      }
    },
    [_onValueChange, value]
  );

  const onEndTimeChange = useCallback(
    (v: moment.Moment | null) => {
      if (v) {
        const result = [...value] as TFixPointTimeValue;
        result[1] = v;
        _onValueChange(result);
      }
    },
    [value, _onValueChange]
  );

  // 获取开始时间disabled选项
  const startDisabledDate = useCallback(
    (current: moment.Moment | null) => {
      let result = false;
      const { endTime } = formatData();
      if (endTime !== undefined && operator !== undefined) {
        if (operator === operatorJson.GE_LE && current) {
          result = current > endTime.endOf("day");
        }
      }
      return result;
    },
    [formatData, operator]
  );

  const startDisabledDateTime = useCallback(() => {
    let result = {};
    const showTime = timeType === "dateTime";
    const { startTime, endTime } = formatData();
    if (showTime && startTime !== undefined && endTime !== undefined && operator !== undefined) {
      const startHours = startTime.hours();
      const startMinutes = startTime.minutes();
      const endHours = endTime.hours();
      const endMinutes = endTime.minutes();
      const endSeconds = endTime.seconds();
      const disabledHours = () => range(endHours + 1, 24);
      const disabledMinutes = () => range(endMinutes + 1, 60);
      const disabledSeconds = () => range(endSeconds + 1, 60);

      if (operator === operatorJson.GE_LE) {
        const diff = getTimeDiff(startTime.endOf("day"), endTime.endOf("day"));

        if (diff < 0) {
          result = {
            disabledHours: () => range(24, 24),
            disabledMinutes: () => range(60, 60),
            disabledSeconds: () => range(60, 60),
          };
        } else if (diff === 0) {
          if (startHours === endHours) {
            if (startMinutes === endMinutes) {
              result = {
                disabledHours,
                disabledMinutes,
                disabledSeconds,
              };
            } else {
              result = {
                disabledHours,
                disabledMinutes,
                disabledSeconds: () => range(60, 60),
              };
            }
          } else if (startHours < endHours) {
            result = {
              disabledHours,
              disabledMinutes: () => range(60, 60),
              disabledSeconds: () => range(60, 60),
            };
          }
        }
      }
    }
    return result;
  }, [timeType, formatData, operator]);

  // 获取结束时间disabled选项
  const endDisabledDate = useCallback(
    (current: moment.Moment | null) => {
      let result = false;
      const { startTime } = formatData();
      if (startTime !== undefined && operator !== undefined) {
        if (operator === operatorJson.GE_LE && current) {
          result = current < startTime.startOf("day");
        }
      }
      return result;
    },
    [formatData, operator]
  );

  const endDisabledDateTime = useCallback(() => {
    let result = {};
    const showTime = timeType === "dateTime";
    const { startTime, endTime } = formatData();
    if (showTime && startTime !== undefined && endTime !== undefined && operator !== undefined) {
      const startHours = startTime.hours();
      const startMinutes = startTime.minutes();
      const startSeconds = startTime.seconds();
      const endHours = endTime.hours();
      const endMinutes = endTime.minutes();
      const disabledHours = () => range(0, startHours);
      const disabledMinutes = () => range(0, startMinutes);
      const disabledSeconds = () => range(0, startSeconds);
      if (operator === operatorJson.GE_LE) {
        const diff = getTimeDiff(endTime.startOf("day"), startTime.startOf("day"));
        if (diff > 0) {
          result = {
            disabledHours: () => range(24, 24),
            disabledMinutes: () => range(60, 60),
            disabledSeconds: () => range(60, 60),
          };
        } else if (diff === 0) {
          if (endHours === startHours) {
            if (endMinutes === startMinutes) {
              result = {
                disabledHours,
                disabledMinutes,
                disabledSeconds,
              };
            } else {
              result = {
                disabledHours,
                disabledMinutes,
                disabledSeconds: () => range(60, 60),
              };
            }
          } else if (endHours > startHours) {
            result = {
              disabledHours,
              disabledMinutes: () => range(60, 60),
              disabledSeconds: () => range(60, 60),
            };
          }
        }
      }
    }
    return result;
  }, [timeType, formatData, operator]);

  const validateStartTimeFormItem = useCallback(() => {
    const { startTime, endTime } = formatData();

    let result = {
      validateStatus: validateStatus.success,
      help: "",
    };
    const help = translate(i18n, i18nMap.i18n.ERROR_COMMON_TEXT);

    if (operator === operatorJson.GE_LE) {
      if (isEmptyValue(startTime)) {
        result = {
          validateStatus: validateStatus.error,
          help,
        };
      } else {
        if (!isEmptyValue(endTime)) {
          if (getTimeDiff(startTime, endTime) > 0) {
            result = {
              validateStatus: validateStatus.error,
              help,
            };
          }
        }
      }
    } else {
      if (isEmptyValue(startTime)) {
        result = {
          validateStatus: validateStatus.error,
          help,
        };
      }
    }

    return result;
  }, [i18n, formatData, operator]);

  const validateEndTimeFormItem = useCallback(() => {
    const { startTime, endTime } = formatData();

    let result = {
      validateStatus: validateStatus.success,
      help: "",
    };
    const help = translate(i18n, i18nMap.i18n.ERROR_COMMON_TEXT);

    if (operator === operatorJson.GE_LE) {
      if (isEmptyValue(endTime)) {
        result = {
          validateStatus: validateStatus.error,
          help,
        };
      } else {
        if (!isEmptyValue(startTime)) {
          if (getTimeDiff(startTime, endTime) > 0) {
            result = {
              validateStatus: validateStatus.error,
              help,
            };
          }
        }
      }
    }

    return result;
  }, [i18n, formatData, operator]);

  // 验证
  const validate = useCallback(() => {
    const list = [validateStartTimeFormItem(), validateEndTimeFormItem()];
    const validateResult = list.some((item) => item.validateStatus !== validateStatus.success);
    return !validateResult;
  }, [validateStartTimeFormItem, validateEndTimeFormItem]);

  const _onOk = useCallback(() => {
    onOk && onOk();
  }, [onOk]);

  const { startTime, endTime } = formatData();
  const startTimeValidateProps = isDirty ? validateStartTimeFormItem() : {};
  const endTimeValidateProps = isDirty ? validateEndTimeFormItem() : {};
  const disabled = isDirty ? !validate() : true;
  const isShowTime = timeType === "dateTime";
  const style = isShowTime ? {} : { width: "316px" };
  const format = isShowTime ? DateFormats.DateTime : DateFormats.Date;
  const startShowTime = isShowTime ? { defaultValue: moment("00:00:00.000", "HH:mm:ss") } : false;
  const endShowTime = isShowTime ? { defaultValue: moment("23:59:59.999", "HH:mm:ss") } : false;

  return (
    <>
      <div className={styles.wrapper}>
        <FixedTmePointSelect
          style={{ width: "316px" }}
          value={operator}
          onChange={_onOperatorChange}
        />
        <div className={styles.datePickerWrapper} style={style}>
          <Form.Item {...startTimeValidateProps} style={{ flex: "1" }}>
            <DatePicker
              style={{ width: "100%" }}
              value={startTime}
              showToday={false}
              format={format}
              showTime={startShowTime}
              allowClear={false}
              onChange={onStartTimeChange}
              disabledDate={startDisabledDate}
              disabledTime={startDisabledDateTime}
            />
          </Form.Item>
          {operator === operatorJson.GE_LE && <span className={styles.lineText}>-</span>}
          {operator === operatorJson.GE_LE && (
            <Form.Item {...endTimeValidateProps} style={{ flex: "1" }}>
              <DatePicker
                style={{ width: "100%" }}
                value={endTime}
                showToday={false}
                format={format}
                showTime={endShowTime}
                allowClear={false}
                onChange={onEndTimeChange}
                disabledDate={endDisabledDate}
                disabledTime={endDisabledDateTime}
              />
            </Form.Item>
          )}
        </div>
      </div>
      <OperateBtn disabled={disabled} onOk={_onOk} />
    </>
  );
};

export default FixedPointTimeFormItem;
