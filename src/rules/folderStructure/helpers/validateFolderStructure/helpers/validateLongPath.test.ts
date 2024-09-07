import { getLongPathError } from "rules/folderStructure/errors/getLongPathError";
import { validateLongPath } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validateLongPath";

jest.mock("rules/folderStructure/errors/getLongPathError", () => ({
  getLongPathError: jest.fn(),
}));

describe("validateFolderStructure", () => {
  it("Should return undefined when longPathsInfo === false", () => {
    expect(validateLongPath({ path: "", longPathsInfo: false })).toEqual(
      undefined,
    );
  });

  it("Should return undefined when path.length < pathMaxLength", () => {
    expect(validateLongPath({ path: "" })).toEqual(undefined);
  });

  it("Should console.error when longPathsInfo === undefined", () => {
    const getLongPathErrorMock = jest.fn();

    (getLongPathError as jest.Mock).mockImplementation(getLongPathErrorMock);

    validateLongPath({
      path: new Array(240).fill("0").join(""),
    });

    expect(getLongPathErrorMock).toHaveBeenCalledWith({
      path: new Array(240).fill("0").join(""),
      pathMaxLength: 240,
      ruleNameInfo: "project-structure/folder-structure",
    });
  });

  it("Should console.error when longPathsInfo.mode === warn", () => {
    const getLongPathErrorMock = jest.fn();

    (getLongPathError as jest.Mock).mockImplementation(getLongPathErrorMock);

    validateLongPath({
      longPathsInfo: { mode: "warn", maxLength: 3 },
      path: "1234",
    });

    expect(getLongPathErrorMock).toHaveBeenCalledWith({
      path: "1234",
      pathMaxLength: 3,
      ruleNameInfo: "project-structure/folder-structure",
    });
  });

  it("Should throw error when longPathsInfo.mode === error", () => {
    expect(() =>
      validateLongPath({
        longPathsInfo: { mode: "error", maxLength: 3 },
        path: "1234",
      }),
    ).toThrow();
  });
});
