import { getInvalidRegexError } from "errors/getInvalidRegexError";

import { isNameValid } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/isNameValid";

describe("isNameValid", () => {
  test("Should throw getInvalidRegexError when regex is invalid", () => {
    expect(() =>
      isNameValid({
        formatWithoutReferences: ["^?"],
        name: "name",
      }),
    ).toThrow(getInvalidRegexError("^?"));
  });

  test("Should not throw getInvalidRegexError when regex is valid", () => {
    expect(() =>
      isNameValid({
        formatWithoutReferences: ["[A-Z]{6}"],
        name: "name",
      }),
    ).not.toThrow(getInvalidRegexError("[A-Z]{6}"));
  });
});
