import { TSESTree } from "@typescript-eslint/utils";

import {
  isNamedExport,
  IsNamedExportProps,
  IsNamedExportReturn,
} from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getCurrentData/helpers/isExportedName/helpers/isNamedExport";

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
                    local: { name: "className" },
                    exported: { name: "className" },
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
                    local: { name: "className" },
                    exported: { name: "className2" },
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
        } as unknown as IsNamedExportReturn["currentNode"],
        isNamedExport: true,
      },
    },
  ])("Should return correct value for = %o", ({ props, expected }) => {
    expect(isNamedExport(props)).toEqual(expected);
  });
});
