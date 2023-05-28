export function isNullOrEmptyString(str: string): boolean {
  return null == str || str.trim().length === 0 ? true : false;
}

export function isNullOrEmptyArray<T = any>(arr: Array<T>): boolean {
  return null == arr || arr.length === 0 ? true : false;
}
