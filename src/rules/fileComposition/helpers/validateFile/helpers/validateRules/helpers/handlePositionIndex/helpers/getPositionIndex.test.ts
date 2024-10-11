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
    expected: number;
    nodeRange: string;
  }>([
    {
      nodeRange: "5",
      expected: 7,
    },
    {
      nodeRange: "1",
      expected: 0,
    },
    {
      nodeRange: "4",
      expected: 1,
    },
    {
      nodeRange: "2",
      expected: 5,
    },
    {
      nodeRange: "7",
      expected: 6,
    },
    {
      nodeRange: "8",
      expected: 0,
    },
  ])("Should return correct value for = %o", ({ nodeRange, expected }) => {
    (getSelectorNamesFromBody as jest.Mock).mockReturnValue([
      { selector: "variable", range: "6", name: "variable1" },
      { selector: "interface", range: "1", name: "Return" },
      { selector: "variable", range: "7", name: "Last1" },
      { selector: "variable", range: "2", name: "Last2" },
      { selector: "variable", range: "3", name: "variable3" },
      { selector: "arrowFunction", range: "4", name: "Name" },
      { selector: "interface", range: "5", name: "Props" },
      { selector: "variable", range: "8", name: "variable2" },
    ]);

    expect(
      getPositionIndex({
        bodyWithoutImports: [],
        positionIndexRules: [
          { format: ["Props"], selector: "interface", positionIndex: -4 },
          { format: ["Last1"], selector: "variable", positionIndex: -99 },
          { format: ["Name"], selector: "arrowFunction", positionIndex: 2 },
          { format: ["Return"], selector: "interface", positionIndex: 1 },
          { format: ["Last2"], selector: "variable", positionIndex: -100 },
        ],
        nodeRange,
      }),
    ).toEqual(expected);
  });

  test.each<{
    nodeRange: string;
    expected: number;
  }>([
    {
      nodeRange: "1",
      expected: 0,
    },
    {
      nodeRange: "2",
      expected: 1,
    },
  ])(
    "Should return correct value for = %o dynamic index",
    ({ nodeRange, expected }) => {
      (getSelectorNamesFromBody as jest.Mock).mockReturnValue([
        { selector: "arrowFunction", range: "1", name: "Name" },
        { selector: "variable", range: "2", name: "Last2" },
      ]);

      expect(
        getPositionIndex({
          bodyWithoutImports: [],
          positionIndexRules: [
            { format: ["Props"], selector: "interface", positionIndex: 0 },
            { format: ["Return"], selector: "interface", positionIndex: 1 },
            { format: ["Name"], selector: "arrowFunction", positionIndex: 2 },
            { format: ["Last2"], selector: "variable", positionIndex: -2 },
            { format: ["Last1"], selector: "variable", positionIndex: -100 },
          ],
          nodeRange,
        }),
      ).toEqual(expected);
    },
  );
});
