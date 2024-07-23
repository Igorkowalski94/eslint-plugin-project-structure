export const hasNestedArray = <T>(arr: T[]): boolean =>
    arr.some((item) => Array.isArray(item));
