import {
  getCustomError,
  GetCustomErrorProps,
} from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isSelectorAllowed/helpers/getCustomError";

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
        file: { arrowFunction: "errorFile" },
      },
      expected: "\n\nerrorFile\n\n",
    },
    {
      allowOnlySpecifiedSelectors: {
        file: { arrowFunction: "errorFile" },
      },
      expected: "\n\nerrorFile\n\n",
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
          scope: "file",
          selectorType: "arrowFunction",
        }),
      ).toEqual(expected);
    },
  );
});
