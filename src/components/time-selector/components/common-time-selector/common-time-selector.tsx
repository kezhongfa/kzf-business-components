import React, { useState, useCallback, useEffect, useMemo } from "react";
import cls from "classnames";
import { Dropdown, Icon, Popover } from "@shuyun-ep-team/kylin-ui";
import { antPrefix } from "@shuyun-ep-team/kylin-ui/es/styles/vars";
import { createUseStyles } from "react-jss";
import CommonTime from "./components/common-time";
import { ICommonTimeSelectValue, TTrigger, TCommonTimeType } from "../../types";
import { timeSelectType as tsType, unitTextJson, operatorJson } from "../../helpers/constant";
import { isNumeric, isEmptyValue } from "../../../../helpers";
import { calculateFreeTimeBetween } from "../../helpers/time";
import { handleDataFormatDate, handleDataFormatDateTime } from "../../../../helpers/handle-data";
import { translate } from "../../../../helpers/translate";
import * as i18nMapIndex from "../../i18n.map";
import { TLanguage } from "../../../../types/language";
import { getCurLanguage } from "../../i18n";
import { RootI18nContext } from "../../../../contexts";
import { languageDefault } from "../../../../constants/language";
import * as styles from "./index.jss";

const useStyles = createUseStyles(styles);

export interface IProps {
  /**使用语言 */
  language?: TLanguage;
  disabled?: boolean;
  trigger?: TTrigger;
  style?: React.CSSProperties;
  timeType?: TCommonTimeType;
  placeholder?: string;
  value?: ICommonTimeSelectValue;
  onChange?: (v: ICommonTimeSelectValue) => void;
  onVisibleChange?: (visible: boolean) => void;
}

export const CommonTimeSelector = (props: IProps) => {
  const {
    language = languageDefault,
    trigger = ["click"],
    timeType = "date",
    disabled = false,
    onVisibleChange,
    onChange,
    style = {},
    placeholder = "",
    ...restProps
  } = props;
  const { value, operator, timeSelectType, unit } = props?.value || {};
  const styles = useStyles();
  const [visible, setVisible] = useState(false);
  const [i18nMap, setI18nMap] = useState({});

  useEffect(() => {
    getCurLanguage(language).then((res) => {
      setI18nMap(res);
    });
  }, [language]);

  const handleVisibleChange = useCallback(
    (v: boolean) => {
      setVisible(v);
      onVisibleChange && onVisibleChange(v);
    },
    [onVisibleChange]
  );
  const onOk = useCallback(
    (res: ICommonTimeSelectValue) => {
      if (res) {
        onChange && onChange(res);
        setVisible(false);
      }
    },
    [onChange]
  );
  // 外层展示
  const getShowText = useCallback(() => {
    let result = "";
    if (timeSelectType === tsType.ALL_TIME) {
      result = translate(i18nMap, i18nMapIndex.i18n.ALL_TIME);
    } else if (timeSelectType === tsType.RECENT_TIME) {
      if (isNumeric(value) && unit !== undefined) {
        result =
          translate(i18nMap, i18nMapIndex.i18n.RECENT_TIME) +
          value +
          translate(i18nMap, unitTextJson[unit]);
      }
    } else if (timeSelectType === tsType.BEFORE_DEADLINE_TIME) {
      if (isNumeric(value) && unit !== undefined) {
        result = `${translate(i18nMap, i18nMapIndex.i18n.DEAD_LINE)}${value}${translate(
          i18nMap,
          unitTextJson[unit]
        )}${translate(i18nMap, i18nMapIndex.i18n.OF_BEFORE)}`;
      }
    } else if (timeSelectType === tsType.FIXED_POINT_TIME) {
      if (Array.isArray(value) && operator !== undefined) {
        const [beforeTime, afterTime] = value;
        const bt =
          timeType === "date"
            ? handleDataFormatDate(beforeTime)
            : handleDataFormatDateTime(beforeTime);
        const at =
          timeType === "date"
            ? handleDataFormatDate(afterTime)
            : handleDataFormatDateTime(afterTime);
        if (operator === operatorJson.GE_LE) {
          result = bt + " - " + at;
        } else if (operator === operatorJson.EQ) {
          result = translate(i18nMap, i18nMapIndex.i18n.EQ) + bt;
        } else if (operator === operatorJson.NE) {
          result = translate(i18nMap, i18nMapIndex.i18n.NE) + bt;
        } else if (operator === operatorJson.LE) {
          result = translate(i18nMap, i18nMapIndex.i18n.LE) + bt;
        } else if (operator === operatorJson.GE) {
          result = bt + translate(i18nMap, i18nMapIndex.i18n.TO_NOW);
        }
      }
    } else if (timeSelectType === tsType.FREE_INTERVAL_TIME) {
      if (!isEmptyValue(value) && unit !== undefined) {
        const [max, min] = value as [number, number];
        const { describe, suffixText, time } = calculateFreeTimeBetween(i18nMap, max, min, unit);

        result = describe ? `${describe}${suffixText}` : time;
      }
    }
    return result;
  }, [value, operator, timeSelectType, unit, timeType, i18nMap]);

  const overlay = useMemo(
    () => (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {visible && (
          <div className={styles.overlayWrapper}>
            <RootI18nContext.Provider value={{ i18n: i18nMap }}>
              <CommonTime value={props?.value} timeType={timeType} onOk={onOk} />
            </RootI18nContext.Provider>
          </div>
        )}
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visible, props?.value, i18nMap, onOk, timeType, styles.overlayWrapper]
  );
  const showText = getShowText();

  return (
    <Dropdown
      overlay={overlay}
      visible={visible}
      trigger={trigger}
      onVisibleChange={handleVisibleChange}
      disabled={disabled}
      getPopupContainer={(triggerNode) => triggerNode}
    >
      <div className={cls(styles.selectorWrapper, { disabled })} {...restProps} style={style}>
        <div className={styles.select}>
          {showText ? (
            <Popover content={showText}>
              <span className={styles.showName}>{showText}</span>
            </Popover>
          ) : (
            <span className={styles.placeHolder}>{placeholder}</span>
          )}
          <Icon className={`${antPrefix}-select-arrow`} type="down" />
        </div>
      </div>
    </Dropdown>
  );
};

CommonTimeSelector.defaultProps = {
  language: languageDefault,
  trigger: ["click"],
  disabled: false,
  placeholder: "",
  style: {},
  timeType: "date",
};

export default CommonTimeSelector;
