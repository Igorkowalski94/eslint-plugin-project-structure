import {
  getCustomError,
  GetCustomErrorProps,
} from "rules/fileComposition/helpers/validateFile/helpers/isSelectorAllowed/helpers/getCustomError";

describe("getCustomError", () => {
  test.each<{
    allowOnlySpecifiedSelectors: GetCustomErrorProps["allowOnlySpecifiedSelectors"];
    expected: string;
  }>([
    {
      allowOnlySpecifiedSelectors: true,
      expected: "",
    },
    {
      allowOnlySpecifiedSelectors: { error: { arrowFunction: "errorGlobal" } },
      expected: "\n\nerrorGlobal\n\n",
    },
    {
      allowOnlySpecifiedSelectors: {
        error: { arrowFunction: "errorGlobal" },
        nestedSelectors: { arrowFunction: "errorNested" },
      },
      expected: "\n\nerrorNested\n\n",
    },
    {
      allowOnlySpecifiedSelectors: {
        error: { function: "errorGlobal" },
        nestedSelectors: { function: "errorNested" },
      },
      expected: "",
    },
    {
      allowOnlySpecifiedSelectors: {
        nestedSelectors: { arrowFunction: "errorNested" },
      },
      expected: "\n\nerrorNested\n\n",
    },
    {
      allowOnlySpecifiedSelectors: {},
      expected: "",
    },
  ])(
    "Should return correct values for %o",
    ({ allowOnlySpecifiedSelectors, expected }) => {
      expect(
        getCustomError({
          allowOnlySpecifiedSelectors,
          scope: "nestedSelectors",
          selectorType: "arrowFunction",
        }),
      ).toEqual(expected);
    },
  );
});
