import { Context, Node } from "rules/fileComposition/fileComposition.types";
import { getNodePosition } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/validatePositionIndex/helpers/getNodePosition";
import { validatePositionIndex } from "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/validatePositionIndex/validatePositionIndex";

jest.mock(
  "rules/fileComposition/helpers/validateFile/helpers/validateRules/helpers/handlePositionIndex/helpers/validatePositionIndex/helpers/getNodePosition",
  () => ({
    getNodePosition: jest.fn(),
  }),
);

describe("validatePositionIndex", () => {
  test("Should return undefined if nodePosition === positionIndex", () => {
    (getNodePosition as jest.Mock).mockReturnValue(1);

    expect(
      validatePositionIndex({
        context: {} as Context,
        node: {} as Node,
        selectorType: "arrowFunction",
        positionIndex: 1,
        bodyWithoutImports: [],
      }),
    ).toEqual(undefined);
  });
});
