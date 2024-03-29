import { Subscription } from 'rxjs';

export function isNullOrEmptyString(str: string): boolean {
  return null == str || str.trim().length === 0 ? true : false;
}

export function isNullOrEmptyArray<T = any>(arr: Array<T>): boolean {
  return null == arr || arr.length === 0 ? true : false;
}

export function trimString(str: string): string {
  if (str == null) {
    return null;
  }
  str = str.trim();
  return str === '' ? null : str.trim();
}

export function safeTrim(str: string): string {
  if (str == null) {
    return '';
  }
  str = str.trim();
  return str.length === 0 ? '' : str;
}

export function unSubscribeAll(subs: Array<Subscription>): void {
  if (subs) {
    subs.forEach((s) => s.unsubscribe());
  }
}

export function deepCopy<T, S>(obj: T): T {
  let newObj: any = obj;
  if ((obj && typeof obj === 'object') || obj instanceof Map) {
    if (Array.isArray(obj)) {
      newObj = [];
      for (let index = 0; index < obj.length; index++) {
        newObj[index] = deepCopy(obj[index]);
      }
    } else if (obj instanceof Map) {
      newObj = new Map<T, S>();
      for (const [key, value] of Object.entries(obj)) {
        newObj.set(deepCopy(key), deepCopy(value));
      }
    } else {
      newObj = {};
      for (const [key, value] of Object.entries(obj)) {
        newObj[key] = deepCopy(value);
      }
    }
  }
  return newObj;
}
