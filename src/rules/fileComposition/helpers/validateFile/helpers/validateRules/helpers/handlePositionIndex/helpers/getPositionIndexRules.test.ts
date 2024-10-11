import { getPositionIndexRules } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/getPositionIndexRules";

describe("validateRules", () => {
  test("Should return correct values", () => {
    expect(
      getPositionIndexRules({
        filenamePath: "",
        rules: [
          { selector: "arrowFunction", positionIndex: 1, format: "Props" },
          {
            selector: "class",
            positionIndex: { sorting: "az", index: 2 },
            format: "someClass",
          },
          { selector: "variable" },
        ],
      }),
    ).toEqual([
      { format: ["Props"], selector: "arrowFunction", positionIndex: 1 },
      {
        selector: "class",
        positionIndex: 2,
        format: ["someClass"],
      },
    ]);
  });
});
