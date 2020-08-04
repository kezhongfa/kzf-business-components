import React, { forwardRef } from "react";
import MultipleEnterInputSelect, { IProps } from "./multiple-enter-input-select";

export default forwardRef((props: IProps, ref) => (
  <MultipleEnterInputSelect forwardRef={ref} {...props} />
));
