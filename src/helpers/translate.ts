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
  return text;
};

/** 翻译函数 */
function _translate(template: string, data: { [key: string]: string | number }) {
  return template.replace(/(\{[a-zA-Z\d]+\})/g, (a) => {
    const key = a.replace(/\{|\}/g, "");
    return String(data[key]) || "";
  });
}
