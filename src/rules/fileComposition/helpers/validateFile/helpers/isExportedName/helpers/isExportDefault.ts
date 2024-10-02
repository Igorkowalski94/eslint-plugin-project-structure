import { TSESTree } from "@typescript-eslint/utils";

import { getProgramFromNode } from "rules/fileComposition/helpers/validateFile/helpers/getProgramFromNode";
import { ValidateFileProps } from "rules/fileComposition/helpers/validateFile/validateFile";

export interface IsExportDefaultProps {
  node: ValidateFileProps["node"];
  name: string;
}

export interface IsExportDefaultReturn {
  isExportDefault: boolean;
  currentNode: ValidateFileProps["node"];
  currentName: string;
}

export const isExportDefault = ({
  name,
  node,
}: IsExportDefaultProps): IsExportDefaultReturn => {
  let currentNode = node;
  let currentName = name;
  let isExportDefault = false;

  getProgramFromNode(node).body.forEach((node) => {
    if (node.type !== TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration) return;

    // export default variable
    if (
      node.declaration.type === TSESTree.AST_NODE_TYPES.Identifier &&
      node.declaration.name === name
    ) {
      isExportDefault = true;
      currentNode = node.declaration;
      return;
    }

    // export default {}
    if (node.declaration.type === TSESTree.AST_NODE_TYPES.ObjectExpression) {
      node.declaration.properties.forEach((property) => {
        if (property.type !== TSESTree.AST_NODE_TYPES.Property) return;

        // export default { variable1: variable2 }
        // export default { variable }
        if (
          property.key.type === TSESTree.AST_NODE_TYPES.Identifier &&
          property.value.type === TSESTree.AST_NODE_TYPES.Identifier &&
          property.value.name === name
        ) {
          isExportDefault = true;
          currentNode = property.key;
          currentName = property.key.name;
          return;
        }
      });
    }

    // export default []
    if (node.declaration.type === TSESTree.AST_NODE_TYPES.ArrayExpression) {
      node.declaration.elements.forEach((element) => {
        if (!element) return;

        // export default [ variable ]
        if (
          element.type === TSESTree.AST_NODE_TYPES.Identifier &&
          element.name === name
        ) {
          isExportDefault = true;
          currentNode = element;
          return;
        }
      });
    }
  });

  return {
    isExportDefault,
    currentNode,
    currentName,
  };
};
