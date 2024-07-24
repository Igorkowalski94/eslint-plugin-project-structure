import { NamingRule } from "../namingRules.types";

interface RemovePartsFromFileNameProps {
    filenameWithoutExtension: string;
    filenamePartsToRemove: NamingRule["filenamePartsToRemove"];
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
