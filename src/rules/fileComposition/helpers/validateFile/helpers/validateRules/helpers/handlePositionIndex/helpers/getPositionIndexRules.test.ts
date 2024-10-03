import { getPositionIndexRules } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/getPositionIndexRules";

describe("validateRules", () => {
  test("Should return correct values", () => {
    expect(
      getPositionIndexRules({
        filenamePath: "",
        rules: [
          { selector: "arrowFunction", positionIndex: 1, format: "Props" },
          { selector: "variable" },
        ],
      }),
    ).toEqual([{ format: ["Props"], positionIndex: 1 }]);
  });
});
