import { NamingRule } from "rules/namingRules/namingRules.types";

interface RemoveFilenamePartsProps {
  filenameWithoutExtension: string;
  filenamePartsToRemove: NamingRule["filenamePartsToRemove"];
}

export const removeFilenameParts = ({
  filenameWithoutExtension,
  filenamePartsToRemove,
}: RemoveFilenamePartsProps): string => {
  if (!filenamePartsToRemove) return filenameWithoutExtension;

  const currentFilenamePartsToRemove =
    typeof filenamePartsToRemove === "string"
      ? [filenamePartsToRemove]
      : filenamePartsToRemove;

  return currentFilenamePartsToRemove.reduce(
    (acc, removePart) => acc.replaceAll(removePart, ""),
    filenameWithoutExtension,
  );
};
