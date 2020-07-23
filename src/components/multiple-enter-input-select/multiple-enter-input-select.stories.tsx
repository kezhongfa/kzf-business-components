import React, { useState, useCallback } from "react";
import MultipleEnterInputSelect from "./multiple-enter-input-select";

export default {
  title: "多值输入组件",
  component: MultipleEnterInputSelect,
};

export const defaultMultipleEnterInputSelect = () => {
  const [multipleEnterInputValue, setMultipleEnterInputValue] = useState(undefined);
  const onMultipleEnterInputValueChange = useCallback((v) => {
    setMultipleEnterInputValue(v);
  }, []);
  return (
    <MultipleEnterInputSelect
      style={{ width: "300px" }}
      valueType="number"
      value={multipleEnterInputValue}
      onChange={onMultipleEnterInputValueChange}
    />
  );
};

defaultMultipleEnterInputSelect.story = {
  title: "多值输入组件",
};
