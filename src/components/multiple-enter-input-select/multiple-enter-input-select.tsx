import React, { useCallback, useRef, useMemo, useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { message, Popover } from "@shuyun-ep-team/kylin-ui";
import Select, { ISelectProps } from "@shuyun-ep-team/kylin-ui/es/select";
import Close from "@shuyun-ep-team/icons/react/Close";
import { isString } from "@shuyun-ep-team/utils/es/type";
import { isNumeric } from "../../helpers";
import { translate } from "../../helpers/translate";
import { TLanguage } from "../../types/language";
import { languageJson } from "../../constants/language";
import * as styles from "./index.jss";
import { getCurLanguage } from "./i18n";

const { Option } = Select;
const { zhCN } = languageJson;
const useStyles = createUseStyles(styles);

export type tValue = Array<string | number>;
export type tValueType = "string" | "number";
export interface IProps extends Omit<ISelectProps, "onChange"> {
  /**设置组件使用语言 */
  language?: TLanguage;
  valueType?: tValueType;
  validator?: (value: string | number, callback: (msg?: string) => void) => void;
  onChange?: (v: tValue) => void;
  zIndex?: number;
}

const zIndexDefault = 1000;
const timeoutDefault = 500;

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'kzf-business-components'
 * ~~~
 */
export const MultipleEnterInputSelect = (props: IProps) => {
  const {
    placeholder,
    zIndex = zIndexDefault,
    value,
    valueType = "string",
    validator,
    onInputKeyDown,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    language,
    ...restProps
  } = props;
  const styles = useStyles();
  const selectRef = useRef<HTMLSelectElement>();
  const i18n = useMemo(() => getCurLanguage(language), [language]);
  const [popoverVisible, setPopoverVisible] = useState(false);

  const curValue = useMemo(() => {
    return (Array.isArray(value) ? value : []) as tValue;
  }, [value]);

  useEffect(() => {
    if (curValue.length <= 0) {
      setPopoverVisible(false);
    }
  }, [curValue]);

  const onCurrentInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        let val: string | number = (e.target as HTMLInputElement).value;
        if (val) {
          if (valueType === "number") {
            if (!isNumeric(val) || val.includes("+")) {
              message.error(translate(i18n, "MultipleEnterInputSelect.Message.Error.EnterNumber"));
              return;
            }
            val = Number(val);
          }
          if (curValue.includes(val)) {
            message.error(translate(i18n, "MultipleEnterInputSelect.Message.Error.Duplicate"));
            return;
          }

          if (validator) {
            validator(val, (msg?: string) => {
              if (msg) {
                message.error(msg);
              } else {
                handleChange([...curValue, val]);
                selectRef.current?.blur();
                setTimeout(() => {
                  selectRef.current?.focus();
                }, timeoutDefault);
              }
            });
          } else {
            handleChange([...curValue, val]);
            selectRef.current?.blur();
            setTimeout(() => {
              selectRef.current?.focus();
            }, timeoutDefault);
          }
        }
      }
    },
    [curValue, validator, valueType]
  );

  const handleChange = useCallback(
    (v: tValue) => {
      const { onChange } = props;
      if (onChange) {
        let values = v || [];
        if (valueType === "number") {
          values = values.filter((item: string | number) => !isString(item));
        }
        onChange(values);
      }
    },
    [props?.onChange]
  );

  const options = useMemo(() => {
    return curValue.map((d) => <Option key={d}>{d}</Option>);
  }, [curValue]);

  const popoverContent = useMemo(() => {
    return curValue.join("、");
  }, [curValue]);

  return (
    <Popover
      content={popoverContent}
      visible={popoverVisible}
      getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentNode as HTMLElement}
    >
      <Select
        {...restProps}
        ref={selectRef}
        className={styles.select}
        dropdownClassName={styles.selectDropdown}
        placeholder={placeholder || translate(i18n, "MultipleEnterInputSelect.Placeholder")}
        dropdownStyle={{ zIndex: zIndex + 10 }}
        menuItemSelectedIcon={<Close style={{ color: "#999", fontSize: 12 }} />}
        mode="multiple"
        value={curValue as any}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onChange={(v) => handleChange(v as any)}
        onMouseEnter={(e: React.MouseEvent<HTMLInputElement>) => {
          onMouseEnter && onMouseEnter(e);
          popoverContent && setPopoverVisible(true);
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLInputElement>) => {
          onMouseLeave && onMouseLeave(e);
          setPopoverVisible(false);
        }}
        onFocus={() => {
          onFocus && onFocus();
          setPopoverVisible(false);
        }}
        onBlur={() => {
          onBlur && onBlur(curValue as any);
          setPopoverVisible(false);
        }}
        onInputKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          onInputKeyDown && onInputKeyDown(e);
          onCurrentInputKeyDown(e);
        }}
        notFoundContent={null}
      >
        {options}
      </Select>
    </Popover>
  );
};

MultipleEnterInputSelect.defaultProps = {
  zIndex: zIndexDefault,
  language: zhCN,
};
export default MultipleEnterInputSelect;
