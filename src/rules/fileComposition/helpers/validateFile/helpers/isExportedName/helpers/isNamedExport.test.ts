import { TSESTree } from "@typescript-eslint/utils";

import {
  IsNamedExportProps,
  IsNamedExportReturn,
  isNamedExport,
} from "rules/fileComposition/helpers/validateFile/helpers/isExportedName/helpers/isNamedExport";

describe("isNamedExport", () => {
  test.each<{ props: IsNamedExportProps; expected: IsNamedExportReturn }>([
    {
      props: {
        name: "className",
        node: {
          type: TSESTree.AST_NODE_TYPES.ClassDeclaration,
          parent: {
            type: TSESTree.AST_NODE_TYPES.Program,
            body: [{ type: TSESTree.AST_NODE_TYPES.VariableDeclaration }],
          },
        } as unknown as IsNamedExportProps["node"],
      },
      expected: {
        currentName: "className",
        currentNode: {
          type: TSESTree.AST_NODE_TYPES.ClassDeclaration,
          parent: {
            type: TSESTree.AST_NODE_TYPES.Program,
            body: [{ type: TSESTree.AST_NODE_TYPES.VariableDeclaration }],
          },
        } as unknown as IsNamedExportReturn["currentNode"],
        isNamedExport: false,
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
                type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
                specifiers: [
                  {
                    local: {
                      name: "className",
                      type: TSESTree.AST_NODE_TYPES.Identifier,
                    },
                    exported: {
                      name: "className",
                      type: TSESTree.AST_NODE_TYPES.Identifier,
                    },
                  },
                ],
              },
            ],
          },
        } as unknown as IsNamedExportProps["node"],
      },
      expected: {
        currentName: "className",
        currentNode: {
          name: "className",
          type: TSESTree.AST_NODE_TYPES.Identifier,
        } as unknown as IsNamedExportReturn["currentNode"],
        isNamedExport: true,
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
                type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
                specifiers: [
                  {
                    local: {
                      name: "className",
                      type: TSESTree.AST_NODE_TYPES.Literal,
                    },
                    exported: {
                      name: "className",
                      type: TSESTree.AST_NODE_TYPES.Literal,
                    },
                  },
                ],
              },
            ],
          },
        } as unknown as IsNamedExportProps["node"],
      },
      expected: {
        currentName: "className",
        currentNode: {
          type: TSESTree.AST_NODE_TYPES.ClassDeclaration,
          parent: {
            type: TSESTree.AST_NODE_TYPES.Program,
            body: [
              {
                type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
                specifiers: [
                  {
                    local: {
                      name: "className",
                      type: TSESTree.AST_NODE_TYPES.Literal,
                    },
                    exported: {
                      name: "className",
                      type: TSESTree.AST_NODE_TYPES.Literal,
                    },
                  },
                ],
              },
            ],
          },
        } as unknown as IsNamedExportProps["node"],
        isNamedExport: false,
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
                type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
                specifiers: [
                  {
                    local: {
                      name: "className",
                      type: TSESTree.AST_NODE_TYPES.Identifier,
                    },
                    exported: {
                      name: "className2",
                      type: TSESTree.AST_NODE_TYPES.Identifier,
                    },
                  },
                ],
              },
            ],
          },
        } as unknown as IsNamedExportProps["node"],
      },
      expected: {
        currentName: "className2",
        currentNode: {
          name: "className2",
          type: TSESTree.AST_NODE_TYPES.Identifier,
        } as unknown as IsNamedExportReturn["currentNode"],
        isNamedExport: true,
      },
    },
  ])("Should return correct value for = %o", ({ props, expected }) => {
    expect(isNamedExport(props)).toEqual(expected);
  });
});
