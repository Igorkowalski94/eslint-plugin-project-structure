import { TSESTree } from "@typescript-eslint/utils";

import { getSelectorsCount } from "rules/fileComposition/helpers/validateRootSelectorsLimits/helpers/getSelectorsCount";

describe("getSelectorsCount", () => {
  test("Should return correct value", () => {
    expect(
      getSelectorsCount([
        {
          type: "VariableDeclaration",
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: "variable1",
                range: [6, 15],
              },
              init: {
                type: "Literal",
                value: "",
                raw: '""',
                range: [18, 20],
              },
              range: [6, 20],
            },
          ],
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
                  name: "variable2",
                  range: [34, 43],
                },
                init: {
                  type: "Literal",
                  value: "",
                  raw: '""',
                  range: [46, 48],
                },
                range: [34, 48],
              },
            ],
            kind: "const",
            range: [28, 48],
          },
          specifiers: [],
          source: null,
          exportKind: "value",
          range: [21, 48],
          assertions: [],
        },
        {
          type: "VariableDeclaration",
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: "variableExpression1",
                range: [56, 75],
              },
              init: {
                type: "CallExpression",
                callee: {
                  type: "CallExpression",
                  callee: {
                    type: "Identifier",
                    name: "expression",
                    range: [78, 88],
                  },
                  arguments: [],
                  optional: false,
                  range: [78, 90],
                },
                arguments: [],
                optional: false,
                range: [78, 92],
              },
              range: [56, 92],
            },
          ],
          kind: "const",
          range: [50, 92],
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
                  name: "variableExpression2",
                  range: [106, 125],
                },
                init: {
                  type: "CallExpression",
                  callee: {
                    type: "CallExpression",
                    callee: {
                      type: "Identifier",
                      name: "expression",
                      range: [128, 138],
                    },
                    arguments: [],
                    optional: false,
                    range: [128, 140],
                  },
                  arguments: [],
                  optional: false,
                  range: [128, 142],
                },
                range: [106, 142],
              },
            ],
            kind: "const",
            range: [100, 142],
          },
          specifiers: [],
          source: null,
          exportKind: "value",
          range: [93, 142],
          assertions: [],
        },
        {
          type: "VariableDeclaration",
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: "arrowFunction1",
                range: [150, 164],
              },
              init: {
                type: "ArrowFunctionExpression",
                generator: false,
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  body: [],
                  range: [173, 175],
                },
                async: false,
                expression: false,
                range: [167, 175],
              },
              range: [150, 175],
            },
          ],
          kind: "const",
          range: [144, 175],
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
                  name: "arrowFunction2",
                  range: [189, 203],
                },
                init: {
                  type: "ArrowFunctionExpression",
                  generator: false,
                  id: null,
                  params: [],
                  body: {
                    type: "BlockStatement",
                    body: [],
                    range: [212, 214],
                  },
                  async: false,
                  expression: false,
                  range: [206, 214],
                },
                range: [189, 214],
              },
            ],
            kind: "const",
            range: [183, 214],
          },
          specifiers: [],
          source: null,
          exportKind: "value",
          range: [176, 214],
          assertions: [],
        },
        {
          type: "FunctionDeclaration",
          id: {
            type: "Identifier",
            name: "function1",
            range: [225, 234],
          },
          generator: false,
          expression: false,
          async: false,
          params: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [236, 238],
          },
          range: [216, 238],
        },
        {
          type: "ExportNamedDeclaration",
          declaration: {
            type: "FunctionDeclaration",
            id: {
              type: "Identifier",
              name: "function2",
              range: [255, 264],
            },
            generator: false,
            expression: false,
            async: false,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [266, 268],
            },
            range: [246, 268],
          },
          specifiers: [],
          source: null,
          exportKind: "value",
          range: [239, 268],
          assertions: [],
        },
        {
          type: "ExportDefaultDeclaration",
          declaration: {
            type: "FunctionDeclaration",
            id: {
              type: "Identifier",
              name: "function2",
              range: [293, 302],
            },
            generator: false,
            expression: false,
            async: false,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [304, 306],
            },
            range: [284, 306],
          },
          range: [269, 306],
          exportKind: "value",
        },
        {
          type: "ClassDeclaration",
          id: {
            type: "Identifier",
            name: "class1",
            range: [314, 320],
          },
          body: {
            type: "ClassBody",
            body: [],
            range: [320, 322],
          },
          superClass: null,
          range: [308, 322],
        },
        {
          type: "ExportNamedDeclaration",
          declaration: {
            type: "ClassDeclaration",
            id: {
              type: "Identifier",
              name: "class2",
              range: [336, 342],
            },
            body: {
              type: "ClassBody",
              body: [],
              range: [342, 344],
            },
            superClass: null,
            range: [330, 344],
          },
          specifiers: [],
          source: null,
          exportKind: "value",
          range: [323, 344],
          assertions: [],
        },
        {
          type: "ExportDefaultDeclaration",
          declaration: {
            type: "ClassDeclaration",
            id: {
              type: "Identifier",
              name: "class2",
              range: [366, 372],
            },
            body: {
              type: "ClassBody",
              body: [],
              range: [372, 374],
            },
            superClass: null,
            range: [360, 374],
          },
          range: [345, 374],
          exportKind: "value",
        },
        {
          type: "TSTypeAliasDeclaration",
          id: {
            type: "Identifier",
            name: "Type1",
            range: [381, 386],
          },
          typeAnnotation: {
            type: "TSLiteralType",
            literal: {
              type: "Literal",
              value: "",
              raw: '""',
              range: [389, 391],
            },
            range: [389, 391],
          },
          range: [376, 391],
        },
        {
          type: "ExportNamedDeclaration",
          declaration: {
            type: "TSTypeAliasDeclaration",
            id: {
              type: "Identifier",
              name: "Type2",
              range: [404, 409],
            },
            typeAnnotation: {
              type: "TSLiteralType",
              literal: {
                type: "Literal",
                value: "",
                raw: '""',
                range: [412, 414],
              },
              range: [412, 414],
            },
            range: [399, 414],
          },
          specifiers: [],
          source: null,
          exportKind: "type",
          range: [392, 414],
          assertions: [],
        },
        {
          type: "TSInterfaceDeclaration",
          body: {
            type: "TSInterfaceBody",
            body: [],
            range: [437, 439],
          },
          id: {
            type: "Identifier",
            name: "interface1",
            range: [426, 436],
          },
          range: [416, 439],
        },
        {
          type: "ExportNamedDeclaration",
          declaration: {
            type: "TSInterfaceDeclaration",
            body: {
              type: "TSInterfaceBody",
              body: [],
              range: [468, 470],
            },
            id: {
              type: "Identifier",
              name: "interface2",
              range: [457, 467],
            },
            range: [447, 470],
          },
          specifiers: [],
          source: null,
          exportKind: "type",
          range: [440, 470],
          assertions: [],
        },
        {
          type: "ExportDefaultDeclaration",
          declaration: {
            type: "TSInterfaceDeclaration",
            body: {
              type: "TSInterfaceBody",
              body: [],
              range: [507, 509],
            },
            id: {
              type: "Identifier",
              name: "interface3",
              range: [496, 506],
            },
            range: [486, 509],
          },
          range: [471, 509],
          exportKind: "value",
        },
        {
          type: "TSEnumDeclaration",
          id: {
            type: "Identifier",
            name: "enum1",
            range: [516, 521],
          },
          members: [],
          range: [511, 524],
        },
        {
          type: "ExportNamedDeclaration",
          declaration: {
            type: "TSEnumDeclaration",
            id: {
              type: "Identifier",
              name: "enum2",
              range: [537, 542],
            },
            members: [],
            range: [532, 545],
          },
          specifiers: [],
          source: null,
          exportKind: "value",
          range: [525, 545],
          assertions: [],
        },
      ] as TSESTree.ProgramStatement[]),
    ).toEqual({
      variable: 2,
      variableExpression: 2,
      arrowFunction: 2,
      function: 3,
      class: 3,
      type: 2,
      interface: 3,
      enum: 2,
    });
  });
});
