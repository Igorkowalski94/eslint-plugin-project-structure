export const hasNestedArray = (arr: unknown[]): boolean =>
  arr.some((item) => Array.isArray(item));
