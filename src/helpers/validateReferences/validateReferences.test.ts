import { getInvalidReferenceError } from "errors/getInvalidReferenceError";

import { validateReferences } from "helpers/validateReferences/validateReferences";

describe("validateReferences", () => {
  it("should throw getInvalidReferenceError when reference do not exist", () => {
    expect(() =>
      validateReferences({
        allowedReferences: ["ref1", "ref2"],
        pattern: "{ref3}{ref4}{family}{family_1}{dirname}{dirname_1}",
        filterReferences: /^(family|dirname)(_\d+)?$/,
      }),
    ).toThrow(getInvalidReferenceError(["{ref3}", "{ref4}"]));
  });

  it("should not throw when reference exist", () => {
    expect(() =>
      validateReferences({
        allowedReferences: ["ref1", "ref2"],
        pattern: "{ref1}{ref2}",
      }),
    ).not.toThrow();
  });
});
