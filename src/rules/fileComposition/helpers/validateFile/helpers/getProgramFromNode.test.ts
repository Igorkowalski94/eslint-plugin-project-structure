import { TSESTree } from "@typescript-eslint/utils";

import { getProgramFromNode } from "rules/fileComposition/helpers/validateFile/helpers/getProgramFromNode";
import { ValidateFileProps } from "rules/fileComposition/helpers/validateFile/validateFile";

describe("IsExportName", () => {
  test.each<{ node: ValidateFileProps["node"]; expected: TSESTree.Program }>([
    {
      node: {
        type: TSESTree.AST_NODE_TYPES.ClassDeclaration,
        parent: {
          type: TSESTree.AST_NODE_TYPES.Program,
        },
      } as ValidateFileProps["node"],
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
      } as ValidateFileProps["node"],
      expected: {
        type: TSESTree.AST_NODE_TYPES.Program,
      } as TSESTree.Program,
    },
  ])("Should return correct value for = %o", ({ node, expected }) => {
    expect(getProgramFromNode(node)).toEqual(expected);
  });
});
