import { Rule } from "rules/fileComposition/fileComposition.types";
import { getFileNameWithoutExtension } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/getFilenameWithoutParts/helpers/getFileNameWithoutExtension";
import { removeFilenameParts } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/getFilenameWithoutParts/helpers/removeFilenameParts";

interface GetFilenameWithoutPartsProps {
  filenamePartsToRemove: Rule["filenamePartsToRemove"];
  filenamePath: string;
}

export const getFilenameWithoutParts = ({
  filenamePartsToRemove,
  filenamePath,
}: GetFilenameWithoutPartsProps): string => {
  const filenameWithoutExtension = getFileNameWithoutExtension(filenamePath);
  return removeFilenameParts({
    filenameWithoutExtension,
    filenamePartsToRemove,
  });
};
