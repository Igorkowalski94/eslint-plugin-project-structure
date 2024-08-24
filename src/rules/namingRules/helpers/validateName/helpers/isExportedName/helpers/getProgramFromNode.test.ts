import { TSESTree } from "@typescript-eslint/utils";

import { getProgramFromNode } from "rules/namingRules/helpers/validateName/helpers/isExportedName/helpers/getProgramFromNode";
import { ValidateNameProps } from "rules/namingRules/helpers/validateName/validateName";

describe("IsExportName", () => {
  test.each<{ node: ValidateNameProps["node"]; expected: TSESTree.Program }>([
    {
      node: {
        type: TSESTree.AST_NODE_TYPES.ClassDeclaration,
        parent: {
          type: TSESTree.AST_NODE_TYPES.Program,
        },
      } as ValidateNameProps["node"],
      expected: {
        type: TSESTree.AST_NODE_TYPES.Program,
      } as TSESTree.Program,
    },
    {
      node: {
        type: TSESTree.AST_NODE_TYPES.ClassDeclaration,
        parent: {
          type: TSESTree.AST_NODE_TYPES.ClassDeclaration,
          parent: {
            parent: {
              type: TSESTree.AST_NODE_TYPES.Program,
            },
          },
        },
      } as ValidateNameProps["node"],
      expected: {
        type: TSESTree.AST_NODE_TYPES.Program,
      } as TSESTree.Program,
    },
  ])("Should return correct value for = %o", ({ node, expected }) => {
    expect(getProgramFromNode(node)).toEqual(expected);
  });
});
