import { getInvalidReferenceError } from "errors/getInvalidReferenceError";

import { extractReferencesFromRegex } from "helpers/getRegexWithoutReferences/helpers/validateReferences/helpers/extractReferencesFromRegex";

interface ValidateReferencesProps {
  regex: string;
  allowedReferences: string[];
  filterReferences?: RegExp;
  key: string;
}

export const validateReferences = ({
  allowedReferences,
  regex,
  filterReferences,
  key,
}: ValidateReferencesProps): void => {
  const references = extractReferencesFromRegex({
    regex,
    filterReferences,
  });

  const invalidReferences = references
    .filter((reference) => !allowedReferences.includes(reference))
    .map((ref) => `{${ref}}`);

  if (!invalidReferences.length) return;

  throw getInvalidReferenceError({ invalidReferences, allowedReferences, key });
};
