import { TSESTree } from "@typescript-eslint/utils";

import { isExportDefault } from "rules/namingRules/helpers/validateName/helpers/isExportedName/helpers/isExportDefault";
import { isNamedExport } from "rules/namingRules/helpers/validateName/helpers/isExportedName/helpers/isNamedExport";
import { ValidateNameProps } from "rules/namingRules/helpers/validateName/validateName";
import { NodeType } from "rules/namingRules/namingRules.types";

interface IsExportedNameProps {
  nodeType: NodeType;
  node: ValidateNameProps["node"];
  name: string;
}

export interface IsExportedNameReturn {
  isExportName: boolean;
  currentName: string;
  currentNode: ValidateNameProps["node"];
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
      nodeType === "MemberExpression" ||
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
