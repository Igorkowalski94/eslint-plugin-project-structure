import { FinalError } from "errors/FinalError";

import { getLongPathError } from "rules/folderStructure/errors/getLongPathError";
import { LongPathsInfo } from "rules/folderStructure/folderStructure.types";

interface ValidateLongPathProps {
  path: string;
  longPathsInfo?: LongPathsInfo | false;
}

export const validateLongPath = ({
  path,
  longPathsInfo,
}: ValidateLongPathProps): void => {
  if (longPathsInfo === false) return;

  const pathMaxLength = longPathsInfo?.maxLength ?? 240;

  if (path.length < pathMaxLength) return;

  if (longPathsInfo === undefined || longPathsInfo.mode === "warn")
    // eslint-disable-next-line no-console
    return console.error(
      getLongPathError({
        path,
        pathMaxLength,
        ruleNameInfo: "project-structure/folder-structure",
      }),
    );

  throw new FinalError(
    getLongPathError({ path, pathMaxLength, ruleNameInfo: "" }),
  );
};
