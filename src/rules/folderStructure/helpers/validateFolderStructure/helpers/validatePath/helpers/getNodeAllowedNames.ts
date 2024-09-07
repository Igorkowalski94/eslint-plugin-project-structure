import { transformStringToCase } from "helpers/transformStringToCase";

import { REFERENCES } from "rules/folderStructure/folderStructure.consts";
import { NodeType, Rule } from "rules/folderStructure/folderStructure.types";

interface GetNodeAllowedNamesProps {
  children?: Rule[];
  nodeType: NodeType;
  folderName: string;
}

export const getNodeAllowedNames = ({
  nodeType,
  folderName,
  children = [],
}: GetNodeAllowedNamesProps): string[] =>
  children
    .filter(({ name, children }) => {
      if (nodeType === "File") return name && !children;

      return name && children;
    })
    .map(({ name }) =>
      name
        ?.replaceAll(
          REFERENCES.folderName,
          transformStringToCase({
            str: folderName,
            transformTo: "camelCase",
          }),
        )
        .replaceAll(
          REFERENCES.FolderName,
          transformStringToCase({
            str: folderName,
            transformTo: "PascalCase",
          }),
        )
        .replaceAll(
          REFERENCES["folder-name"],
          transformStringToCase({
            str: folderName,
            transformTo: "kebab-case",
          }),
        )
        .replaceAll(
          REFERENCES.folder_name,
          transformStringToCase({
            str: folderName,
            transformTo: "snake_case",
          }),
        )
        .replaceAll(
          REFERENCES.FOLDER_NAME,
          transformStringToCase({
            str: folderName,
            transformTo: "SNAKE_CASE",
          }),
        ),
    )
    .filter((v): v is string => v !== undefined);
