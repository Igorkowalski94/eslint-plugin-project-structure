interface ExtractReferencesFromRegexProps {
  regex: string;
  filterReferences?: RegExp;
}

export const extractReferencesFromRegex = ({
  filterReferences,
  regex,
}: ExtractReferencesFromRegexProps): string[] =>
  regex
    .match(/\{([^}]+)\}/g)
    ?.map((match) => match.slice(1, -1))
    .filter((p) => !filterReferences?.test(p)) ?? [];
