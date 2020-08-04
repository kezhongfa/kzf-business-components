import React, { forwardRef } from "react";
import MultipleDateTimeSelect, { IProps } from "./multiple-date-time-select";

export default forwardRef((props: IProps, ref) => (
  <MultipleDateTimeSelect forwardRef={ref} {...props} />
));
