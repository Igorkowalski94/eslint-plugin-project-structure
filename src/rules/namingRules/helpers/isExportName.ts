import { TSESTree } from "@typescript-eslint/utils";

import { ValidateNameProps } from "rules/namingRules/helpers/validateName";
import { NameType } from "rules/namingRules/namingRules.types";

export interface IsExportNameProps {
  nameType: NameType;
  node: ValidateNameProps["node"];
}

export const isExportName = ({
  nameType,
  node,
}: IsExportNameProps): boolean => {
  if (
    nameType === "ArrowFunctionExpression" ||
    nameType === "VariableDeclarator"
  )
    return (
      node.parent.parent?.type ===
        TSESTree.AST_NODE_TYPES.ExportNamedDeclaration ||
      node.parent.parent?.type ===
        TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration
    );

  return (
    node.parent.type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration ||
    node.parent.type === TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration
  );
};
