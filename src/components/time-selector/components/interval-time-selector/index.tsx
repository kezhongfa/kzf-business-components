import React, { forwardRef } from "react";
import IntervalTimeSelector from "./interval-time-selector";

export default forwardRef((props, ref) => <IntervalTimeSelector forwardRef={ref} {...props} />);
