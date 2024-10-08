import {
  getCurrentScopeData,
  GetCurrentScopeDataReturn,
} from "rules/fileComposition/helpers/validateFile/helpers/getCurrentScopeData";

describe("getCurrentScopeData", () => {
  test.each<{
    isFileExport: boolean;
    isFileRoot: boolean;
    expected: GetCurrentScopeDataReturn;
  }>([
    {
      isFileExport: true,
      isFileRoot: true,
      expected: {
        errorMessageId: "prohibitedSelectorExport",
        scope: "fileExport",
      },
    },
    {
      isFileExport: false,
      isFileRoot: true,
      expected: {
        errorMessageId: "prohibitedSelectorRoot",
        scope: "fileRoot",
      },
    },
    {
      isFileExport: false,
      isFileRoot: false,
      expected: {
        errorMessageId: "prohibitedSelectorNested",
        scope: "nestedSelectors",
      },
    },
  ])(
    "Should return correct value for = %o",
    ({ isFileExport, isFileRoot, expected }) => {
      expect(getCurrentScopeData({ isFileExport, isFileRoot })).toEqual(
        expected,
      );
    },
  );
});
