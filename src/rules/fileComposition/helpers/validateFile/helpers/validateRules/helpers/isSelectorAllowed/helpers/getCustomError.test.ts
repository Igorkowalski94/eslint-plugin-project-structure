import { getCustomError } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/isSelectorAllowed/helpers/getCustomError";

describe("getRules", () => {
  test("Should return error message when !!errors", () => {
    expect(
      getCustomError({
        selectorType: "arrowFunction",
        errors: { arrowFunction: "arrowFunction error" },
      }),
    ).toEqual("\n\narrowFunction error\n\n");
  });

  test("Should return undefined when !errors", () => {
    expect(getCustomError({ selectorType: "arrowFunction" })).toEqual("");
  });
});
