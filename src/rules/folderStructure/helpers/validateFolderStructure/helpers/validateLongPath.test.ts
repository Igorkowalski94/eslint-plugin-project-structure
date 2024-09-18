import { getLongPathError } from "rules/folderStructure/errors/getLongPathError";
import { validateLongPath } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validateLongPath";

jest.mock("rules/folderStructure/errors/getLongPathError", () => ({
  getLongPathError: jest.fn(),
}));

describe("validateFolderStructure", () => {
  it("Should return undefined when longPathsInfo === false", () => {
    expect(
      validateLongPath({
        filename: "",
        longPathsInfo: false,
        cwd: "C:/Users/eslint-plugin-project-structure",
      }),
    ).toEqual(undefined);
  });

  it("Should return undefined when path.length < pathMaxLength", () => {
    expect(
      validateLongPath({
        filename:
          "C:/Users/eslint-plugin-project-structure/features/Feature.tsx",
        cwd: "C:/Users/eslint-plugin-project-structure",
      }),
    ).toEqual(undefined);
  });

  it("Should console.error when longPathsInfo === undefined", () => {
    const getLongPathErrorMock = jest.fn();

    (getLongPathError as jest.Mock).mockImplementation(getLongPathErrorMock);

    validateLongPath({
      filename: `C:/Users/eslint-plugin-project-structure/${new Array(240).fill("0").join("")}`,
      cwd: "C:/Users/eslint-plugin-project-structure",
    });

    expect(getLongPathErrorMock).toHaveBeenCalledWith({
      path: `eslint-plugin-project-structure/${new Array(240).fill("0").join("")}`,
      pathMaxLength: 240,
      ruleNameInfo: "project-structure/folder-structure",
    });
  });

  it("Should console.error when longPathsInfo.mode === warn", () => {
    const getLongPathErrorMock = jest.fn();

    (getLongPathError as jest.Mock).mockImplementation(getLongPathErrorMock);

    validateLongPath({
      longPathsInfo: { mode: "warn", root: "../../", maxLength: 3 },
      cwd: "C:/hello/Users/eslint-plugin-project-structure",
      filename:
        "C:/hello/Users/eslint-plugin-project-structure/src/features/Feature1.tsx",
    });

    expect(getLongPathErrorMock).toHaveBeenCalledWith({
      path: "Users/eslint-plugin-project-structure/src/features/Feature1.tsx",
      pathMaxLength: 3,
      ruleNameInfo: "project-structure/folder-structure",
    });
  });

  it("Should console.error when longPathsInfo.mode === warn && countFromSystemRoot", () => {
    const getLongPathErrorMock = jest.fn();

    (getLongPathError as jest.Mock).mockImplementation(getLongPathErrorMock);

    validateLongPath({
      longPathsInfo: { mode: "warn", countFromSystemRoot: true, maxLength: 3 },
      cwd: "C:/hello/Users/eslint-plugin-project-structure",
      filename:
        "C:/hello/Users/eslint-plugin-project-structure/src/features/Feature1.tsx",
    });

    expect(getLongPathErrorMock).toHaveBeenCalledWith({
      path: "C:/hello/Users/eslint-plugin-project-structure/src/features/Feature1.tsx",
      pathMaxLength: 3,
      ruleNameInfo: "project-structure/folder-structure",
    });
  });

  it("Should throw error when longPathsInfo.mode === error", () => {
    expect(() =>
      validateLongPath({
        longPathsInfo: { mode: "error", maxLength: 3 },
        filename:
          "C:/Users/eslint-plugin-project-structure/features/Feature.tsx",
        cwd: "C:/Users/eslint-plugin-project-structure",
      }),
    ).toThrow();
  });
});
