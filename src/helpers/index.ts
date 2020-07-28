import { isObject, isString } from "@shuyun-ep-team/utils/es/type";

export function isNumeric(arg: any) {
  let v = arg;
  if (isString(v)) {
    v = v.trim();
  }
  return v !== "" && !Number.isNaN(Number(v));
}

export function isEmptyValue(value: any, deep = true) {
  let v = value;

  if (isString(v)) {
    v = v.trim();
  }

  return (
    v === "" ||
    v === undefined ||
    v === null ||
    (Array.isArray(v) && !v.length) ||
    (isObject(v) && isEmptyObject(v, deep))
  );
}

export function isEmptyObject(object: any, deep = false): boolean {
  if (!isObject(object)) {
    return false;
  }

  if (!deep && !Object.keys(object).length) {
    return true;
  }

  return !Object.values(object).some((v) => !isEmptyValue(v, deep));
}

export function omitObjectEmptyValue(obj: any): any {
  const o = isObject(obj) ? obj : {};
  return Object.fromEntries(
    Object.entries(o)
      .filter(([, v]) => !isEmptyValue(v, false))
      .map(([k, v]) => (isObject(v) ? [k, omitObjectEmptyValue(v)] : [k, v]))
  );
}

export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
