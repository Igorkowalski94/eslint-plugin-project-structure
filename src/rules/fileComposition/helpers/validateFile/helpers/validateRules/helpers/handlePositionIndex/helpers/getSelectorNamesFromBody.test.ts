import { TSESTree } from "@typescript-eslint/utils";

import { getSelectorNamesFromBody } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/getSelectorNamesFromBody";

describe("getSelectorNamesFromBody", () => {
  test("Should return correct values", () => {
    expect(
      getSelectorNamesFromBody([
        {
          type: "VariableDeclaration",
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: "variable",
                range: [6, 14],
              },
              init: {
                type: "Literal",
                value: "",
                raw: '""',
                range: [17, 19],
              },
              range: [6, 19],
            },
          ],
          kind: "const",
          range: [0, 19],
        },
        {
          type: "VariableDeclaration",
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: "arrowFunction",
                range: [26, 39],
              },
              init: {
                type: "ArrowFunctionExpression",
                generator: false,
                id: null,
                params: [],
                body: {
                  type: "Literal",
                  value: "",
                  raw: '""',
                  range: [48, 50],
                },
                async: false,
                expression: true,
                range: [42, 50],
              },
              range: [26, 50],
            },
          ],
          kind: "const",
          range: [20, 50],
        },
        {
          type: "FunctionDeclaration",
          id: {
            type: "Identifier",
            name: "Function",
            range: [60, 68],
          },
          generator: false,
          expression: false,
          async: false,
          params: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [70, 72],
          },
          range: [51, 72],
        },
        {
          type: "ClassDeclaration",
          id: {
            type: "Identifier",
            name: "Class",
            range: [79, 84],
          },
          body: {
            type: "ClassBody",
            body: [],
            range: [85, 87],
          },
          superClass: null,
          range: [73, 87],
        },
        {
          type: "TSTypeAliasDeclaration",
          id: {
            type: "Identifier",
            name: "Type",
            range: [93, 97],
          },
          typeAnnotation: {
            type: "TSLiteralType",
            literal: {
              type: "Literal",
              value: "",
              raw: '""',
              range: [100, 102],
            },
            range: [100, 102],
          },
          range: [88, 102],
        },
        {
          type: "TSInterfaceDeclaration",
          body: {
            type: "TSInterfaceBody",
            body: [],
            range: [123, 125],
          },
          id: {
            type: "Identifier",
            name: "Interface",
            range: [113, 122],
          },
          range: [103, 125],
        },
        {
          type: "TSEnumDeclaration",
          id: {
            type: "Identifier",
            name: "Enum",
            range: [131, 135],
          },
          members: [],
          range: [126, 138],
        },
        {
          type: "ExportNamedDeclaration",
          declaration: {
            type: "VariableDeclaration",
            declarations: [
              {
                type: "VariableDeclarator",
                id: {
                  type: "Identifier",
                  name: "variable",
                  range: [154, 162],
                },
                init: {
                  type: "Literal",
                  value: "",
                  raw: '""',
                  range: [165, 167],
                },
                range: [154, 167],
              },
            ],
            kind: "const",
            range: [148, 167],
          },
          specifiers: [],
          source: null,
          exportKind: "value",
          range: [141, 167],
          assertions: [],
        },
        {
          type: "ExportNamedDeclaration",
          declaration: {
            type: "VariableDeclaration",
            declarations: [
              {
                type: "VariableDeclarator",
                id: {
                  type: "Identifier",
                  name: "arrowFunction",
                  range: [181, 194],
                },
                init: {
                  type: "ArrowFunctionExpression",
                  generator: false,
                  id: null,
                  params: [],
                  body: {
                    type: "Literal",
                    value: "",
                    raw: '""',
                    range: [203, 205],
                  },
                  async: false,
                  expression: true,
                  range: [197, 205],
                },
                range: [181, 205],
              },
            ],
            kind: "const",
            range: [175, 205],
          },
          specifiers: [],
          source: null,
          exportKind: "value",
          range: [168, 205],
          assertions: [],
        },
        {
          type: "ExportNamedDeclaration",
          declaration: {
            type: "FunctionDeclaration",
            id: {
              type: "Identifier",
              name: "Function",
              range: [222, 230],
            },
            generator: false,
            expression: false,
            async: false,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [232, 234],
            },
            range: [213, 234],
          },
          specifiers: [],
          source: null,
          exportKind: "value",
          range: [206, 234],
          assertions: [],
        },
        {
          type: "ExportNamedDeclaration",
          declaration: {
            type: "ClassDeclaration",
            id: {
              type: "Identifier",
              name: "Class",
              range: [248, 253],
            },
            body: {
              type: "ClassBody",
              body: [],
              range: [254, 256],
            },
            superClass: null,
            range: [242, 256],
          },
          specifiers: [],
          source: null,
          exportKind: "value",
          range: [235, 256],
          assertions: [],
        },
        {
          type: "ExportNamedDeclaration",
          declaration: {
            type: "TSTypeAliasDeclaration",
            id: {
              type: "Identifier",
              name: "Type",
              range: [269, 273],
            },
            typeAnnotation: {
              type: "TSLiteralType",
              literal: {
                type: "Literal",
                value: "",
                raw: '""',
                range: [276, 278],
              },
              range: [276, 278],
            },
            range: [264, 278],
          },
          specifiers: [],
          source: null,
          exportKind: "type",
          range: [257, 278],
          assertions: [],
        },
        {
          type: "ExportNamedDeclaration",
          declaration: {
            type: "TSInterfaceDeclaration",
            body: {
              type: "TSInterfaceBody",
              body: [],
              range: [306, 308],
            },
            id: {
              type: "Identifier",
              name: "Interface",
              range: [296, 305],
            },
            range: [286, 308],
          },
          specifiers: [],
          source: null,
          exportKind: "type",
          range: [279, 308],
          assertions: [],
        },
        {
          type: "ExportNamedDeclaration",
          declaration: {
            type: "TSEnumDeclaration",
            id: {
              type: "Identifier",
              name: "Enum",
              range: [321, 325],
            },
            members: [],
            range: [316, 328],
          },
          specifiers: [],
          source: null,
          exportKind: "value",
          range: [309, 328],
          assertions: [],
        },
        {
          type: "ExportDefaultDeclaration",
          declaration: {
            type: "FunctionDeclaration",
            id: {
              type: "Identifier",
              name: "Function",
              range: [354, 362],
            },
            generator: false,
            expression: false,
            async: false,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [364, 366],
            },
            range: [345, 366],
          },
          range: [330, 366],
          exportKind: "value",
        },
        {
          type: "ExportDefaultDeclaration",
          declaration: {
            type: "ClassDeclaration",
            id: {
              type: "Identifier",
              name: "Class",
              range: [388, 393],
            },
            body: {
              type: "ClassBody",
              body: [],
              range: [394, 396],
            },
            superClass: null,
            range: [382, 396],
          },
          range: [367, 396],
          exportKind: "value",
        },
        {
          type: "ExportDefaultDeclaration",
          declaration: {
            type: "TSInterfaceDeclaration",
            body: {
              type: "TSInterfaceBody",
              body: [],
              range: [432, 434],
            },
            id: {
              type: "Identifier",
              name: "Interface",
              range: [422, 431],
            },
            range: [412, 434],
          },
          range: [397, 434],
          exportKind: "value",
        },
      ] as unknown as TSESTree.ProgramStatement[]),
    ).toEqual([
      "variable",
      "arrowFunction",
      "Function",
      "Class",
      "Type",
      "Interface",
      "Enum",
      "variable",
      "arrowFunction",
      "Function",
      "Class",
      "Type",
      "Interface",
      "Enum",
      "Function",
      "Class",
      "Interface",
    ]);
  });
});
