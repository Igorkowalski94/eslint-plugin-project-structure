/* eslint-disable complexity */
import { TSESTree } from "@typescript-eslint/utils";

import { SelectorType } from "rules/fileComposition/fileComposition.types";
import { getIdentifierFromExpression } from "rules/fileComposition/helpers/getIdentifierFromExpression";
import { SELECTORS } from "rules/fileComposition/helpers/validateFile/validateFile.consts";

interface GetSelectorNamesFromBodyReturn {
  name: string;
  selector: SelectorType;
  expressionName?: string;
}

export const getSelectorNamesFromBody = (
  body: TSESTree.ProgramStatement[],
): GetSelectorNamesFromBodyReturn[] =>
  body
    .map((node): GetSelectorNamesFromBodyReturn | undefined => {
      const currentNode =
        node.type === TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration ||
        node.type === TSESTree.AST_NODE_TYPES.ExportNamedDeclaration
          ? node.declaration
          : node;

      if (
        currentNode?.type === TSESTree.AST_NODE_TYPES.VariableDeclaration &&
        currentNode.declarations[0].id.type ===
          TSESTree.AST_NODE_TYPES.Identifier
      ) {
        const expressionName = getIdentifierFromExpression(
          currentNode.declarations[0].init,
        );

        if (expressionName) {
          return {
            selector: "variableExpression",
            name: currentNode.declarations[0].id.name,
            expressionName,
          };
        }

        return {
          selector:
            currentNode.declarations[0].init?.type ===
            TSESTree.AST_NODE_TYPES.ArrowFunctionExpression
              ? "arrowFunction"
              : "variable",
          name: currentNode.declarations[0].id.name,
        };
      }

      if (
        (currentNode?.type === TSESTree.AST_NODE_TYPES.FunctionDeclaration ||
          currentNode?.type === TSESTree.AST_NODE_TYPES.ClassDeclaration ||
          currentNode?.type ===
            TSESTree.AST_NODE_TYPES.TSInterfaceDeclaration ||
          currentNode?.type ===
            TSESTree.AST_NODE_TYPES.TSTypeAliasDeclaration ||
          currentNode?.type === TSESTree.AST_NODE_TYPES.TSEnumDeclaration) &&
        currentNode.id?.name
      ) {
        const selector = SELECTORS[currentNode.type];

        return { selector, name: currentNode.id.name };
      }

      return undefined;
    })
    .filter((v): v is GetSelectorNamesFromBodyReturn => v !== undefined);
