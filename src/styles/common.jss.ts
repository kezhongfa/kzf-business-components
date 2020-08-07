import { Styles } from "jss";

export const ellipsis: Styles = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  wordWrap: "break-word",
  wordBreak: "break-all",
};

export const ellipsisMoreLine = (lineNumber: number): Styles => ({
  overflow: "hidden",
  display: "-webkit-box",
  "-webkit-box-orient": "vertical",
  "-webkit-line-clamp": `${lineNumber}`,
});
