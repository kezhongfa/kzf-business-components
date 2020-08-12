import { JsonPackageService } from "../json-package";
import { appConfig } from "../../config";

const { ORIGIN } = appConfig.CCMS_INFOS_CONFIG;
const baseURL = window.CCMS_INFOS_CONFIG ? "" : ORIGIN;

/**
 * 获取业务组件的语言包
 */
export function fetchKylinBusinessComponentLanguagePackage(
  componentName: string,
  language: string
) {
  const url =
    baseURL +
    `/web-common-resource/configs/kylin-business-component/${componentName}/i18n/${language}.json`;
  return JsonPackageService.fetch(url, {
    // 指定语言包加载失败会默认使用中文语言包
    fallbackURL:
      baseURL +
      `/web-common-resource/configs/kylin-business-component/${componentName}/i18n/zh-CN.json`,
  });
}
