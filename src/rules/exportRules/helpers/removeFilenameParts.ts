import { ExportRules } from "../exportRules.types";

interface RemovePartsFromFileNameProps {
    filenameWithoutExtension: string;
    filenamePartsToRemove: ExportRules["filenamePartsToRemove"];
}

export const removeFilenameParts = ({
    filenameWithoutExtension,
    filenamePartsToRemove,
}: RemovePartsFromFileNameProps): string => {
    if (!filenamePartsToRemove) return filenameWithoutExtension;

    return filenamePartsToRemove.reduce(
        (acc, removePart) => acc.replaceAll(removePart, ""),
        filenameWithoutExtension,
    );
};
