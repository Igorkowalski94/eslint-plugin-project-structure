import { FinalError } from "errors/FinalError";

import { validateAll } from "rules/independentModules/helpers/validateImport/helpers/validateAll/validateAll";
import {
  validateImport,
  ValidateImportProps,
} from "rules/independentModules/helpers/validateImport/validateImport";

jest.mock(
  "rules/independentModules/helpers/validateImport/helpers/validateAll/validateAll",
  () => ({
    validateAll: jest.fn(),
  }),
);

describe("validateImport", () => {
  test("Should call report when error === FinalError ", () => {
    const reportMock = jest.fn();

    (validateAll as jest.Mock).mockImplementation(() => {
      throw new FinalError("error");
    });

    validateImport({
      context: { report: reportMock, settings: {}, cwd: "", options: [] },
      importPath: "",
      node: {},
      config: {},
    } as unknown as ValidateImportProps);

    expect(reportMock).toHaveBeenCalled();
  });

  test("Should not call report when error !== FinalError ", () => {
    const reportMock = jest.fn();

    (validateAll as jest.Mock).mockImplementation(() => {
      throw new Error("random error");
    });

    expect(() =>
      validateImport({
        context: { report: reportMock, settings: {}, cwd: "", options: [] },
        importPath: "",
        node: {},
        config: {},
      } as unknown as ValidateImportProps),
    ).toThrow(new Error("random error"));
  });
});
