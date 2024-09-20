import { TSESTree } from "@typescript-eslint/utils";

import {
  IsExportDefaultProps,
  IsExportDefaultReturn,
  isExportDefault,
} from "rules/fileComposition/helpers/validateFile/helpers/isExportedName/helpers/isExportDefault";

describe("isExportDefault", () => {
  test.each<{ props: IsExportDefaultProps; expected: IsExportDefaultReturn }>([
    {
      props: {
        name: "className",
        node: {
          type: TSESTree.AST_NODE_TYPES.ClassDeclaration,
          parent: {
            type: TSESTree.AST_NODE_TYPES.Program,
            body: [{ type: TSESTree.AST_NODE_TYPES.VariableDeclaration }],
          },
        } as unknown as IsExportDefaultProps["node"],
      },
      expected: {
        currentNode: {
          type: TSESTree.AST_NODE_TYPES.ClassDeclaration,
          parent: {
            type: TSESTree.AST_NODE_TYPES.Program,
            body: [{ type: TSESTree.AST_NODE_TYPES.VariableDeclaration }],
          },
        } as unknown as IsExportDefaultReturn["currentNode"],
        isExportDefault: false,
        currentName: "className",
      },
    },

    {
      props: {
        name: "className",
        node: {
          type: TSESTree.AST_NODE_TYPES.ClassDeclaration,
          parent: {
            type: TSESTree.AST_NODE_TYPES.Program,
            body: [
              {
                type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
                declaration: {
                  type: TSESTree.AST_NODE_TYPES.Identifier,
                  name: "className",
                },
              },
            ],
          },
        } as unknown as IsExportDefaultProps["node"],
      },
      expected: {
        currentNode: {
          type: TSESTree.AST_NODE_TYPES.Identifier,
          name: "className",
        } as unknown as IsExportDefaultReturn["currentNode"],
        isExportDefault: true,
        currentName: "className",
      },
    },

    {
      props: {
        name: "className",
        node: {
          type: TSESTree.AST_NODE_TYPES.ClassDeclaration,
          parent: {
            type: TSESTree.AST_NODE_TYPES.Program,
            body: [
              {
                type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
                declaration: {
                  type: TSESTree.AST_NODE_TYPES.ObjectExpression,
                  properties: [
                    {
                      type: TSESTree.AST_NODE_TYPES.Identifier,
                    },
                    {
                      type: TSESTree.AST_NODE_TYPES.Property,
                      value: {
                        type: TSESTree.AST_NODE_TYPES.Identifier,
                        name: "className",
                      },
                      key: {
                        type: TSESTree.AST_NODE_TYPES.Identifier,
                        name: "className2",
                      },
                    },
                  ],
                },
              },
            ],
          },
        } as unknown as IsExportDefaultProps["node"],
      },
      expected: {
        currentNode: {
          type: TSESTree.AST_NODE_TYPES.Identifier,
          name: "className2",
        } as unknown as IsExportDefaultReturn["currentNode"],
        isExportDefault: true,
        currentName: "className2",
      },
    },

    {
      props: {
        name: "className",
        node: {
          type: TSESTree.AST_NODE_TYPES.ClassDeclaration,
          parent: {
            type: TSESTree.AST_NODE_TYPES.Program,
            body: [
              {
                type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
                declaration: {
                  type: TSESTree.AST_NODE_TYPES.ArrayExpression,
                  elements: [
                    undefined,
                    {
                      type: TSESTree.AST_NODE_TYPES.Identifier,
                      name: "className",
                    },
                  ],
                },
              },
            ],
          },
        } as unknown as IsExportDefaultProps["node"],
      },
      expected: {
        currentNode: {
          type: TSESTree.AST_NODE_TYPES.Identifier,
          name: "className",
        } as unknown as IsExportDefaultReturn["currentNode"],
        isExportDefault: true,
        currentName: "className",
      },
    },
  ])("Should return correct value for = %o", ({ props, expected }) => {
    expect(isExportDefault(props)).toEqual(expected);
  });
});
