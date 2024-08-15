export const getInvalidReferenceError = (invalidReferences: string[]): Error =>
  new Error(`🔥 Reference ${invalidReferences.join(", ")} do not exist. 🔥`);
