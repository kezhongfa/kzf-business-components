export const languageDefault = (() => {
  if (window.KyPortalService?.LanguageService?.getLanguage) {
    return window.KyPortalService.LanguageService.getLanguage();
  }
  return "zh-CN";
})();
