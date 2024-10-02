import { Context, Node } from "rules/fileComposition/fileComposition.types";
import { getConvertedPositionIndex } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/validatePositionIndex/helpers/getConvertedPositionIndex";
import { getNodePosition } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/validatePositionIndex/helpers/getNodePosition";
import { validatePositionIndex } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/validatePositionIndex/validatePositionIndex";

jest.mock(
  "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/validatePositionIndex/helpers/getNodePosition",
  () => ({
    getNodePosition: jest.fn(),
  }),
);

jest.mock(
  "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/validatePositionIndex/helpers/getConvertedPositionIndex",
  () => ({
    getConvertedPositionIndex: jest.fn(),
  }),
);

describe("validatePositionIndex", () => {
  test("Should return undefined if positionIndex === undefined", () => {
    expect(
      validatePositionIndex({
        context: {} as Context,
        node: {} as Node,
        selectorType: "arrowFunction",
        positionIndex: undefined,
      }),
    ).toEqual(undefined);
  });

  test("Should return undefined if nodePosition === convertedPositionIndex", () => {
    (getNodePosition as jest.Mock).mockReturnValue(1);
    (getConvertedPositionIndex as jest.Mock).mockReturnValue(1);

    expect(
      validatePositionIndex({
        context: {} as Context,
        node: { type: "Program", body: [] } as unknown as Node,
        selectorType: "arrowFunction",
        positionIndex: 1,
      }),
    ).toEqual(undefined);
  });
});
