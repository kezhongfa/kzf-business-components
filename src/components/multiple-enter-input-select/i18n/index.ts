import { languageDefault } from "../../../constants/language";

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
