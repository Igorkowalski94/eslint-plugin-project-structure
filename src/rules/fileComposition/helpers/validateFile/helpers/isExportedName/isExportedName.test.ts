import { TSESTree } from "@typescript-eslint/utils";

import { NodeType } from "rules/fileComposition/fileComposition.types";
import { isExportDefault } from "rules/fileComposition/helpers/validateFile/helpers/isExportedName/helpers/isExportDefault";
import { isNamedExport } from "rules/fileComposition/helpers/validateFile/helpers/isExportedName/helpers/isNamedExport";
import {
  IsExportedNameReturn,
  isExportedName,
} from "rules/fileComposition/helpers/validateFile/helpers/isExportedName/isExportedName";
import { ValidateFileProps } from "rules/fileComposition/helpers/validateFile/validateFile";

jest.mock(
  "rules/fileComposition/helpers/validateFile/helpers/isExportedName/helpers/isExportDefault",
  () => ({
    isExportDefault: jest.fn(),
  }),
);

jest.mock(
  "rules/fileComposition/helpers/validateFile/helpers/isExportedName/helpers/isNamedExport",
  () => ({
    isNamedExport: jest.fn(),
  }),
);

describe("IsExportName", () => {
  test.each<{
    nodeType: NodeType;
    node:
      | TSESTree.VariableDeclarator
      | TSESTree.ClassDeclaration
      | TSESTree.FunctionDeclaration
      | TSESTree.TSTypeAliasDeclaration
      | TSESTree.TSInterfaceDeclaration
      | TSESTree.TSEnumDeclaration
      | TSESTree.BlockStatement;
    expected: Omit<IsExportedNameReturn, "currentName">;
  }>([
    {
      nodeType: "ClassDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
        },
      } as TSESTree.ClassDeclaration,
      expected: {
        currentNode: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: true,
      },
    },
    {
      nodeType: "ClassDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
        },
      } as TSESTree.ClassDeclaration,
      expected: {
        currentNode: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: true,
      },
    },
    {
      nodeType: "FunctionDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
        },
      } as TSESTree.FunctionDeclaration,
      expected: {
        currentNode: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: true,
      },
    },
    {
      nodeType: "FunctionDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
        },
      } as TSESTree.FunctionDeclaration,
      expected: {
        currentNode: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: true,
      },
    },
    {
      nodeType: "TSEnumDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
        },
      } as TSESTree.TSEnumDeclaration,
      expected: {
        currentNode: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: true,
      },
    },
    {
      nodeType: "TSEnumDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
        },
      } as TSESTree.TSEnumDeclaration,
      expected: {
        currentNode: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: true,
      },
    },

    {
      nodeType: "TSInterfaceDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
        },
      } as TSESTree.TSInterfaceDeclaration,
      expected: {
        currentNode: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: true,
      },
    },
    {
      nodeType: "TSInterfaceDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
        },
      } as TSESTree.TSInterfaceDeclaration,
      expected: {
        currentNode: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: true,
      },
    },

    {
      nodeType: "TSTypeAliasDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
        },
      } as TSESTree.TSTypeAliasDeclaration,
      expected: {
        currentNode: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: true,
      },
    },
    {
      nodeType: "TSTypeAliasDeclaration",
      node: {
        parent: {
          type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
        },
      } as TSESTree.TSTypeAliasDeclaration,
      expected: {
        currentNode: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: true,
      },
    },

    {
      nodeType: "ArrowFunctionExpression",
      node: {
        parent: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
          },
        },
      } as TSESTree.VariableDeclarator,
      expected: {
        currentNode: {
          parent: {
            parent: {
              type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
            },
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: true,
      },
    },
    {
      nodeType: "ArrowFunctionExpression",
      node: {
        parent: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
          },
        },
      } as TSESTree.VariableDeclarator,
      expected: {
        currentNode: {
          parent: {
            parent: {
              type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
            },
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: true,
      },
    },

    {
      nodeType: "VariableDeclarator",
      node: {
        parent: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
          },
        },
      } as TSESTree.VariableDeclarator,
      expected: {
        currentNode: {
          parent: {
            parent: {
              type: TSESTree.AST_NODE_TYPES.ExportDefaultDeclaration,
            },
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: true,
      },
    },
    {
      nodeType: "VariableDeclarator",
      node: {
        parent: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
          },
        },
      } as TSESTree.VariableDeclarator,
      expected: {
        currentNode: {
          parent: {
            parent: {
              type: TSESTree.AST_NODE_TYPES.ExportNamedDeclaration,
            },
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: true,
      },
    },

    {
      nodeType: "ClassDeclaration",
      node: {
        parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
      } as TSESTree.BlockStatement,
      expected: {
        currentNode: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.BlockStatement,
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: false,
      },
    },

    {
      nodeType: "FunctionDeclaration",
      node: {
        parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
      } as TSESTree.BlockStatement,
      expected: {
        currentNode: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.BlockStatement,
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: false,
      },
    },

    {
      nodeType: "TSEnumDeclaration",
      node: {
        parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
      } as TSESTree.BlockStatement,
      expected: {
        currentNode: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.BlockStatement,
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: false,
      },
    },

    {
      nodeType: "TSInterfaceDeclaration",
      node: {
        parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
      } as TSESTree.BlockStatement,
      expected: {
        currentNode: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.BlockStatement,
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: false,
      },
    },

    {
      nodeType: "TSTypeAliasDeclaration",
      node: {
        parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
      } as TSESTree.BlockStatement,
      expected: {
        currentNode: {
          parent: {
            type: TSESTree.AST_NODE_TYPES.BlockStatement,
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: false,
      },
    },

    {
      nodeType: "ArrowFunctionExpression",
      node: {
        parent: {
          parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
        },
      } as TSESTree.BlockStatement,
      expected: {
        currentNode: {
          parent: {
            parent: {
              type: TSESTree.AST_NODE_TYPES.BlockStatement,
            },
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: false,
      },
    },

    {
      nodeType: "VariableDeclarator",
      node: {
        parent: {
          parent: { type: TSESTree.AST_NODE_TYPES.BlockStatement },
        },
      } as TSESTree.BlockStatement,
      expected: {
        currentNode: {
          parent: {
            parent: {
              type: TSESTree.AST_NODE_TYPES.BlockStatement,
            },
          },
        } as IsExportedNameReturn["currentNode"],
        isExportName: false,
      },
    },
  ])("Should return correct value for = %o", ({ nodeType, node, expected }) => {
    (isExportDefault as jest.Mock).mockReturnValue({ isExportDefault: false });
    (isNamedExport as jest.Mock).mockReturnValue({ isNamedExport: false });

    expect(
      isExportedName({
        name: "",
        nodeType,
        node: node as ValidateFileProps["node"],
      }),
    ).toEqual({ ...expected, currentName: "" });
  });

  test("Should return exportDefault data", () => {
    (isExportDefault as jest.Mock).mockReturnValue({
      isExportDefault: true,
      currentNode: { type: "exportDefault" },
      currentName: "newName",
    });
    (isNamedExport as jest.Mock).mockReturnValue({ isNamedExport: false });

    expect(
      isExportedName({
        name: "",
        nodeType: "ArrowFunctionExpression",
        node: {
          parent: { parent: { type: TSESTree.AST_NODE_TYPES.Identifier } },
        } as ValidateFileProps["node"],
      }),
    ).toEqual({
      isExportName: true,
      currentNode: { type: "exportDefault" },
      currentName: "newName",
    });
  });

  test("Should return isNamedExport data", () => {
    (isExportDefault as jest.Mock).mockReturnValue({
      isExportDefault: false,
    });
    (isNamedExport as jest.Mock).mockReturnValue({
      isNamedExport: true,
      currentNode: { type: "namedExport" },
      currentName: "newName",
    });

    expect(
      isExportedName({
        name: "",
        nodeType: "ArrowFunctionExpression",
        node: {
          parent: { parent: { type: TSESTree.AST_NODE_TYPES.Identifier } },
        } as ValidateFileProps["node"],
      }),
    ).toEqual({
      isExportName: true,
      currentNode: { type: "namedExport" },
      currentName: "newName",
    });
  });
});
