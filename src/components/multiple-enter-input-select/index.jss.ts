import ICSSProperties from "@shuyun-ep-team/utils/es/jss/typings/style";
import {
  antPrefix,
  primaryColor,
} from "@shuyun-ep-team/kylin-ui/es/styles/vars";
export const select: ICSSProperties = {
  [`& .${antPrefix}-select-selection--multiple`]: {
    overflow: "hidden",
  },
  [`& .${antPrefix}-select-selection__rendered ul`]: {
    width: "max-content",
  },
  [`&.${antPrefix}-select-selection:hover`]: {
    borderColor: primaryColor,
  },
};

export const selectDropdown: ICSSProperties = {
  "& ul li": {
    position: "relative",
    float: "left",
    maxWidth: "99%",
    overflow: "hidden",
    marginRight: "4px",
    marginBottom: "4px",
    padding: "0 20px 0 10px",
    color: "#333",
    fontWeight: "normal",
    backgroundColor: "#fafafa",
    border: "1px solid #e8e8e8",
    borderRadius: "2px",
    cursor: "default",
    transition: "padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)",
  },
};
