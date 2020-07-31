import React, { useState, useCallback, useMemo, useEffect } from "react";
import cls from "classnames";
import { Dropdown, Icon } from "@shuyun-ep-team/kylin-ui";
import { antPrefix } from "@shuyun-ep-team/kylin-ui/es/styles/vars";
import { createUseStyles } from "react-jss";
import IntervalTime from "./components/interval-time";
import { IIntervalTimeSelectValue, TTrigger } from "../../types";
import { pureTimePointJson, operatorJson } from "../../helpers/constant";
import { handleDataFormatTime } from "../../../../helpers/handle-data";
import { TLanguage } from "../../../../types/language";
import { getCurLanguage } from "../../i18n";
import { RootI18nContext } from "../../../../contexts";
import * as styles from "./index.jss";

const useStyles = createUseStyles(styles);

export interface IProps {
  /**使用语言 */
  language?: TLanguage;
  placeholder?: string;
  disabled?: boolean;
  trigger?: TTrigger;
  style?: React.CSSProperties;
  value?: IIntervalTimeSelectValue;
  onChange: (v: IIntervalTimeSelectValue) => void;
  onVisibleChange?: (visible: boolean) => void;
}

export const IntervalTimeSelector = (props: IProps) => {
  const {
    language,
    onVisibleChange,
    onChange,
    disabled,
    style,
    trigger,
    placeholder,
    ...restProps
  } = props;
  const { value, operator = operatorJson.GE_LE } = props?.value || {};
  const styles = useStyles();
  const [i18nMap, setI18nMap] = useState({});
  const [visible, setVisible] = useState(false);

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

  // 外部文案
  const getShowText = useCallback(() => {
    let text = "";
    if (Array.isArray(value) && value.length === 2) {
      const [beforeTime, afterTime] = value;
      text = `${handleDataFormatTime(beforeTime)}${
        pureTimePointJson[operator]
      }${handleDataFormatTime(afterTime)}`;
    }
    return text;
  }, [value, operator]);

  const onOk = useCallback(
    (res: IIntervalTimeSelectValue) => {
      onChange && onChange(res);
      handleVisibleChange(false);
    },
    [onChange, handleVisibleChange]
  );

  const overlay = useMemo(
    () => (
      <div>
        {visible && (
          <div className={styles.overlayWrapper}>
            <RootI18nContext.Provider value={{ i18n: i18nMap } as any}>
              <IntervalTime value={props.value} onOk={onOk} />
            </RootI18nContext.Provider>
          </div>
        )}
      </div>
    ),
    [visible, props?.value]
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
            <span className={styles.showName}>{showText}</span>
          ) : (
            <span className={styles.placeHolder}>{placeholder}</span>
          )}
          <Icon className={`${antPrefix}-select-arrow`} type="down" />
        </div>
      </div>
    </Dropdown>
  );
};

IntervalTimeSelector.defaultProps = {
  trigger: ["click"] as TTrigger,
};
export default IntervalTimeSelector;
