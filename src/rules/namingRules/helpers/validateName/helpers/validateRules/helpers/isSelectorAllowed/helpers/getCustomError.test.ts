import { getCustomError } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/isSelectorAllowed/helpers/getCustomError";

describe("getRules", () => {
  test("Should return error message when !!errors", () => {
    expect(
      getCustomError({
        selector: "arrowFunction",
        errors: { arrowFunction: "arrowFunction error" },
      }),
    ).toEqual("\n\narrowFunction error\n\n");
  });

  test("Should return undefined when !errors", () => {
    expect(getCustomError({ selector: "arrowFunction" })).toEqual("");
  });
});
