import {
  SelectorType,
  FileRule,
} from "rules/fileComposition/fileComposition.types";
import { isCorrectSelector } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isCorrectSelector";

describe("isCorrectNameType", () => {
  test.each<{
    selector: FileRule["selector"];
    selectorKey: SelectorType;
    expected: boolean;
  }>([
    {
      selector: "arrowFunction",
      selectorKey: "arrowFunction",
      expected: true,
    },
    {
      selector: ["arrowFunction"],
      selectorKey: "arrowFunction",
      expected: true,
    },
    {
      selector: "class",
      selectorKey: "arrowFunction",
      expected: false,
    },
    {
      selector: ["class"],
      selectorKey: "arrowFunction",
      expected: false,
    },
    {
      selector: { type: "variableExpression", limitTo: "styled" },
      selectorKey: "variableExpression",
      expected: true,
    },
    {
      selector: [{ type: "variableExpression", limitTo: "styled" }],
      selectorKey: "variableExpression",
      expected: true,
    },
    {
      selector: { type: "variableExpression", limitTo: "styled" },
      selectorKey: "variable",
      expected: false,
    },
    {
      selector: [{ type: "variableExpression", limitTo: "styled" }],
      selectorKey: "variable",
      expected: false,
    },
  ])(
    "Should return correct values for %o",
    ({ selectorKey, selector, expected }) => {
      expect(
        isCorrectSelector({
          selectorKey,
          selector,
        }),
      ).toEqual(expected);
    },
  );
});
