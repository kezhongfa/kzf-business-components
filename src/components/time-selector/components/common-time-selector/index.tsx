import React, { forwardRef } from "react";
import CommonTimeSelector, { IProps } from "./common-time-selector";

export default forwardRef((props: IProps, ref) => (
  <CommonTimeSelector forwardRef={ref} {...props} />
));
