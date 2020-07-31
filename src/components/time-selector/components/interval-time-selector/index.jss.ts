import { antPrefix, primaryColor } from "@shuyun-ep-team/kylin-ui/es/styles/vars";
import { Styles } from "jss";
import {
  selectorWrapper as sew,
  overlayWrapper as ovw,
  operatorWrapper as opw,
  placeHolder as ph,
  ellipsis,
} from "../../style/index.jss";

export const selectorWrapper: Styles = {
  ...sew,
  [`& .${antPrefix}-form-item`]: {
    marginBottom: "12px !important",
  },
  [`& .${antPrefix}-form-explain`]: {
    display: "block !important",
  },
  "&:hover": {
    borderColor: primaryColor,
  },
};
export const select: Styles = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};
export const overlayWrapper: Styles = {
  ...ovw,
};

export const operatorWrapper: Styles = {
  ...opw,
};

export const showName: Styles = {
  ...ellipsis,
};

export const placeHolder: Styles = {
  ...ph,
};
