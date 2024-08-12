import { FinalError } from "errors/FinalError";

import { getExternalImportError } from "rules/independentModules/errors/getExternalImportError";
import { getDebugMessage } from "rules/independentModules/helpers/getDebugMessage";

describe("getExternalImportError", () => {
  test.each([
    {
      debugMode: false,
      customError: "custom error",
      expected: new FinalError("custom error"),
    },
    {
      debugMode: false,
      customError: undefined,
      expected: new FinalError(
        `🔥 External imports are not allowed in the module 'module'. 🔥`,
      ),
    },
    {
      debugMode: true,
      customError: "custom error",
      expected: new FinalError(
        "custom error" +
          getDebugMessage({
            allowImportsFromExtracted: [],
            filename: "features/Feature1/components/Child1/Child1.tsx",
            importPath: "features/Feature1/feature1.types.ts",
          }),
      ),
    },
    {
      debugMode: true,
      customError: undefined,
      expected: new FinalError(
        `🔥 External imports are not allowed in the module 'module'. 🔥` +
          getDebugMessage({
            allowImportsFromExtracted: [],
            filename: "features/Feature1/components/Child1/Child1.tsx",
            importPath: "features/Feature1/feature1.types.ts",
          }),
      ),
    },
  ])(
    "Should return correct value for %s",
    ({ customError, expected, debugMode }) => {
      expect(
        getExternalImportError({
          debugMode,
          moduleName: "module",
          errorMessage: customError,
          filename: "features/Feature1/components/Child1/Child1.tsx",
          importPath: "features/Feature1/feature1.types.ts",
          allowImportsFromExtracted: [],
        }),
      ).toEqual(expected);
    },
  );
});
