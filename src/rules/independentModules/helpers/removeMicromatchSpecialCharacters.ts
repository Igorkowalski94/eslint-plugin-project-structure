export const removeMicromatchSpecialCharacters = (str: string): string =>
  str.replaceAll(/[().,+!{}[\]]/g, "\\$&");
