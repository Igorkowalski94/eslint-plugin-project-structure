import fs from "fs";
import path from "path";

import { isExternalImport } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/checkImportPath/helpers/isExternalImport";

describe("isExternalImport", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return false when importPath startsWith .", () => {
    expect(
      isExternalImport({
        importPath: "./react",
        projectRoot: "C:\\Users\\user\\Desktop\\repo",
      }),
    ).toEqual(false);
  });

  it("should return true when importPath startsWith https://", () => {
    expect(
      isExternalImport({
        importPath: "https://esm.sh/react@18",
        projectRoot: "C:\\Users\\user\\Desktop\\repo",
      }),
    ).toEqual(true);
  });

  it("should return true if import is external", () => {
    jest
      .spyOn(path, "join")
      .mockImplementation(
        () => "C:\\Users\\user\\Desktop\\repo\\node_modules\\:react",
      );
    jest
      .spyOn(fs, "existsSync")
      .mockImplementation(
        (path) =>
          path === "C:\\Users\\user\\Desktop\\repo\\node_modules\\:react",
      );
    expect(
      isExternalImport({
        importPath: ":react",
        projectRoot: "C:\\Users\\user\\Desktop\\repo",
      }),
    ).toEqual(true);
  });

  it("should return true if import is external from @types", () => {
    jest
      .spyOn(path, "join")
      .mockImplementation(
        () => "C:\\Users\\user\\Desktop\\repo\\node_modules\\@types\\react",
      );
    jest
      .spyOn(fs, "existsSync")
      .mockImplementation(
        (path) =>
          path ===
          "C:\\Users\\user\\Desktop\\repo\\node_modules\\@types\\react",
      );
    expect(
      isExternalImport({
        importPath: "react",
        projectRoot: "C:\\Users\\user\\Desktop\\repo",
      }),
    ).toEqual(true);
  });

  it("should return false if import is not external", () => {
    jest.spyOn(fs, "existsSync").mockImplementation(() => false);
    expect(
      isExternalImport({
        importPath: "features/feature1",
        projectRoot: "C:\\Users\\user\\Desktop\\repo",
      }),
    ).toEqual(false);
  });
});
