import { TSESTree } from "@typescript-eslint/utils";

import { getProgramFromNode } from "rules/fileComposition/helpers/validateFile/helpers/isExportedName/helpers/getProgramFromNode";
import { ValidateFileProps } from "rules/fileComposition/helpers/validateFile/validateFile";

export interface IsNamedExportProps {
  node: ValidateFileProps["node"];
  name: string;
}

export interface IsNamedExportReturn {
  isNamedExport: boolean;
  currentName: string;
  currentNode: ValidateFileProps["node"];
}

export const isNamedExport = ({
  name,
  node,
}: IsNamedExportProps): IsNamedExportReturn => {
  let isNamedExport = false;
  let currentNode = node;
  let currentName = name;

  getProgramFromNode(node).body.forEach((node) => {
    if (node.type !== TSESTree.AST_NODE_TYPES.ExportNamedDeclaration) return;

    node.specifiers.forEach((specifier) => {
      // export { variable as variable2 }
      if (specifier.local.name === name && specifier.exported.name !== name) {
        isNamedExport = true;
        currentName = specifier.exported.name;
        currentNode = specifier.exported;
        return;
      }

      // export { variable }
      if (specifier.local.name === name && specifier.exported.name === name) {
        isNamedExport = true;
        currentNode = specifier.local;
        return;
      }
    });
  });

  return {
    isNamedExport,
    currentName,
    currentNode,
  };
};
