// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRecursionLimitError = (pattern: any): Error =>
  new Error(`🔥 Recursion limit for: ${JSON.stringify(pattern)} 🔥`);
