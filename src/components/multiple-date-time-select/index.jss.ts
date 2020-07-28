import { antPrefix, primaryColor, disabledColor } from "@shuyun-ep-team/kylin-ui/es/styles/vars";
import { Styles } from "jss";

export const selectorWrapper: Styles = {
  width: "100%",
  minHeight: "32px",
  position: "relative",
  boxSizing: "border-box",
  cursor: "pointer",
  border: "1px solid #D9D9D9",
  borderRadius: "2px",
  backgroundColor: "#fff",
  userSelect: "none",
  "&.disabled": {
    backgroundColor: "#f5f5f5",
    color: disabledColor,
  },
  [`&.${antPrefix}-select-selection:hover`]: {
    borderColor: primaryColor,
  },
};

export const list: Styles = {
  display: "flex",
  alignItems: "start",
  flexWrap: "wrap",
  boxSizing: "border-box",
  padding: "0 58px 0 12px",
};

export const listItemWrapper: Styles = {
  height: "32px",
  paddingRight: "4px",
  display: "flex",
  alignItems: "center",
};

export const listItem: Styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  boxSizing: "border-box",
  lineHeight: "24px",
  paddingLeft: "4px",
  background: "rgba(245,245,245,1)",
  borderRadius: "2px",
  border: "1px solid rgba(217,217,217,1)",
};

export const closeIconWrapper: Styles = {
  height: "24px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  padding: "2px 4px 0",
};

export const closeIcon: Styles = {
  fontSize: "12px",
};

export const operateWrapper: Styles = {
  position: "absolute",
  right: "8px",
  top: "0",
  width: "50px",
  height: "32px",
};
export const moreIconWrapper: Styles = {
  left: "0",
  right: "auto",
};

export const moreIcon: Styles = {
  fontSize: "16px",
  transform: "rotate(90deg)",
};

export const dateIconWrapper: Styles = {
  right: "0",
};

export const dateIcon: Styles = {
  fontSize: "14px",
};
