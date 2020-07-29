import React, { useState, useCallback } from "react";
import { withKnobs, array, text } from "@storybook/addon-knobs";
import MultipleDateTimeSelect from "./multiple-date-time-select";
import { commonStoryWrapper } from "../../helpers/story";

export default {
  title: "时间多选组件",
  component: MultipleDateTimeSelect,
  decorators: [withKnobs, commonStoryWrapper],
};

/* 默认 */
export const TestDefault = () => {
  const [value, setValue] = useState(undefined);
  const onChange = useCallback((v) => {
    setValue(v);
    console.log("onChange:", v);
  }, []);
  return (
    <MultipleDateTimeSelect
      //@ts-ignore
      language={text("language", "zh-CN")}
      //@ts-ignore
      timeType={text("timeType", "date")}
      style={{ width: 300 }}
      value={value}
      onChange={onChange}
    />
  );
};

TestDefault.story = {
  name: "时间多选组件-默认",
};

/* 外部验证测试 */
export const TestValidator = () => {
  const [value, setValue] = useState(undefined);
  const onChange = useCallback((v) => {
    setValue(v);
    console.log("onChange:", v);
  }, []);

  const onValidateValue = useCallback((_, value: any, callback: any) => {
    const curTime = new Date().getTime();
    if (value.valueOf() <= curTime) {
      callback("只能选大于现在的时间");
    } else {
      callback();
    }
  }, []);
  return (
    <MultipleDateTimeSelect
      //@ts-ignore
      language={text("language", "zh-CN")}
      //@ts-ignore
      timeType={text("timeType", "date")}
      style={{ width: 300 }}
      value={value}
      validator={onValidateValue}
      onChange={onChange}
    />
  );
};

TestValidator.story = {
  name: "时间多选组件-外部验证",
};
