import { languageJson } from "../../../constants/language";
import zhCN from "./zh-CN.json";
import enUS from "./en-US.json";

interface IAllLanguageJson {
  [key: string]: {
    [key: string]: string;
  };
}
const allLanguageJson: IAllLanguageJson = {
  "zh-CN": zhCN,
  "en-US": enUS,
};

export function getCurLanguage(lang?: string) {
  const curLanguage = lang || languageJson.zhCN;
  if (Object.values(languageJson).includes(curLanguage)) {
    return allLanguageJson[curLanguage];
  }
  return allLanguageJson["zh-CN"];
}
