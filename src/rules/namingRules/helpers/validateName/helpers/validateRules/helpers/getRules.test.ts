import { getRules } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/getRules";

describe("getRules", () => {
  test("Should return correct value for object", () => {
    expect(getRules({ rules: [{ selector: "arrowFunction" }] })).toEqual([
      { selector: "arrowFunction" },
    ]);
  });

  test("Should return correct value for array", () => {
    expect(getRules([{ selector: "arrowFunction" }])).toEqual([
      { selector: "arrowFunction" },
    ]);
  });
});
