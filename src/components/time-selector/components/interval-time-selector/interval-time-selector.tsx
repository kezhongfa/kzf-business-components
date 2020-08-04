import React, { useState, useCallback, useMemo, useEffect, Ref } from "react";
import cls from "classnames";
import { Dropdown, Icon, Popover } from "@shuyun-ep-team/kylin-ui";
import { antPrefix } from "@shuyun-ep-team/kylin-ui/es/styles/vars";
import { createUseStyles } from "react-jss";
import IntervalTime from "./components/interval-time";
import { IIntervalTimeSelectValue, TTrigger } from "../../types";
import { pureTimePointJson, operatorJson } from "../../helpers/constant";
import { handleDataFormatTime } from "../../../../helpers/handle-data";
import { TLanguage } from "../../../../types/language";
import { getCurLanguage } from "../../i18n";
import { RootI18nContext } from "../../../../contexts";
import { languageDefault } from "../../../../constants/language";
import * as styles from "./index.jss";

const useStyles = createUseStyles(styles);

export interface IProps {
  /**使用语言 */
  language?: TLanguage;
  /** 提示 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /**触发下拉的行为 */
  trigger?: TTrigger;
  /**样式设置 */
  style?: React.CSSProperties;
  /**内容 */
  value?: IIntervalTimeSelectValue;
  /**内容变化时的回调 */
  onChange?: (v: IIntervalTimeSelectValue) => void;
  /**菜单显示状态改变时调用，参数为 visible */
  onVisibleChange?: (visible: boolean) => void;
  /** 内部使用 */
  forwardRef?: Ref<any>;
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
    forwardRef,
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
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {visible && (
          <div className={styles.overlayWrapper}>
            <RootI18nContext.Provider value={{ i18n: i18nMap }}>
              <IntervalTime value={props.value} onOk={onOk} />
            </RootI18nContext.Provider>
          </div>
        )}
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [visible, props?.value, i18nMap, onOk]
  );

  const showText = getShowText();
  return (
    <span ref={forwardRef}>
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
    </span>
  );
};

IntervalTimeSelector.defaultProps = {
  language: languageDefault,
  trigger: ["click"],
  disabled: false,
  placeholder: "",
  style: {},
};
export default IntervalTimeSelector;
