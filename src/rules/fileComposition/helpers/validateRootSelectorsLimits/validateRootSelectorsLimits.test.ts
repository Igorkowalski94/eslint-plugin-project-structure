import { TSESTree } from "@typescript-eslint/utils";
import { parser } from "typescript-eslint";

import { getSelectorsCount } from "rules/fileComposition/helpers/validateRootSelectorsLimits/helpers/getSelectorsCount";
import { validateRootSelectorsLimits } from "rules/fileComposition/helpers/validateRootSelectorsLimits/validateRootSelectorsLimits";

jest.mock(
  "rules/fileComposition/helpers/validateRootSelectorsLimits/helpers/getSelectorsCount",
  () => ({
    getSelectorsCount: jest.fn(),
  }),
);

describe("validateRootSelectorsLimits", () => {
  test("Should return undefined when !rootSelectorsLimits", () => {
    (getSelectorsCount as jest.Mock).mockReturnValue({
      variable: 2,
      variableExpression: 2,
      arrowFunction: 2,
      function: 3,
      class: 3,
      type: 2,
      interface: 3,
    });

    expect(
      validateRootSelectorsLimits({
        node: { body: {} } as TSESTree.Program,
        report: jest.fn(),
        rootSelectorsLimits: undefined,
      }),
    ).toEqual(undefined);
  });

  test("Should return undefined when !error", () => {
    (getSelectorsCount as jest.Mock).mockReturnValue({
      variable: 2,
      variableExpression: 2,
      arrowFunction: 2,
      function: 3,
      class: 3,
      type: 2,
      interface: 3,
    });

    expect(
      validateRootSelectorsLimits({
        node: { body: {} } as TSESTree.Program,
        report: jest.fn(),
        rootSelectorsLimits: [
          {
            selector: ["interface", "type"],
            limit: 5,
          },
          {
            selector: "variable",
            limit: 3,
          },
          {
            selector: "enum",
            limit: 3,
          },
        ],
      }),
    ).toEqual(undefined);
  });

  test("Should throw error when !!error", () => {
    (getSelectorsCount as jest.Mock).mockReturnValue({
      variable: 2,
      variableExpression: 2,
      arrowFunction: 2,
      function: 3,
      class: 3,
      type: 2,
      interface: 3,
    });

    const reportMock = jest.fn();

    validateRootSelectorsLimits({
      node: { body: {} } as TSESTree.Program,
      report: reportMock,
      rootSelectorsLimits: [
        {
          selector: ["interface", "type"],
          limit: 2,
        },
        {
          selector: "variable",
          limit: 1,
        },
        {
          selector: "enum",
          limit: 3,
        },
      ],
    });

    expect(reportMock).toHaveBeenCalledWith({
      node: { body: {} },
      messageId: "rootSelectorsLimits",
      data: {
        error:
          "\nSelector: 'interface', 'type', limit = 2, occurrences = 5.\nSelector: 'variable', limit = 1, occurrences = 2.",
      },
    });
  });

  describe("Limit objects", () => {
    test("Should throw error when !!error", () => {
      (getSelectorsCount as jest.Mock).mockReturnValue({
        variable: 2,
        variableExpression: 2,
        arrowFunction: 2,
        function: 3,
        class: 3,
        type: 2,
        interface: 3,
      });

      const reportMock = jest.fn();

      validateRootSelectorsLimits({
        node: { body: {} } as TSESTree.Program,
        report: reportMock,
        rootSelectorsLimits: [
          {
            selector: ["interface", "type"],
            limit: { min: 2, max: 3 },
          },
          {
            selector: "variable",
            limit: { max: 1 },
          },
          {
            selector: "enum",
            limit: { min: 3 },
          },
        ],
      });

      expect(reportMock).toHaveBeenCalledWith({
        node: { body: {} },
        messageId: "rootSelectorsLimits",
        data: {
          error:
            "\nSelector: 'interface', 'type', min = 2, max = 3, occurrences = 5." +
            "\nSelector: 'variable', max = 1, occurrences = 2." +
            "\nSelector: 'enum', min = 3, occurrences = 0.",
        },
      });
    });

    test("Should return undefined when !error", () => {
      (getSelectorsCount as jest.Mock).mockReturnValue({
        variable: 2,
        variableExpression: 2,
        arrowFunction: 2,
        function: 3,
        class: 3,
        type: 2,
        interface: 3,
      });

      expect(
        validateRootSelectorsLimits({
          node: { body: {} } as TSESTree.Program,
          report: jest.fn(),
          rootSelectorsLimits: [
            {
              selector: ["interface", "type"],
              limit: { min: 2, max: 5 },
            },
            {
              selector: "variable",
              limit: { max: 2 },
            },
            {
              selector: "class",
              limit: { min: 3 },
            },
          ],
        }),
      ).toEqual(undefined);
    });
  });
});

describe("validateRootSelectorsLimits with format", () => {
  const { getSelectorsCount: actualGetSelectorsCount } = jest.requireActual<{
    getSelectorsCount: typeof getSelectorsCount;
  }>(
    "rules/fileComposition/helpers/validateRootSelectorsLimits/helpers/getSelectorsCount",
  );

  beforeEach(() => {
    (getSelectorsCount as jest.Mock).mockImplementation(
      actualGetSelectorsCount,
    );
  });

  const program = parser.parseForESLint(`
    export const useHomeData = () => {};
    const useHiddenHook = createHook();
    const helper = () => {};
  `).ast as TSESTree.Program;

  test("Should count only names matching the format", () => {
    const reportMock = jest.fn();

    validateRootSelectorsLimits({
      node: program,
      report: reportMock,
      filenamePath: "features/home/hooks/useHomeData.ts",
      rootSelectorsLimits: [
        {
          selector: ["arrowFunction", "variableExpression"],
          format: "use{PascalCase}",
          limit: 1,
        },
        {
          selector: "arrowFunction",
          format: ["{fileName}", "helper"],
          limit: { min: 2, max: 2 },
        },
      ],
    });

    expect(reportMock).toHaveBeenCalledWith({
      node: program,
      messageId: "rootSelectorsLimits",
      data: {
        error:
          "\nSelector: 'arrowFunction', 'variableExpression', format = 'use{PascalCase}', limit = 1, occurrences = 2.",
      },
    });
  });

  test("Should apply regexParameters and default the filename", () => {
    const reportMock = jest.fn();

    validateRootSelectorsLimits({
      node: program,
      report: reportMock,
      regexParameters: { hook: "use[A-Z0-9](\\w+)?" },
      rootSelectorsLimits: [
        {
          selector: ["arrowFunction", "variableExpression"],
          format: "{hook}",
          limit: { max: 0 },
        },
      ],
    });

    expect(reportMock).toHaveBeenCalledWith({
      node: program,
      messageId: "rootSelectorsLimits",
      data: {
        error:
          "\nSelector: 'arrowFunction', 'variableExpression', format = '{hook}', max = 0, occurrences = 2.",
      },
    });
  });
});
