import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import { createUseStyles } from "react-jss";
import { message, Popover } from "@shuyun-ep-team/kylin-ui";
import Select, { ISelectProps } from "@shuyun-ep-team/kylin-ui/es/select";
import Close from "@shuyun-ep-team/icons/react/Close";
import * as styles from "./index.jss";

const { Option } = Select;

const useStyles = createUseStyles(styles);

type tValue = string[];
export interface IProps extends Omit<ISelectProps, "onChange"> {
  language?: string;
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
    onInputKeyDown,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...restProps
  } = props;
  const styles = useStyles();
  const selectRef = useRef<HTMLSelectElement>();
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
        const value = (e.target as HTMLInputElement).value;
        if (value) {
          if (curValue.includes(value)) {
            message.error("有重复项");
            return;
          }
          handleChange([...curValue, value]);
          selectRef.current?.blur();
          setTimeout(() => {
            selectRef.current?.focus();
          }, timeoutDefault);
        }
      }
    },
    [curValue]
  );

  const handleChange = useCallback((value: tValue) => {
    const { onChange } = props;
    onChange && onChange(value);
  }, []);

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
      getPopupContainer={(triggerNode: HTMLElement) =>
        triggerNode.parentNode as HTMLElement
      }
    >
      <Select
        {...restProps}
        ref={selectRef}
        className={styles.select}
        dropdownClassName={styles.selectDropdown}
        placeholder={placeholder || "输入关键字，回车分割"}
        dropdownStyle={{ zIndex: zIndex + 10 }}
        menuItemSelectedIcon={<Close style={{ color: "#999", fontSize: 12 }} />}
        mode="multiple"
        value={curValue}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
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
          onBlur && onBlur(curValue);
          setPopoverVisible(false);
        }}
        onInputKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          onInputKeyDown && onInputKeyDown(e);
          onCurrentInputKeyDown(e);
        }}
        onChange={(value: any) => handleChange(value)}
        notFoundContent={null}
      >
        {options}
      </Select>
    </Popover>
  );
};

MultipleEnterInputSelect.defaultProps = {
  zIndex: zIndexDefault,
};
export default MultipleEnterInputSelect;
