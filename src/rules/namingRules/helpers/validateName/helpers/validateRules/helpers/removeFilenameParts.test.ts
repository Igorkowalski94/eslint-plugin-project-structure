import { removeFilenameParts } from "rules/namingRules/helpers/validateName/helpers/validateRules/helpers/removeFilenameParts";
import { NamingRule } from "rules/namingRules/namingRules.types";

describe("removeFilenameParts", () => {
  test.each<{
    filenamePartsToRemove?: NamingRule["filenamePartsToRemove"];
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
