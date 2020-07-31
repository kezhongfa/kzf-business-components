import ICSSProperties from "@shuyun-ep-team/utils/es/jss/typings/style";
import { antPrefix } from "@shuyun-ep-team/kylin-ui/es/styles/vars";
import { formWrapper as fw } from "../../../../style/index.jss";

export const formWrapper: ICSSProperties = {
  ...fw,
};
export const itemWrapper: ICSSProperties = {
  display: "flex",
  justifyContent: "space-around",
};

export const timePicker: ICSSProperties = {
  width: "100px",
};

export const formItem: ICSSProperties = {
  width: "100px",
  [`& .${antPrefix}-form-explain`]: {
    wordWrap: "break-word",
    wordBreak: "break-all",
  },
};
