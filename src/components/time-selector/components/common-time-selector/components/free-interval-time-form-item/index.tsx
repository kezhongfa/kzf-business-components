import React, { useContext, useState, useCallback } from "react";
import { InputNumber, Form } from "@shuyun-ep-team/kylin-ui";
import { createUseStyles } from "react-jss";
import TimeUnitSelect from "../time-unit-select";
import TimeAccurateText from "../time-accurate-text";
import OperateBtn from "../operator-btn";
import { TUnit, validateStatus } from "../../../../types";
import { unitJson } from "../../../../helpers/constant";
import { calculateFreeTimeBetween } from "../../../../helpers/time";
import { isNumeric, isEmptyValue } from "../../../../../../helpers";
import { translate } from "../../../../../../helpers/translate";
import * as i18nMap from "../../../../i18n.map";
import { RootI18nContext } from "../../../../../../contexts";
import * as styles from "./index.jss";

const useStyles = createUseStyles(styles);

type TValue = [number, number];
interface IProps {
  value?: TValue;
  unit?: TUnit;
  onValueChange?: (v: TValue) => void;
  onUnitChange?: (v: TUnit) => void;
  onOk?: () => void;
}

const FreeIntervalTimeFormItem = (props: IProps) => {
  const { value = [], unit = unitJson.DAY as TUnit, onValueChange, onUnitChange, onOk } = props;
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
    let maxValue, minValue;
    if (Array.isArray(value)) {
      maxValue = value[0];
      minValue = value[1];
    }
    return {
      maxValue,
      minValue,
    };
  }, [value]);

  const onMaxValueChange = useCallback(
    (v?: number) => {
      if (isNumeric(v)) {
        handleIsDirty();
        const result = [...value] as TValue;
        result[0] = v!;
        onValueChange && onValueChange(result);
      }
    },
    [handleIsDirty, onValueChange, value]
  );
  const onMinValueChange = useCallback(
    (v?: number) => {
      if (isNumeric(v)) {
        handleIsDirty();
        const result = [...value] as TValue;
        result[1] = v!;
        onValueChange && onValueChange(result);
      }
    },
    [handleIsDirty, onValueChange, value]
  );
  const _onUnitChange = useCallback(
    (v: TUnit) => {
      if (v) {
        handleIsDirty();
        onUnitChange && onUnitChange(v);
      }
    },
    [handleIsDirty, onUnitChange]
  );

  const validateMaxValueFormItem = useCallback(() => {
    const { maxValue, minValue } = formatData();
    let result = {
      validateStatus: validateStatus.success,
      help: "",
    };
    const help = translate(i18n, i18nMap.i18n.ERROR_COMMON_TEXT);
    if (isEmptyValue(maxValue)) {
      result = {
        validateStatus: validateStatus.error,
        help,
      };
    } else {
      if (!isEmptyValue(minValue)) {
        if ((maxValue as number) < (minValue as number)) {
          result = {
            validateStatus: validateStatus.error,
            help,
          };
        }
      }
    }
    return result;
  }, [i18n, formatData]);

  const validateMinValueFormItem = useCallback(() => {
    const { maxValue, minValue } = formatData();
    let result = {
      validateStatus: validateStatus.success,
      help: "",
    };
    const help = translate(i18n, i18nMap.i18n.ERROR_COMMON_TEXT);
    if (isEmptyValue(minValue)) {
      result = {
        validateStatus: validateStatus.error,
        help,
      };
    } else {
      if (!isEmptyValue(maxValue)) {
        if ((maxValue as number) < (minValue as number)) {
          result = {
            validateStatus: validateStatus.error,
            help,
          };
        }
      }
    }
    return result;
  }, [formatData, i18n]);

  // 验证
  const validate = useCallback(() => {
    const list = [validateMaxValueFormItem(), validateMinValueFormItem()];
    const validateResult = list.some((item) => item.validateStatus !== validateStatus.success);
    return !validateResult;
  }, [validateMaxValueFormItem, validateMinValueFormItem]);

  const _onOk = useCallback(() => {
    onOk && onOk();
  }, [onOk]);

  const { maxValue, minValue } = formatData();
  const maxValueValidate = isDirty ? validateMaxValueFormItem() : {};
  const minValueValidate = isDirty ? validateMinValueFormItem() : {};
  const disabled = isDirty ? !validate() : true;
  const isTimeAccurateText = isNumeric(maxValue) && isNumeric(minValue);

  return (
    <>
      <div className={styles.wrapper}>
        <span className={styles.prefixText}>{translate(i18n, i18nMap.i18n.THE_LAST)}</span>
        <Form.Item {...maxValueValidate} style={{ width: "60px" }}>
          <InputNumber
            style={{ width: "60px" }}
            min={Math.max(0, minValue || 0)}
            max={10000}
            parser={(value: string | undefined) => {
              if (value) {
                return value.replace(/\D/g, "");
              }
              return "";
            }}
            value={maxValue}
            onChange={onMaxValueChange}
          />
        </Form.Item>
        <span className={styles.lineText}>-</span>
        <Form.Item {...minValueValidate} style={{ width: "60px" }}>
          <InputNumber
            style={{ width: "60px" }}
            min={0}
            max={maxValue}
            parser={(value: string | undefined) => {
              if (value) {
                return value.replace(/\D/g, "");
              }
              return "";
            }}
            value={minValue}
            onChange={onMinValueChange}
          />
        </Form.Item>
        <TimeUnitSelect
          style={{ width: "105px", marginLeft: 8 }}
          value={unit}
          onChange={_onUnitChange}
        />
        <span className={styles.suffixText}>{translate(i18n, i18nMap.i18n.BETWEEN)}</span>
      </div>
      {isTimeAccurateText && (
        <TimeAccurateText {...calculateFreeTimeBetween(maxValue, minValue, unit)} />
      )}
      <OperateBtn disabled={disabled} onOk={_onOk} />
    </>
  );
};

export default FreeIntervalTimeFormItem;
