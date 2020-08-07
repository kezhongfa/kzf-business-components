import React, { useState, useCallback } from "react";
import { withKnobs, select } from "@storybook/addon-knobs";
import MultipleLanguageInput from "./multiple-language-input";
import { commonStoryWrapper } from "../../helpers/story";
import { languageDefault } from "../../constants/language";
import { languageOptions } from "../../helpers/story";

export default {
  title: "多语言录入组件",
  component: MultipleLanguageInput,
  decorators: [withKnobs, commonStoryWrapper],
};

/* 默认 */
export const TestDefault = () => {
  const [value, setValue] = useState(undefined);
  const [allLanguages, setAllLanguages] = useState(() => ({
    "en-US": {
      label: "英文",
      value: undefined,
      validator: { min: 3, message: "最小长度为3" },
    },
    "zh-CN": {
      label: "中文",
      value: "中文",
    },
  }));
  const onChange = useCallback((e) => {
    const v = e.target.value;
    setValue(v);
    console.log("onChange:", v);
  }, []);
  const onOk = useCallback((allLanguages, values) => {
    console.log("onOk:", allLanguages, values);
    setAllLanguages(allLanguages);
  }, []);
  return (
    <MultipleLanguageInput
      //@ts-ignore
      language={select("language", languageOptions, languageDefault)}
      placeholder={"多语言录入组件"}
      validator={{ max: 10, message: "最长长度为10" }}
      style={{ width: 300 }}
      allLanguages={allLanguages}
      value={value}
      onChange={onChange}
      onOk={onOk}
      disabled={false}
      componentType="multiLine"
    />
  );
};

TestDefault.story = {
  name: "多语言录入组件-默认",
};
