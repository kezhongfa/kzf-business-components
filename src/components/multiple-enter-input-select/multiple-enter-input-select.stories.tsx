import React, { useState, useCallback } from "react";
import { withKnobs, array, text } from "@storybook/addon-knobs";
import MultipleEnterInputSelect from "./multiple-enter-input-select";
import { isNumeric } from "src/helpers";
import { commonStoryWrapper } from "src/helpers/story";

export default {
  title: "多值回车输入组件",
  component: MultipleEnterInputSelect,
  decorators: [withKnobs, commonStoryWrapper],
};

/* 默认 */
export const TestDefault = () => {
  const [multipleEnterInputValue, setMultipleEnterInputValue] = useState(undefined);
  const onMultipleEnterInputValueChange = useCallback((v) => {
    setMultipleEnterInputValue(v);
    console.log("onMultipleEnterInputValueChange:", v);
  }, []);
  return (
    <MultipleEnterInputSelect
      style={{ width: 300 }}
      value={multipleEnterInputValue}
      onChange={onMultipleEnterInputValueChange}
    />
  );
};

TestDefault.story = {
  name: "默认",
};

/* number测试 */
export const TestNumber = () => {
  const [multipleEnterInputValue, setMultipleEnterInputValue] = useState(undefined);
  const onMultipleEnterInputValueChange = useCallback((v) => {
    setMultipleEnterInputValue(v);
    console.log("onMultipleEnterInputValueChange:", v);
  }, []);
  return (
    <MultipleEnterInputSelect
      style={{ width: 300 }}
      valueType="number"
      value={multipleEnterInputValue}
      onChange={onMultipleEnterInputValueChange}
    />
  );
};

TestNumber.story = {
  name: "number测试",
};

/* 外部验证测试 */
export const TestValidator = () => {
  const [multipleEnterInputValue, setMultipleEnterInputValue] = useState(undefined);
  const onMultipleEnterInputValueChange = useCallback((v) => {
    setMultipleEnterInputValue(v);
    console.log("onMultipleEnterInputValueChange:", v);
  }, []);

  const onValidateValue = useCallback((value: any, callback: any) => {
    if (!isNumeric(value) || Number.parseFloat(value) < 0) {
      callback("必须输入正数");
    } else {
      callback();
    }
  }, []);

  return (
    <MultipleEnterInputSelect
      style={{ width: 300 }}
      valueType="number"
      validator={onValidateValue}
      value={multipleEnterInputValue}
      onChange={onMultipleEnterInputValueChange}
    />
  );
};

TestValidator.story = {
  name: "外部验证测试",
};

/* 空格键功能测试 */
export const TestSpace = () => {
  const [multipleEnterInputValue, setMultipleEnterInputValue] = useState(undefined);
  const onMultipleEnterInputValueChange = useCallback((v) => {
    setMultipleEnterInputValue(v);
    console.log("onMultipleEnterInputValueChange:", v);
  }, []);
  return (
    <MultipleEnterInputSelect
      style={{ width: 300 }}
      //@ts-ignore
      language={text("kk", "zh-CN")}
      isSpaceKeyEnable={true}
      spaceKeyValue={array("spaceKeyValue", ["#empty#", "#null#", "#空值#"])}
      valueType="number"
      value={multipleEnterInputValue}
      onChange={onMultipleEnterInputValueChange}
    />
  );
};

TestSpace.story = {
  name: "空格键功能测试",
};
