import React, { useState, useCallback, useMemo, useRef, useEffect, Ref } from "react";
import { createUseStyles } from "react-jss";
import cls from "classnames";
import { antPrefix } from "@shuyun-ep-team/kylin-ui/es/styles/vars";
import { Dropdown, Tooltip, message } from "@shuyun-ep-team/kylin-ui";
import DTDateIcon from "@shuyun-ep-team/icons/react/DTDate";
import DTDateTimeIcon from "@shuyun-ep-team/icons/react/DTDateTime";
import DTTimeIcon from "@shuyun-ep-team/icons/react/DTTime";
import DragIcon from "@shuyun-ep-team/icons/react/Drag";
import CloseIcon from "@shuyun-ep-team/icons/react/Close";
import { languageDefault } from "../../constants/language";
import DateTimePicker from "./date-time-picker";
import {
  TDateTimeSelectValue,
  TDateTimeSelectValueItem,
  TDateTimeSelectTrigger,
  TDateTimeSelectType,
} from "./type";
import {
  handleDataFormatDate,
  handleDataFormatDateTime,
  handleDataFormatTime,
} from "../../helpers/handle-data";
import { timeTypeJson, timeTypeDefault } from "./constant";
import { TLanguage } from "../../types/language";
import * as styles from "./index.jss";

const useStyles = createUseStyles(styles);

export interface IProps {
  /**使用语言 */
  language?: TLanguage;
  /**是否禁用 */
  disabled?: boolean;
  /**触发下拉的行为 */
  trigger?: TDateTimeSelectTrigger;
  /**样式设置 */
  style?: React.CSSProperties;
  /**时间类型*/
  timeType?: TDateTimeSelectType;
  /**内容 */
  value?: TDateTimeSelectValue;
  /**内容变化时的回调 */
  onChange?: (v: TDateTimeSelectValue) => void;
  /**菜单显示状态改变时调用，参数为 visible */
  onVisibleChange?: (visible: boolean) => void;
  /** 外部验证函数 */
  validator?: (
    values: TDateTimeSelectValue,
    value: TDateTimeSelectValueItem,
    callback: (msg?: string) => void
  ) => void;
  /** 内部使用 */
  forwardRef?: Ref<any>;
}

const minHeightValue = 32;
const additionStyle = { height: `${minHeightValue}px`, overflow: "hidden" };

/**
 * 支持date(默认),dateTime,time三种类型
 *
 * ### 引用方法
 *
 * ~~~js
 * import { MultipleDateTimeSelect } from 'kzf-business-components'
 * ~~~
 */
