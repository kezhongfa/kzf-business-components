import * as React from "react";

/* 翻译文案 */
export const translate = (
  i18nMap: { [key: string]: string },
  key: string,
  data?: { [mark: string]: string | number }
) => {
  const context = i18nMap ? i18nMap[key] || "" : "";
  let text = context;
  if (data) {
    text = _translate(context, data);
  }
  return (
    <span data-i18n-project="kzf-business-components" data-i18n-key={key}>
      {text}
    </span>
  );
};

/** 翻译函数 */
function _translate(template: string, data: { [key: string]: string | number }) {
  return template.replace(/(\{[a-zA-Z\d]+\})/g, (a) => {
    const key = a.replace(/\{|\}/g, "");
    return String(data[key]) || "";
  });
}
