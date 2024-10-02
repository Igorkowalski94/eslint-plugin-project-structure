import { TSESTree } from "@typescript-eslint/utils";

import { Node } from "rules/fileComposition/fileComposition.types";
import { getNodePosition } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/validatePositionIndex/helpers/getNodePosition";

describe("getConvertedPositionIndex", () => {
  test.each<{
    node: Node;
    expected: number;
  }>([
    {
      node: {
        type: "VariableDeclarator",
        parent: {
          type: "VariableDeclaration",
          parent: { type: "Program", range: [0, 76] },
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
                value: 1,
                raw: "1",
                range: [17, 18],
              },
              range: [6, 18],
            },
          ],
          kind: "const",
          range: [0, 18],
        },
        id: {
          type: "Identifier",
          name: "variable",
          range: [6, 14],
        },
        init: {
          type: "Literal",
          value: 1,
          raw: "1",
          range: [17, 18],
        },
        range: [6, 18],
      } as Node,
      expected: 0,
    },
    {
      node: {
        type: "VariableDeclarator",
        parent: {
          type: "VariableDeclaration",
          parent: { type: "Program", range: [0, 76] },
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: "arrowFunction",
                range: [25, 38],
              },
              init: {
                type: "ArrowFunctionExpression",
                generator: false,
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  body: [],
                  range: [47, 49],
                },
                async: false,
                expression: false,
                range: [41, 49],
              },
              range: [25, 49],
            },
          ],
          kind: "const",
          range: [19, 49],
        },
        id: {
          type: "Identifier",
          name: "arrowFunction",
          range: [25, 38],
        },
        init: {
          type: "ArrowFunctionExpression",
          generator: false,
          id: null,
          params: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [47, 49],
          },
          async: false,
          expression: false,
          range: [41, 49],
        },
        range: [25, 49],
      } as unknown as Node,
      expected: 1,
    },
    {
      node: {
        type: "FunctionDeclaration",
        parent: { type: "Program", range: [0, 76] },
        id: {
          type: "Identifier",
          name: "functionName",
          range: [59, 71],
        },
        generator: false,
        expression: false,
        async: false,
        params: [],
        body: {
          type: "BlockStatement",
          body: [],
          range: [73, 75],
        },
        range: [50, 75],
      } as unknown as Node,
      expected: 2,
    },
    {
      node: {
        type: "VariableDeclarator",
        parent: {
          type: "VariableDeclaration",
          parent: {
            type: "ExportNamedDeclaration",
            declaration: {
              type: "VariableDeclaration",
              declarations: [
                {
                  type: "VariableDeclarator",
                  id: {
                    type: "Identifier",
                    name: "arrowFunction",
                    range: [89, 102],
                  },
                  init: {
                    type: "ArrowFunctionExpression",
                    generator: false,
                    id: null,
                    params: [],
                    body: {
                      type: "BlockStatement",
                      body: [],
                      range: [111, 113],
                    },
                    async: false,
                    expression: false,
                    range: [105, 113],
                  },
                  range: [89, 113],
                },
              ],
              kind: "const",
              range: [83, 113],
            },
            specifiers: [],
            source: null,
            exportKind: "value",
            range: [76, 113],
            assertions: [],
          },
          declarations: [
            {
              type: "VariableDeclarator",
              id: {
                type: "Identifier",
                name: "arrowFunction",
                range: [89, 102],
              },
              init: {
                type: "ArrowFunctionExpression",
                generator: false,
                id: null,
                params: [],
                body: {
                  type: "BlockStatement",
                  body: [],
                  range: [111, 113],
                },
                async: false,
                expression: false,
                range: [105, 113],
              },
              range: [89, 113],
            },
          ],
          kind: "const",
          range: [83, 113],
        },
        id: {
          type: "Identifier",
          name: "arrowFunction",
          range: [89, 102],
        },
        init: {
          type: "ArrowFunctionExpression",
          generator: false,
          id: null,
          params: [],
          body: {
            type: "BlockStatement",
            body: [],
            range: [111, 113],
          },
          async: false,
          expression: false,
          range: [105, 113],
        },
        range: [89, 113],
      } as unknown as Node,
      expected: 3,
    },
  ])("Should return correct values for %o", ({ node, expected }) => {
    expect(
      getNodePosition({
        bodyWithoutImports: [
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
                  value: 1,
                  raw: "1",
                  range: [17, 18],
                },
                range: [6, 18],
              },
            ],
            kind: "const",
            range: [0, 18],
          },
          {
            type: "VariableDeclaration",
            declarations: [
              {
                type: "VariableDeclarator",
                id: {
                  type: "Identifier",
                  name: "arrowFunction",
                  range: [25, 38],
                },
                init: {
                  type: "ArrowFunctionExpression",
                  generator: false,
                  id: null,
                  params: [],
                  body: {
                    type: "BlockStatement",
                    body: [],
                    range: [47, 49],
                  },
                  async: false,
                  expression: false,
                  range: [41, 49],
                },
                range: [25, 49],
              },
            ],
            kind: "const",
            range: [19, 49],
          },
          {
            type: "FunctionDeclaration",
            id: {
              type: "Identifier",
              name: "functionName",
              range: [59, 71],
            },
            generator: false,
            expression: false,
            async: false,
            params: [],
            body: {
              type: "BlockStatement",
              body: [],
              range: [73, 75],
            },
            range: [50, 75],
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
                    range: [89, 102],
                  },
                  init: {
                    type: "ArrowFunctionExpression",
                    generator: false,
                    id: null,
                    params: [],
                    body: {
                      type: "BlockStatement",
                      body: [],
                      range: [111, 113],
                    },
                    async: false,
                    expression: false,
                    range: [105, 113],
                  },
                  range: [89, 113],
                },
              ],
              kind: "const",
              range: [83, 113],
            },
            specifiers: [],
            source: null,
            exportKind: "value",
            range: [76, 113],
            assertions: [],
          },
        ] as TSESTree.ProgramStatement[],
        node,
      }),
    ).toEqual(expected);
  });
});
