import { antPrefix, disabledColor } from "@shuyun-ep-team/kylin-ui/es/styles/vars";
import { Styles } from "jss";

export const formWrapper: Styles = {
  [`& .${antPrefix}-row.${antPrefix}-form-item`]: {
    marginBottom: 0,
  },
};

export const selectorWrapper: Styles = {
  height: "32px",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  padding: "0 22px 0 12px",
  border: "1px solid #D9D9D9",
  borderRadius: "2px",
  backgroundColor: "#fff",
  userSelect: "none",
  verticalAlign: "top",
  "&.disabled": {
    backgroundColor: "#f5f5f5",
    color: disabledColor,
  },
};

export const overlayWrapper: Styles = {
  boxSizing: "border-box",
  padding: "16px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  [`& .${antPrefix}-select-selection-selected-value`]: {
    paddingRight: "10px",
  },
};

export const operatorWrapper: Styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  marginTop: "16px",
};

export const ellipsis: Styles = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  wordWrap: "break-word",
  wordBreak: "break-all",
};

export const placeHolder: Styles = {
  color: "#bfbfbf",
  maxWidth: "100%",
  ...ellipsis,
};

export const btnWrapper: Styles = {
  [`& .${antPrefix}-btn`]: {
    height: "24px",
    padding: "0 7px",
  },
};
