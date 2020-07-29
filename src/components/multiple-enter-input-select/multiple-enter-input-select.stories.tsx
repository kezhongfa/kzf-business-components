import React, { useState, useCallback } from "react";
import { withKnobs, array, text } from "@storybook/addon-knobs";
import MultipleEnterInputSelect from "./multiple-enter-input-select";
import { isNumeric } from "../../helpers";
import { commonStoryWrapper } from "../../helpers/story";

export default {
  title: "回车输入组件",
  component: MultipleEnterInputSelect,
  decorators: [withKnobs, commonStoryWrapper],
};

/* 默认 */
export const TestDefault = () => {
  const [value, setValue] = useState(undefined);
  const onChange = useCallback((v) => {
    setValue(v);
    console.log("onChange:", v);
  }, []);
  return <MultipleEnterInputSelect style={{ width: 300 }} value={value} onChange={onChange} />;
};

TestDefault.story = {
  name: "回车输入组件-默认",
};

/* number测试 */
export const TestNumber = () => {
  const [value, setValue] = useState(undefined);
  const onChange = useCallback((v) => {
    setValue(v);
    console.log("onChange:", v);
  }, []);
  return (
    <MultipleEnterInputSelect
      style={{ width: 300 }}
      valueType="number"
      value={value}
      onChange={onChange}
    />
  );
};

TestNumber.story = {
  name: "回车输入组件-number",
};

/* 外部验证测试 */
export const TestValidator = () => {
  const [value, setValue] = useState(undefined);
  const onChange = useCallback((v) => {
    setValue(v);
    console.log("onChange:", v);
  }, []);

  const onValidateValue = useCallback((_, value: any, callback: any) => {
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
      value={value}
      onChange={onChange}
    />
  );
};

TestValidator.story = {
  name: "回车输入组件-外部验证",
};

/* 空格键功能测试 */
export const TestSpace = () => {
  const [value, setValue] = useState(undefined);
  const onChange = useCallback((v) => {
    setValue(v);
    console.log("onChange:", v);
  }, []);
  return (
    <MultipleEnterInputSelect
      style={{ width: 300 }}
      //@ts-ignore
      language={text("language", "zh-CN")}
      isSpaceKeyEnable={true}
      spaceKeyValue={array("spaceKeyValue", ["#empty#", "#null#", "#空值#"])}
      valueType="number"
      value={value}
      onChange={onChange}
    />
  );
};

TestSpace.story = {
  name: "回车输入组件-空格键功能",
};
