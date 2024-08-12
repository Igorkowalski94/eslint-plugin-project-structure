export const getInvalidReusableImportPatternsKeyError = (key: string): Error =>
  new Error(
    `🔥 The '${key}' key does not exist in the reusableImportPatterns object. 🔥`,
  );
