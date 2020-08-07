import { Styles } from "jss";
import { primaryColor } from "@shuyun-ep-team/kylin-ui/es/styles/vars";
import { ellipsis } from "../../styles/common.jss";

export const multipleInput: Styles = {
  display: "inline-block",
  position: "relative",
};

export const languageIconGlobal: Styles = {
  "&:hover": {
    cursor: "pointer",
    color: primaryColor,
  },
};

export const languageMenuItem: Styles = {
  width: "100px",
  display: "flex",
  alignItems: "center",
};

export const languageMenuItemLabel: Styles = {
  ...ellipsis,
  flex: "1",
};

export const languageMenuItemIcon: Styles = {
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: "rgba(217,217,217,1)",
};

export const languageMenuItemIconActive: Styles = {
  ...languageMenuItemIcon,
  backgroundColor: "rgba(82,196,26,1)",
};
