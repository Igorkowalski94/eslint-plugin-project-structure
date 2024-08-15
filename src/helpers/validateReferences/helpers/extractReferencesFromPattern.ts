interface ExtractReferencesFromPatternProps {
  pattern: string;
  filterReferences?: RegExp;
}

export const extractReferencesFromPattern = ({
  filterReferences,
  pattern,
}: ExtractReferencesFromPatternProps): string[] =>
  pattern
    .match(/\{([^}]+)\}/g)
    ?.map((match) => match.slice(1, -1))
    .filter((p) => !filterReferences?.test(p)) ?? [];
