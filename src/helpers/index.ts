import { isString } from "@shuyun-ep-team/utils/es/type";

export function isNumeric(arg: any): boolean {
  let v = arg;
  if (isString(v)) {
    v = v.trim();
  }
  return v !== "" && !Number.isNaN(Number(v));
}
