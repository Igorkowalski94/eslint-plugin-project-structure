import { getInvalidReferenceError } from "errors/getInvalidReferenceError";

import { extractReferencesFromPattern } from "helpers/validateReferences/helpers/extractReferencesFromPattern";

interface ValidateReferencesProps {
  pattern: string;
  allowedReferences: string[];
  filterReferences?: RegExp;
}

export const validateReferences = ({
  allowedReferences,
  pattern,
  filterReferences,
}: ValidateReferencesProps): void => {
  const references = extractReferencesFromPattern({
    pattern,
    filterReferences,
  });

  const invalidReferences = references
    .filter((reference) => !allowedReferences.includes(reference))
    .map((ref) => `{${ref}}`);

  if (!invalidReferences.length) return;

  throw getInvalidReferenceError(invalidReferences);
};
