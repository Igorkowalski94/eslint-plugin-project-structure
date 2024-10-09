import { SelectorType } from "rules/fileComposition/fileComposition.types";
import { getPositionIndex } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/getPositionIndex";
import { getSelectorNamesFromBody } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/getSelectorNamesFromBody";

jest.mock(
  "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/getSelectorNamesFromBody",
  () => ({
    getSelectorNamesFromBody: jest.fn(),
  }),
);

describe("getPositionIndex", () => {
  test.each<{
    name: string;
    selectorType: SelectorType;
    expected: number;
  }>([
    {
      name: "Props",
      selectorType: "interface",
      expected: 0,
    },
    {
      name: "Return",
      selectorType: "interface",
      expected: 1,
    },
    {
      name: "Name",
      selectorType: "arrowFunction",
      expected: 2,
    },
    {
      name: "Last2",
      selectorType: "variable",
      expected: 6,
    },
    {
      name: "Last1",
      selectorType: "variable",
      expected: 7,
    },
    {
      name: "Random",
      selectorType: "variable",
      expected: 1,
    },
  ])(
    "Should return correct value for = %o",
    ({ name, selectorType, expected }) => {
      (getSelectorNamesFromBody as jest.Mock).mockReturnValue([
        { selector: "interface", name: "Return" },
        { selector: "variable", name: "Last2" },
        { selector: "variable", name: "variable3" },
        { selector: "arrowFunction", name: "Name" },
        { selector: "interface", name: "Props" },
        { selector: "variable", name: "variable1" },
        { selector: "variable", name: "Last1" },
        { selector: "variable", name: "variable2" },
      ]);

      expect(
        getPositionIndex({
          bodyWithoutImports: [],
          name,
          positionIndex: 1,
          positionIndexRules: [
            { format: ["Props"], selector: "interface", positionIndex: 0 },
            { format: ["Return"], selector: "interface", positionIndex: 1 },
            { format: ["Name"], selector: "arrowFunction", positionIndex: 2 },
            { format: ["Last2"], selector: "variable", positionIndex: -2 },
            { format: ["Last1"], selector: "variable", positionIndex: -100 },
          ],
          selectorType,
        }),
      ).toEqual(expected);
    },
  );
});
