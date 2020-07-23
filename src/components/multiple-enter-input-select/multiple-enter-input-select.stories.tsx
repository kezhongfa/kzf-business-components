import React, { useState, useCallback } from "react";
import MultipleEnterInputSelect from "./multiple-enter-input-select";

export default {
  title: "MultipleEnterInputSelect Component",
  component: MultipleEnterInputSelect,
};

export const defaultButton = () => {
  const [multipleEnterInputValue, setMultipleEnterInputValue] = useState(undefined);
  const onMultipleEnterInputValueChange = useCallback((v: Array<string | number>) => {
    setMultipleEnterInputValue(v as any);
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
