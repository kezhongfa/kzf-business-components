import React, { forwardRef } from "react";
import CommonTimeSelector from "./common-time-selector";

export default forwardRef((props, ref) => <CommonTimeSelector forwardRef={ref} {...props} />);
