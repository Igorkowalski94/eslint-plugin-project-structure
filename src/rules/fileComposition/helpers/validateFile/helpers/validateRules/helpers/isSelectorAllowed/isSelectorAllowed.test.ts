import {
  FileRules,
  Node,
  SelectorType,
} from "rules/fileComposition/fileComposition.types";
import { isSelectorAllowed } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isSelectorAllowed/isSelectorAllowed";

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
        file: false,
      },
      selectorType: "variable",
      expected: true,
    },
    {
      allowOnlySpecifiedSelectors: {
        file: false,
      },
      selectorType: "variable",
      expected: true,
    },
  ])(
    "Should return correct values for %o",
    ({ allowOnlySpecifiedSelectors, selectorType, expected }) => {
      expect(
        isSelectorAllowed({
          errorMessageId: "prohibitedSelector",
          node: {} as Node,
          rules: [{ selector: "arrowFunction" }],
          scope: "file",
          allowOnlySpecifiedSelectors,
          report: jest.fn(),
          selectorType,
        }),
      ).toEqual(expected);
    },
  );
});
