import { getInvalidReferenceError } from "errors/getInvalidReferenceError";

import { validateReferences } from "helpers/getRegexWithoutReferences/helpers/validateReferences/validateReferences";

describe("validateReferences", () => {
  it("should throw getInvalidReferenceError when reference do not exist", () => {
    expect(() =>
      validateReferences({
        allowedReferences: ["ref1", "ref2"],
        regex: "{ref3}{ref4}{family}{family_1}{dirname}{dirname_1}",
        filterReferences: /^(family|dirname)(_\d+)?$/,
        key: "name",
      }),
    ).toThrow(
      getInvalidReferenceError({
        invalidReferences: ["{ref3}", "{ref4}"],
        allowedReferences: ["ref1", "ref2"],
        key: "name",
      }),
    );
  });

  it("should not throw when reference exist", () => {
    expect(() =>
      validateReferences({
        allowedReferences: ["ref1", "ref2"],
        regex: "{ref1}{ref2}",
        key: "name",
      }),
    ).not.toThrow();
  });
});
