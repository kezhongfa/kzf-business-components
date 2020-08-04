import React, { useState, useContext, useCallback } from "react";
import { InputNumber, Form } from "@shuyun-ep-team/kylin-ui";
import { createUseStyles } from "react-jss";
import { RootI18nContext } from "../../../../../../contexts";
import TimeUnitSelect from "../time-unit-select";
import TimeAccurateText from "../time-accurate-text";
import OperateBtn from "../operator-btn";
import { TUnit, validateStatus } from "../../../../types";
import { unitJson } from "../../../../helpers/constant";
import { calculateBeforeDeadlineTime } from "../../../../helpers/time";
import { isEmptyValue, isNumeric } from "../../../../../../helpers";
import { translate } from "../../../../../../helpers/translate";
import * as i18nMap from "../../../../i18n.map";
import * as styles from "./index.jss";

const useStyles = createUseStyles(styles);

interface IProps {
  value?: number;
  unit?: TUnit;
  onValueChange?: (v: number) => void;
  onUnitChange?: (v: TUnit) => void;
  onOk?: () => void;
}

const BeforeDeadLineTimeFormItem = (props: IProps) => {
  const { value, onValueChange, onUnitChange, onOk, unit = unitJson.DAY as TUnit } = props;
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
  }, [value, i18n]);

  const _onOk = useCallback(() => {
    onOk && onOk();
  }, [onOk]);

  const validateResult = isDirty ? validateFormItem() : { help: "" };
  const disabled = isDirty ? !isEmptyValue(validateResult.help) : true;

  return (
    <>
      <div className={styles.wrapper}>
        <Form.Item {...validateResult} style={{ width: "76px" }}>
          <InputNumber
            style={{ width: "76px" }}
            min={0}
            max={10000}
            step={1}
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
        <Form.Item style={{ width: "105px", marginLeft: "8px" }}>
          <TimeUnitSelect style={{ width: "105px" }} value={unit} onChange={_onUnitChange} />
        </Form.Item>
        <span className={styles.text}>{translate(i18n, i18nMap.i18n.OF_BEFORE)}</span>
      </div>
      {value !== undefined && (
        <TimeAccurateText {...calculateBeforeDeadlineTime(i18n, value, unit)} />
      )}
      <OperateBtn disabled={disabled} onOk={_onOk} />
    </>
  );
};

export default BeforeDeadLineTimeFormItem;
