// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRecursionLimitError = (pattern: any): Error =>
  new Error(`🔥 Infinite recursion for: ${JSON.stringify(pattern)} 🔥`);
