import { TSESTree } from "@typescript-eslint/utils";

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
});
