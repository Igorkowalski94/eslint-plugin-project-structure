import { PositionIndexRule } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/handlePositionIndex.types";
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
    positionIndexRules: PositionIndexRule[];
    expected: number;
  }>([
    {
      name: "Return",
      positionIndexRules: [
        { format: ["Props"], positionIndex: 0 },
        { format: ["Return"], positionIndex: 1 },
        { format: ["Name"], positionIndex: 2 },
      ],
      expected: 0,
    },
    {
      name: "Name",
      positionIndexRules: [
        { format: ["variable"], positionIndex: 0 },
        { format: ["Return"], positionIndex: 1 },
        { format: ["Name"], positionIndex: 2 },
      ],
      expected: 2,
    },
    {
      name: "Name",
      positionIndexRules: [],
      expected: 1,
    },
  ])(
    "Should return correct value for = %o",
    ({ name, positionIndexRules, expected }) => {
      (getSelectorNamesFromBody as jest.Mock).mockReturnValue([
        "variable",
        "Return",
        "Name",
      ]);

      expect(
        getPositionIndex({
          bodyWithoutImports: [],
          name,
          positionIndex: 1,
          positionIndexRules,
        }),
      ).toEqual(expected);
    },
  );
});
