import React, { forwardRef } from "react";
import MultipleLanguageInput, { IProps } from "./multiple-language-input";

export default forwardRef((props: IProps, ref) => (
  <MultipleLanguageInput forwardRef={ref} {...props} />
));
