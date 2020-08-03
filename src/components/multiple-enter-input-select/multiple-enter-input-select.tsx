import React, { useCallback, useRef, useMemo, useState, useEffect, Ref } from "react";
import { createUseStyles } from "react-jss";
import { message, Popover } from "@shuyun-ep-team/kylin-ui";
import Select, { ISelectProps } from "@shuyun-ep-team/kylin-ui/es/select";
import Close from "@shuyun-ep-team/icons/react/Close";
import { languageDefault } from "../../constants/language";
import { isNumeric } from "../../helpers";
import { translate } from "../../helpers/translate";
import { TLanguage } from "../../types/language";
import { getCurLanguage } from "./i18n";
import * as styles from "./index.jss";

const { Option } = Select;
const useStyles = createUseStyles(styles);

export type tValue = Array<string | number>;
export type tValueType = "string" | "number";
export type tSpaceKeyValue = string[] | string;
export interface IProps extends Omit<ISelectProps, "value"> {
  /**使用语言 */
  language?: TLanguage;
  /** 输入类型 */
  valueType?: tValueType;
  /** 值类型 */
  value?: tValue;
  /** z-index */
  zIndex?: number;
  /**是否启用空格键 */
  isSpaceKeyEnable?: boolean;
  /**启用空格键后,自定义的值 */
  spaceKeyValue?: tSpaceKeyValue;
  /** 外部验证函数 */
  validator?: (values: tValue, value: string | number, callback: (msg?: string) => void) => void;
  /** 内部使用 */
  forwardRef?: Ref<any>;
}

const zIndexDefault = 1000;
const timeoutDefault = 500;
const spaceKeyValueDefault = ["#null#"];

/**
 * 1.支持number和string类型
 * 2.支持启用空格键,自定义值
 *
 * ### 引用方法
 *
 * ~~~js
 * import { MultipleEnterInputSelect } from 'kzf-business-components'
 * ~~~
 */
export const MultipleEnterInputSelect = (props: IProps) => {
  const {
    isSpaceKeyEnable,
    spaceKeyValue,
    value,
    language = languageDefault,
    valueType,
    zIndex = zIndexDefault,
    validator,
    placeholder,
    onInputKeyDown,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    forwardRef,
    ...restProps
  } = props;
  const styles = useStyles();
  const selectRef = useRef<HTMLSelectElement>();

  const [i18n, setI18n] = useState({});
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [isEnterSpace, setIsEnterSpace] = useState(false);

  const curValue = useMemo(() => {
    if (Array.isArray(value)) {
      const values = value.map((item: string | number) => `${item}`);
      return [...new Set(values)];
    }
    return [];
  }, [value]);

  const curSpaceValue = useMemo(() => {
    if (Array.isArray(spaceKeyValue) && spaceKeyValue.length > 0) {
      return spaceKeyValue;
    }

    return spaceKeyValue ? [spaceKeyValue] : spaceKeyValueDefault;
  }, [spaceKeyValue]);

  useEffect(() => {
    getCurLanguage(language).then((res) => {
      setI18n(res);
    });
  }, [language]);

  useEffect(() => {
    if (curValue.length <= 0) {
      setPopoverVisible(false);
    }
  }, [curValue]);

  const handleChange = useCallback(
    (v) => {
      const { onChange } = props;
      setIsEnterSpace(false);
      if (onChange) {
        let values = v || [];
        if (valueType === "number") {
          values = values.map((item: string | number) => {
            if (isNumeric(item)) {
              return Number(item);
            }
            return item;
          });
        }
        //@ts-ignore
        onChange(values);
      }
    },
    [valueType, props]
  );

  const onCurrentInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        const val = (e.target as HTMLInputElement).value;
        if (val) {
          if (valueType === "number") {
            if (!isNumeric(val) || val.includes("+")) {
              message.error(translate(i18n, "MultipleEnterInputSelect.Message.Error.EnterNumber"));
              return;
            }
          }
          if (curValue.includes(val)) {
            message.error(translate(i18n, "MultipleEnterInputSelect.Message.Error.Duplicate"));
            return;
          }

          if (validator) {
            validator(curValue, val, (msg?: string) => {
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
    [curValue, validator, valueType, handleChange, i18n]
  );

  const options = useMemo(() => {
    if (isSpaceKeyEnable && isEnterSpace) {
      return curSpaceValue.map((d) => <Option key={`${d}`}>{d}</Option>);
    }
    return curValue.map((d) => <Option key={d}>{d}</Option>);
  }, [curValue, curSpaceValue, isEnterSpace, isSpaceKeyEnable]);

  const popoverContent = useMemo(() => {
    return curValue.join("、");
  }, [curValue]);

  return (
    <span ref={forwardRef}>
      <Popover
        content={popoverContent}
        visible={popoverVisible}
        getPopupContainer={(triggerNode: HTMLElement) => triggerNode.parentNode as HTMLElement}
      >
        <Select
          {...restProps}
          ref={selectRef}
          className={isEnterSpace ? "" : styles.select}
          dropdownClassName={isEnterSpace ? "" : styles.selectDropdown}
          placeholder={placeholder || translate(i18n, "MultipleEnterInputSelect.Placeholder")}
          dropdownStyle={{ zIndex: zIndex! + 10 }}
          menuItemSelectedIcon={
            isEnterSpace ? undefined : <Close style={{ color: "#999", fontSize: 12 }} />
          }
          mode="multiple"
          value={curValue as any}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onChange={(v) => handleChange(v)}
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
            setIsEnterSpace(false);
          }}
          onInputKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            onInputKeyDown && onInputKeyDown(e);
            !isEnterSpace && onCurrentInputKeyDown(e);
          }}
          onSearch={(value: string) => {
            if (isSpaceKeyEnable) {
              setIsEnterSpace(value === " ");
            }
          }}
          notFoundContent={null}
        >
          {options}
        </Select>
      </Popover>
    </span>
  );
};

MultipleEnterInputSelect.defaultProps = {
  zIndex: zIndexDefault,
  language: languageDefault,
  valueType: "string",
  value: [],
  isSpaceKeyEnable: false,
  spaceKeyValue: spaceKeyValueDefault,
};

export default MultipleEnterInputSelect;
