import { Rule } from "rules/fileComposition/fileComposition.types";
import { removeFilenameParts } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/removeFilenameParts";

describe("removeFilenameParts", () => {
  test.each<{
    filenamePartsToRemove?: Rule["filenamePartsToRemove"];
    filenameWithoutExtension: string;
    expected: string;
  }>([
    {
      filenamePartsToRemove: [".const"],
      filenameWithoutExtension: "componentName.const",
      expected: "componentName",
    },
    {
      filenamePartsToRemove: ".const",
      filenameWithoutExtension: "componentName.const",
      expected: "componentName",
    },
    {
      filenameWithoutExtension: "componentName.const",
      expected: "componentName.const",
    },
  ])(
    "Should return correct values for %o",
    ({ filenamePartsToRemove, filenameWithoutExtension, expected }) => {
      expect(
        removeFilenameParts({
          filenamePartsToRemove,
          filenameWithoutExtension,
        }),
      ).toEqual(expected);
    },
  );
});
