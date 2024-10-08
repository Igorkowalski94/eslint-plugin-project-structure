import {
  FileRules,
  Node,
  SelectorType,
} from "rules/fileComposition/fileComposition.types";
import { isSelectorAllowed } from "rules/fileComposition/helpers/validateFile/helpers/isSelectorAllowed/isSelectorAllowed";

describe("isSelectorAllowed", () => {
  test.each<{
    allowOnlySpecifiedSelectors: FileRules["allowOnlySpecifiedSelectors"];
    expected: boolean;
    selectorType: SelectorType;
  }>([
    {
      allowOnlySpecifiedSelectors: true,
      selectorType: "arrowFunction",
      expected: true,
    },
    {
      allowOnlySpecifiedSelectors: true,
      selectorType: "variable",
      expected: false,
    },
    {
      allowOnlySpecifiedSelectors: {
        nestedSelectors: true,
      },
      selectorType: "variable",
      expected: false,
    },
    {
      allowOnlySpecifiedSelectors: {
        nestedSelectors: false,
      },
      selectorType: "variable",
      expected: true,
    },
  ])(
    "Should return correct values for %o",
    ({ allowOnlySpecifiedSelectors, selectorType, expected }) => {
      expect(
        isSelectorAllowed({
          errorMessageId: "prohibitedSelectorNested",
          node: {} as Node,
          rules: [{ selector: "arrowFunction" }],
          scope: "nestedSelectors",
          allowOnlySpecifiedSelectors,
          report: jest.fn(),
          selectorType,
        }),
      ).toEqual(expected);
    },
  );
});
