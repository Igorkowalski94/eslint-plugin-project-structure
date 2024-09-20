import { TSESTree } from "@typescript-eslint/utils";

import { NodeType } from "rules/fileComposition/fileComposition.types";
import { isExportDefault } from "rules/fileComposition/helpers/validateFile/helpers/isExportedName/helpers/isExportDefault";
import { isNamedExport } from "rules/fileComposition/helpers/validateFile/helpers/isExportedName/helpers/isNamedExport";
import { ValidateFileProps } from "rules/fileComposition/helpers/validateFile/validateFile";

interface IsExportedNameProps {
  nodeType: NodeType;
  node: ValidateFileProps["node"];
  name: string;
}

export interface IsExportedNameReturn {
  isExportName: boolean;
  currentName: string;
  currentNode: ValidateFileProps["node"];
}

export const isExportedName = ({
  nodeType,
  node,
  name,
}: IsExportedNameProps): IsExportedNameReturn => {
  if (
    ((nodeType === "ArrowFunctionExpression" ||
      nodeType === "TaggedTemplateExpression" ||
      nodeType === "CallExpression" ||
      nodeType === "VariableDeclarator") &&
      node.parent.parent?.type ===
        TSESTree.AST_NODE_TYPES.ExportNamedDeclaration) ||
    node.parent.parent?.type ===
      TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration
  )
    return {
      isExportName: true,
      currentNode: node,
      currentName: name,
    };

  if (
    node.parent.type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration ||
    node.parent.type === TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration
  )
    return {
      isExportName: true,
      currentNode: node,
      currentName: name,
    };

  const namedExport = isNamedExport({ name, node });
  const exportDefault = isExportDefault({ name, node });

  if (namedExport.isNamedExport)
    return {
      isExportName: true,
      currentNode: namedExport.currentNode,
      currentName: namedExport.currentName,
    };

  if (exportDefault.isExportDefault)
    return {
      isExportName: true,
      currentNode: exportDefault.currentNode,
      currentName: exportDefault.currentName,
    };

  return {
    isExportName: false,
    currentName: name,
    currentNode: node,
  };
};
