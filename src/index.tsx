// export { default as Button } from "./components/button";
// export { default as MultipleEnterInputSelect } from "./components/multiple-enter-input-select";
import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import "@shuyun-ep-team/kylin-ui/es/styles/index.css";
import MultipleEnterInputSelect from "./components/multiple-enter-input-select";

const App = () => {
  const [multipleEnterInputValue, setMultipleEnterInputValue] = useState(undefined);
  const onMultipleEnterInputValueChange = useCallback((v) => {
    // eslint-disable-next-line no-console
    console.log("onMultipleEnterInputValueChange:", v);
    setMultipleEnterInputValue(v as any);
  }, []);
  const handleValidateNumOptionalValue = useCallback((value: any, callback: any) => {
    console.log("handleValidateNumOptionalValue:", value);
    callback();
  }, []);
  return (
    <MultipleEnterInputSelect
      valueType="number"
      style={{ width: "300px" }}
      value={multipleEnterInputValue}
      onChange={onMultipleEnterInputValueChange}
      validator={handleValidateNumOptionalValue}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
