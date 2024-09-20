import { FileRule } from "rules/fileComposition/fileComposition.types";

interface RemoveFilenamePartsProps {
  filenameWithoutExtension: string;
  filenamePartsToRemove: FileRule["filenamePartsToRemove"];
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
