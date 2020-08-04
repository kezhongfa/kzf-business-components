import React, { useState, useCallback } from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import CommonTimeSelector from "./common-time-selector";
import { commonStoryWrapper } from "../../../../helpers/story";
import { languageDefault } from "../../../../constants/language";
import { languageOptions } from "../../../../helpers/story";

export default {
  title: "时间选择组件",
  component: CommonTimeSelector,
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
    <CommonTimeSelector
      style={{ width: 180 }}
      value={value}
      //@ts-ignore
      language={select("language", languageOptions, languageDefault)}
      onChange={onChange}
    />
  );
};

TestDefault.story = {
  name: "时间选择组件-默认",
};
