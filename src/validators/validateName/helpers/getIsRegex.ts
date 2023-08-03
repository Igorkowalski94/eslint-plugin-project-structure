export const getIsRegex = (regex: string): boolean => /^\/(.+)\/$/.test(regex);
