export const getReferenceAsPartOfPatternError = (
  referenceKey: string,
  pattern: string,
): Error =>
  new Error(
    `🔥 You want to use {${referenceKey}} as part of '${pattern}' pattern, but {${referenceKey}} contains more than one pattern. 🔥`,
  );