export const MultipleDateTimeSelect = (props: IProps) => {
  const {
    value,
    onChange,
    style,
    onVisibleChange,
    disabled,
    trigger,
    timeType,
    language,
    validator,
    forwardRef,
    ...restProps
  } = props;
  const styles = useStyles();
  const listRef = useRef<HTMLDivElement>(null);

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [moreIconVisible, setMoreIconVisible] = useState(false);
  // 是否处于展开日期选择状态
  const [isOpenDateChoose, setIsOpenDateChoose] = useState(false);
  const [selectorStyle, setSelectorStyle] = useState({});

  const curStyle = useMemo(() => {
    return style ? style : {};
  }, [style]);
  const curValue = useMemo(() => {
    return Array.isArray(value) ? value : [];
  }, [value]);
  const curTimeType = useMemo(() => {
    return (timeType || timeTypeDefault) as TDateTimeSelectType;
  }, [timeType]);

  const getListClientHeight = useCallback(
    function () {
      return new Promise<number>((resolve) => {
        setTimeout(() => {
          resolve(listRef.current?.clientHeight);
        }, 100);
      });
    },
    [curValue]
  );

  useEffect(() => {
    getListClientHeight().then((res) => {
      if (!isOpenDateChoose) {
        if (res > minHeightValue) {
          setSelectorStyle(additionStyle);
          setMoreIconVisible(true);
        } else {
          setMoreIconVisible(false);
        }
      } else {
        if (res <= minHeightValue) {
          setIsOpenDateChoose(false);
        }
      }
    });
  }, [curValue, isOpenDateChoose]);

  const handleTimeSelectOk = useCallback(
    (value) => {
      if (value && onChange) {
        if (validator) {
          validator(curValue, value, (msg?: string) => {
            if (msg) {
              message.error(msg);
            } else {
              const result = [...curValue, value];
              onChange(result);
              setOverlayVisible(false);
              onVisibleChange && onVisibleChange(false);
            }
          });
        } else {
          const result = [...curValue, value];
          onChange(result);
          setOverlayVisible(false);
          onVisibleChange && onVisibleChange(false);
        }
      }
    },
    [curValue, validator, onChange]
  );

  const overlay = useMemo(() => {
    return overlayVisible ? (
      <DateTimePicker language={language} timeType={curTimeType} onOk={handleTimeSelectOk} />
    ) : (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <></>
    );
  }, [overlayVisible, language]);

  const onCloseIconClick = useCallback(
    (index) => (e: any) => {
      e.stopPropagation();
      const result = [...curValue];
      result.splice(index, 1);
      onChange && onChange(result);
    },
    [curValue]
  );

  const formatDateTimeFn = useCallback(
    (v) => {
      let result = "";
      if (v) {
        if (curTimeType === timeTypeJson.date) {
          result = handleDataFormatDate(v);
        } else if (curTimeType === timeTypeJson.dateTime) {
          result = handleDataFormatDateTime(v);
        } else if (curTimeType === timeTypeJson.time) {
          result = handleDataFormatTime(v);
        }
      }
      return result;
    },
    [curTimeType]
  );

  const dateTimeIcon = useMemo(() => {
    let result;
    if (curTimeType === timeTypeJson.date) {
      result = <DTDateIcon className={styles.dateIcon} />;
    } else if (curTimeType === timeTypeJson.dateTime) {
      result = <DTDateTimeIcon className={styles.dateIcon} />;
    } else if (curTimeType === timeTypeJson.time) {
      result = <DTTimeIcon className={styles.dateIcon} />;
    }
    return result;
  }, [curTimeType]);

  const onListItemClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const listItems = useMemo(() => {
    return curValue.reduce(
      (pre: Array<React.ReactElement>, cur: TDateTimeSelectValueItem, index: number) => {
        const formatDateTime = formatDateTimeFn(cur);
        return [
          ...pre,
          <div className={styles.listItemWrapper} key={formatDateTime}>
            <div className={styles.listItem} onClick={onListItemClick}>
              <span>{formatDateTime}</span>
              <div className={styles.closeIconWrapper}>
                <CloseIcon className={styles.closeIcon} onClick={onCloseIconClick(index)} />
              </div>
            </div>
          </div>,
        ];
      },
      []
    );
  }, [curValue, onListItemClick]);

  const onMoreIconClick = useCallback((e) => {
    e.stopPropagation();
    setMoreIconVisible(false);
    setIsOpenDateChoose(true);
    setSelectorStyle({});
    setOverlayVisible(false);
  }, []);

  const onDateIconClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const onBlankClick = useCallback(
    (e) => {
      if (isOpenDateChoose) {
        e.stopPropagation();
        getListClientHeight().then((res) => {
          if (res > minHeightValue) {
            setSelectorStyle(additionStyle);
            setMoreIconVisible(true);
          } else {
            setMoreIconVisible(false);
          }
        });
        setIsOpenDateChoose((v) => !v);
      }
    },
    [isOpenDateChoose]
  );

  const tooltipTitle = useMemo(() => {
    return curValue
      .reduce((pre: Array<string>, cur: TDateTimeSelectValueItem) => {
        return [...pre, formatDateTimeFn(cur)];
      }, [])
      .join("、");
  }, [curValue]);

  return (
    <span ref={forwardRef}>
      <Dropdown
        overlay={overlay}
        visible={overlayVisible}
        onVisibleChange={(v) => {
          setOverlayVisible(v);
          onVisibleChange && onVisibleChange(v);
        }}
        trigger={trigger}
        disabled={disabled}
        getPopupContainer={(triggerNode) => triggerNode}
      >
        <Tooltip title={tooltipTitle}>
          <div {...restProps} style={curStyle}>
            <div
              className={cls(`${antPrefix}-select-selection`, styles.selectorWrapper, { disabled })}
              style={selectorStyle}
              onClick={onBlankClick}
            >
              <div ref={listRef} className={styles.list} onClick={onBlankClick}>
                {listItems}
              </div>
              <div className={styles.operateWrapper}>
                {moreIconVisible && (
                  <div
                    className={cls(`${antPrefix}-select-arrow`, styles.moreIconWrapper)}
                    onClick={onMoreIconClick}
                  >
                    <DragIcon className={styles.moreIcon} />
                  </div>
                )}
                <div
                  className={cls(`${antPrefix}-select-arrow`, styles.dateIconWrapper)}
                  onClick={onDateIconClick}
                >
                  {dateTimeIcon}
                </div>
              </div>
            </div>
          </div>
        </Tooltip>
      </Dropdown>
    </span>
  );
};

MultipleDateTimeSelect.defaultProps = {
  language: languageDefault,
  disabled: false,
  trigger: ["click"],
  timeType: timeTypeDefault,
};
export default MultipleDateTimeSelect;
