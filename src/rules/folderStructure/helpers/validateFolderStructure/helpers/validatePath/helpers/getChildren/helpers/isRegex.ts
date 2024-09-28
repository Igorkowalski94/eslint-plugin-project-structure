export const isRegex = (str?: string): boolean =>
  /[^a-zA-Z0-9.]/.test(str ?? "");
