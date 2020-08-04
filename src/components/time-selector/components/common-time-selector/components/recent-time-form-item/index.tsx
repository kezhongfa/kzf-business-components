import React, { useState, useCallback, useContext } from "react";
import { InputNumber, Checkbox, Form } from "@shuyun-ep-team/kylin-ui";
import { createUseStyles } from "react-jss";
import TimeUnitSelect from "../time-unit-select";
import TimeAccurateText from "../time-accurate-text";
import OperateBtn from "../operator-btn";
import { TUnit, validateStatus } from "../../../../types";
import { unitTextJson } from "../../../../helpers/constant";
import { calculateRecentTime } from "../../../../helpers/time";
import { isNumeric, isEmptyValue } from "../../../../../../helpers";
import { translate } from "../../../../../../helpers/translate";
import * as i18nMap from "../../../../i18n.map";
import { RootI18nContext } from "../../../../../../contexts";
import * as styles from "./index.jss";

const useStyles = createUseStyles(styles);

interface IProps {
  value?: number;
  includeCurrentPeriod?: boolean;
  unit?: TUnit;
  onValueChange?: (v: number) => void;
  onUnitChange?: (v: TUnit) => void;
  onIncludeCurrentPeriodChange?: (v: boolean) => void;
  onOk?: () => void;
}

const RecentTimeFormItem = (props: IProps) => {
  const {
    onValueChange,
    onUnitChange,
    onIncludeCurrentPeriodChange,
    onOk,
    value,
    includeCurrentPeriod,
    unit,
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

  const _onValueChange = useCallback(
    (v?: number) => {
      if (isNumeric(v)) {
        handleIsDirty();
        onValueChange && onValueChange(v!);
      }
    },
    [onValueChange, handleIsDirty]
  );
  const _onUnitChange = useCallback(
    (v: TUnit) => {
      if (v) {
        handleIsDirty();
        onUnitChange && onUnitChange(v);
      }
    },
    [onUnitChange, handleIsDirty]
  );
  const _onIncludeCurrentPeriodChange = useCallback(
    (e: { target: { checked: boolean } }) => {
      handleIsDirty();
      onIncludeCurrentPeriodChange && onIncludeCurrentPeriodChange(e.target.checked);
    },
    [handleIsDirty, onIncludeCurrentPeriodChange]
  );

  const validateFormItem = useCallback(() => {
    let result = {
      validateStatus: validateStatus.success,
      help: "",
    };
    const help = translate(i18n, i18nMap.i18n.ERROR_COMMON_TEXT);
    if (isEmptyValue(value)) {
      result = {
        validateStatus: validateStatus.error,
        help,
      };
    }
    return result;
  }, [i18n, value]);

  const _onOk = useCallback(() => {
    onOk && onOk();
  }, [onOk]);

  const isTimeAccurateText = isNumeric(value);
  const validateResult = isDirty ? validateFormItem() : { help: "" };
  const disabled = isDirty ? !isEmptyValue(validateResult.help) : true;
  const unitText = unit ? unitTextJson[unit] : "";

  return (
    <>
      <div className={styles.wrapper}>
        <Form.Item {...validateResult} style={{ width: "90px" }}>
          <InputNumber
            style={{ width: "90px" }}
            min={1}
            max={10000}
            parser={(value: string | undefined) => {
              if (value) {
                return value.replace(/\D/g, "");
              }
              return "";
            }}
            value={value}
            onChange={_onValueChange}
          />
        </Form.Item>
        <Form.Item style={{ width: "122px", marginLeft: "8px" }}>
          <TimeUnitSelect style={{ width: "122px" }} value={unit} onChange={_onUnitChange} />
        </Form.Item>
      </div>
      <div className={styles.checkboxWrapper}>
        <Checkbox checked={includeCurrentPeriod} onChange={_onIncludeCurrentPeriodChange}>
          {translate(i18n, i18nMap.i18n.INCLUDE)}
          {translate(i18n, i18nMap.i18n.THIS)}
          {translate(i18n, unitText)}
        </Checkbox>
      </div>
      {isTimeAccurateText && (
        <TimeAccurateText {...calculateRecentTime(value, unit as TUnit, includeCurrentPeriod)} />
      )}
      <OperateBtn disabled={disabled} onOk={_onOk} />
    </>
  );
};

export default RecentTimeFormItem;
