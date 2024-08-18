import { TSESTree } from "@typescript-eslint/utils";

import { isExportDefault } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getCurrentData/helpers/isExportedName/helpers/isExportDefault";
import { isNamedExport } from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getCurrentData/helpers/isExportedName/helpers/isNamedExport";
import {
  isExportedName,
  IsExportedNameReturn,
} from "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getCurrentData/helpers/isExportedName/isExportedName";
import { ValidateNameProps } from "rules/namingRules/helpers/validateName/validateName";
import { NameType } from "rules/namingRules/namingRules.types";

jest.mock(
  "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getCurrentData/helpers/isExportedName/helpers/isExportDefault",
  () => ({
    isExportDefault: jest.fn(),
  }),
);

jest.mock(
  "rules/namingRules/helpers/validateName/helpers/validateFileRules/helpers/getCurrentData/helpers/isExportedName/helpers/isNamedExport",
  () => ({
    isNamedExport: jest.fn(),
  }),
);

describe("IsExportName", () => {
  test.each<{
    nameType: NameType;
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
      nameType: "ClassDeclaration",
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
      nameType: "ClassDeclaration",
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
      nameType: "FunctionDeclaration",
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
      nameType: "FunctionDeclaration",
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
      nameType: "TSEnumDeclaration",
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
      nameType: "TSEnumDeclaration",
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
      nameType: "TSInterfaceDeclaration",
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
      nameType: "TSInterfaceDeclaration",
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
      nameType: "TSTypeAliasDeclaration",
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
      nameType: "TSTypeAliasDeclaration",
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
      nameType: "ArrowFunctionExpression",
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
      nameType: "ArrowFunctionExpression",
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
      nameType: "VariableDeclarator",
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
      nameType: "VariableDeclarator",
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
      nameType: "ClassDeclaration",
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
      nameType: "FunctionDeclaration",
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
      nameType: "TSEnumDeclaration",
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
      nameType: "TSInterfaceDeclaration",
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
      nameType: "TSTypeAliasDeclaration",
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
      nameType: "ArrowFunctionExpression",
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
      nameType: "VariableDeclarator",
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
  ])("Should return correct value for = %o", ({ nameType, node, expected }) => {
    (isExportDefault as jest.Mock).mockReturnValue({ isExportDefault: false });
    (isNamedExport as jest.Mock).mockReturnValue({ isNamedExport: false });

    expect(
      isExportedName({
        name: "",
        nameType,
        node: node as ValidateNameProps["node"],
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
        nameType: "ArrowFunctionExpression",
        node: {
          parent: { parent: { type: TSESTree.AST_NODE_TYPES.Identifier } },
        } as ValidateNameProps["node"],
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
        nameType: "ArrowFunctionExpression",
        node: {
          parent: { parent: { type: TSESTree.AST_NODE_TYPES.Identifier } },
        } as ValidateNameProps["node"],
      }),
    ).toEqual({
      isExportName: true,
      currentNode: { type: "namedExport" },
      currentName: "newName",
    });
  });
});
