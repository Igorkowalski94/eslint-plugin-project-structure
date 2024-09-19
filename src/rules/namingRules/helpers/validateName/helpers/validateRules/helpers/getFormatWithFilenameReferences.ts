import { transformStringToCase } from "helpers/transformStringToCase";

import { REFERENCES } from "rules/namingRules/helpers/validateName/helpers/validateRules/validateRules.consts";

interface GetFormatWithFilenameReferencesProps {
  formatWithReferences: string[];
  filename: string;
}

export const getFormatWithFilenameReferences = ({
  filename,
  formatWithReferences,
}: GetFormatWithFilenameReferencesProps): string[] =>
  formatWithReferences.map((pattern) =>
    pattern
      .replaceAll(
        REFERENCES.fileName,
        transformStringToCase({
          str: filename,
          transformTo: "camelCase",
        }),
      )
      .replaceAll(
        REFERENCES.FileName,
        transformStringToCase({
          str: filename,
          transformTo: "PascalCase",
        }),
      )
      .replaceAll(
        REFERENCES.file_name,
        transformStringToCase({
          str: filename,
          transformTo: "snake_case",
        }),
      )
      .replaceAll(
        REFERENCES.FILE_NAME,
        transformStringToCase({
          str: filename,
          transformTo: "SNAKE_CASE",
        }),
      ),
  );
