/* eslint-disable @typescript-eslint/no-unused-vars */
import { languageDefault } from "../../../constants/language";
// TODO 语言包全部列出,防止打包被忽略
import zhCN from "./zh-CN.json";
import enUS from "./en-US.json";

export const getCurLanguage = async (lang?: string): Promise<{ [key: string]: string }> => {
  const curLanguage = lang || languageDefault;
  try {
    const result = await import(`./${curLanguage}.json`);
    return result;
  } catch {
    const result = await import(`./${languageDefault}.json`);
    return result;
  }
};
