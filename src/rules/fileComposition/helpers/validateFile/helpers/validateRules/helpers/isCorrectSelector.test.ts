import { getInvalidRegexError } from "errors/getInvalidRegexError";

import {
  SelectorType,
  Rule,
} from "rules/fileComposition/fileComposition.types";
import { isCorrectSelector } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isCorrectSelector";

describe("isCorrectNameType", () => {
  test.each<{
    selector: Rule["selector"];
    selectorType: SelectorType;
    expected: boolean;
    expressionName?: string;
  }>([
    {
      selector: "arrowFunction",
      selectorType: "arrowFunction",
      expected: true,
    },
    {
      selector: ["arrowFunction"],
      selectorType: "arrowFunction",
      expected: true,
    },
    {
      selector: "class",
      selectorType: "arrowFunction",
      expected: false,
    },
    {
      selector: ["class"],
      selectorType: "arrowFunction",
      expected: false,
    },
    {
      selector: { type: "variableExpression", limitTo: "styled" },
      selectorType: "variableExpression",
      expressionName: "styled",
      expected: true,
    },
    {
      selector: [{ type: "variableExpression", limitTo: "styled" }],
      selectorType: "variableExpression",
      expressionName: "styled",
      expected: true,
    },
    {
      selector: { type: "variableExpression", limitTo: "styled" },
      selectorType: "variableExpression",
      expressionName: "css",
      expected: false,
    },
    {
      selector: { type: "variableExpression", limitTo: "*" },
      selectorType: "variableExpression",
      expressionName: "css",
      expected: true,
    },
    {
      selector: { type: "variableExpression", limitTo: "(?!css)*" },
      selectorType: "variableExpression",
      expressionName: "css",
      expected: false,
    },
    {
      selector: [{ type: "variableExpression", limitTo: "styled" }],
      selectorType: "variableExpression",
      expressionName: "css",
      expected: false,
    },
    {
      selector: { type: "variableExpression", limitTo: "styled" },
      selectorType: "variable",
      expected: false,
    },
    {
      selector: [{ type: "variableExpression", limitTo: "styled" }],
      selectorType: "variable",
      expected: false,
    },
  ])(
    "Should return correct values for %o",
    ({ selectorType, selector, expressionName, expected }) => {
      expect(
        isCorrectSelector({
          selectorType,
          selector,
          expressionName,
        }),
      ).toEqual(expected);
    },
  );

  test("Should throw when regex is invalid", () => {
    expect(() =>
      isCorrectSelector({
        selector: { type: "variableExpression", limitTo: "^?" },
        selectorType: "variableExpression",
        expressionName: "expressionName",
      }),
    ).toThrow(getInvalidRegexError("^?"));
  });
});
