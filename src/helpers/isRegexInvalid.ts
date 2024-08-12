export const isRegexInvalid = (regex: string): boolean => {
  try {
    new RegExp(regex);
  } catch (_e) {
    return true;
  }

  return false;
};
