import path from "path";

import { FinalError } from "errors/FinalError";

import { getLongPathError } from "rules/folderStructure/errors/getLongPathError";
import { LongPathsInfo } from "rules/folderStructure/folderStructure.types";
import { getPathname } from "rules/folderStructure/helpers/validateFolderStructure/helpers/getPathname";

interface ValidateLongPathProps {
  filename: string;
  cwd: string;
  longPathsInfo?: LongPathsInfo | false;
}

export const validateLongPath = ({
  filename,
  cwd,
  longPathsInfo,
}: ValidateLongPathProps): void => {
  if (longPathsInfo === false) return;

  const currentPath = longPathsInfo?.countFromSystemRoot
    ? filename
    : getPathname({
        cwd: path.resolve(cwd, longPathsInfo?.root ?? ".."),
        filename,
      });

  const pathMaxLength = longPathsInfo?.maxLength ?? 240;

  if (currentPath.length < pathMaxLength) return;

  if (longPathsInfo === undefined || longPathsInfo.mode === "warn")
    // eslint-disable-next-line no-console
    return console.error(
      `\n${getLongPathError({
        path: currentPath,
        pathMaxLength,
        ruleNameInfo: "project-structure/folder-structure",
      })}`,
    );

  throw new FinalError(
    getLongPathError({ path: currentPath, pathMaxLength, ruleNameInfo: "" }),
  );
};
