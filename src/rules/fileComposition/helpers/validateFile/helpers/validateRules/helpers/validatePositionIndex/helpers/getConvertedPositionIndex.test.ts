import { getConvertedPositionIndex } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/validatePositionIndex/helpers/getConvertedPositionIndex";

describe("getConvertedPositionIndex", () => {
  test.each<{
    positionIndex: number;
    bodyWithoutImportsLength: number;
    expected: number;
  }>([
    {
      positionIndex: -1,
      bodyWithoutImportsLength: 1,
      expected: 0,
    },
    {
      positionIndex: 2,
      bodyWithoutImportsLength: 1,
      expected: 0,
    },
    {
      positionIndex: 1,
      bodyWithoutImportsLength: 2,
      expected: 1,
    },
  ])(
    "Should return correct values for %o",
    ({ bodyWithoutImportsLength, positionIndex, expected }) => {
      expect(
        getConvertedPositionIndex({
          bodyWithoutImportsLength,
          positionIndex,
        }),
      ).toEqual(expected);
    },
  );
});
