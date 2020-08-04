import React, { forwardRef } from "react";
import IntervalTimeSelector, { IProps } from "./interval-time-selector";

export default forwardRef((props: IProps, ref) => (
  <IntervalTimeSelector forwardRef={ref} {...props} />
));
