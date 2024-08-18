import { TSESTree } from "@typescript-eslint/utils";

import { isExportDefault } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getCurrentData/helpers/isExportedName/helpers/isExportDefault";
import { isNamedExport } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getCurrentData/helpers/isExportedName/helpers/isNamedExport";
import { ValidateNameProps } from "rules/namingRules/helpers/validateName/validateName";
import { NameType } from "rules/namingRules/namingRules.types";

interface IsExportedNameProps {
  nameType: NameType;
  node: ValidateNameProps["node"];
  name: string;
}

export interface IsExportedNameReturn {
  isExportName: boolean;
  currentName: string;
  currentNode: ValidateNameProps["node"];
}

export const isExportedName = ({
  nameType,
  node,
  name,
}: IsExportedNameProps): IsExportedNameReturn => {
  if (
    ((nameType === "ArrowFunctionExpression" ||
      nameType === "VariableDeclarator") &&
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
