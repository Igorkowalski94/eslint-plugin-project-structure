export const isRegexInvalid = (regex: string): boolean => {
  try {
    new RegExp(`^${regex}$`, "g");
  } catch (_e) {
    return true;
  }

  return false;
};
