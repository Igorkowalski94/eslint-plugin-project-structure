interface GetInvalidReferenceErrorProps {
  invalidReferences: string[];
  allowedReferences: string[];
  key: string;
}

export const getInvalidReferenceError = ({
  invalidReferences,
  allowedReferences,
  key,
}: GetInvalidReferenceErrorProps): Error =>
  new Error(
    `🔥 Reference ${invalidReferences.join(", ")} in "${key}" do not exist. 🔥\n\nAllowed references = ${allowedReferences.join(", ")}.\n\n`,
  );
