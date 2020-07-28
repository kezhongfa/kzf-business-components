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
  const [multipleEnterInputValue, setMultipleEnterInputValue] = useState(undefined);
  const onMultipleEnterInputValueChange = useCallback((v) => {
    setMultipleEnterInputValue(v);
    console.log("onChange:", v);
  }, []);
  return (
    <MultipleDateTimeSelect
      //@ts-ignore
      language={text("language", "zh-CN")}
      //@ts-ignore
      timeType={text("timeType", "date")}
      style={{ width: 300 }}
      value={multipleEnterInputValue}
      onChange={onMultipleEnterInputValueChange}
    />
  );
};

TestDefault.story = {
  name: "时间多选组件-默认",
};
