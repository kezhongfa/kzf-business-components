import stripJsonComments from "strip-json-comments";
import { JsonWrapper } from "@shuyun-ep-team/utils/es/json";
import { isObject, isArray } from "@shuyun-ep-team/utils/es/type";
import { fetchWithCacheGenerator } from "@shuyun-ep-team/utils/es/fetch-with-cache";
import { pureFetch } from "../fetch";

const { fetch: fetchWithCache } = fetchWithCacheGenerator((jsonURL: string) => {
  return pureFetch.get(jsonURL);
});

function fetchJsonPackage(
  jsonURL: string,
  options: {
    cache?: boolean;
    fallbackURL?: string;
  } = {}
) {
  const { cache = true, fallbackURL } = options;

  const theJsonURL = cache ? jsonURL : `${jsonURL}?t=${Date.now()}`;

  // 如果参数 fallbackURL 不为空，则请求json文件时会做兜底处理
  // 即：假如第一次请求失败了，会再次请求fallbackURL路径文件
  let hasRequestFallback = !fallbackURL;

  return fetchWithCache(theJsonURL)
    .then((jsonStr: string) => {
      if (isObject(jsonStr) || isArray(jsonStr)) {
        return jsonStr;
      }

      try {
        return JsonWrapper.parse(stripJsonComments(jsonStr));
      } catch (err) {
        console.error(err);
        return {};
      }
    })
    .catch((err) => {
      if (err.status === 404 && !hasRequestFallback) {
        hasRequestFallback = true;
        const theFallbackJsonURL = cache ? fallbackURL : `${fallbackURL}?t=${Date.now()}`;

        return fetchWithCache(theFallbackJsonURL!);
      }
      throw err;
    });
}

/**
 * Json 文件请求服务
 * 该服务会自动对 JSON 文件进行解析和返回
 */
export const JsonPackageService = {
  fetch: fetchJsonPackage,
};
