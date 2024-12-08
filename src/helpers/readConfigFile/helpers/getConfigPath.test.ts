import path from "path";

import { getMissingConfigFileError } from "errors/getMissingConfigFileError";

import { getProjectRoot } from "helpers/getProjectRoot";
import { getConfigPath } from "helpers/readConfigFile/helpers/getConfigPath";

jest.mock("helpers/getProjectRoot", () => ({ getProjectRoot: jest.fn() }));

describe("getConfigPath", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should throw getMissingConfigFileError when config path is missing", () => {
    (getProjectRoot as jest.Mock).mockReturnValue("src");

    expect(() =>
      getConfigPath({ key: "ruleKey", settings: {}, cwd: "cwd" }),
    ).toThrow(getMissingConfigFileError("ruleKey"));
  });

  it("should return config path when settings contain config path - relative", () => {
    jest
      .spyOn(path, "resolve")
      .mockImplementation(() => "C:\\relative\\src\\config.json");

    (getProjectRoot as jest.Mock).mockReturnValue("C:/relative/src");

    expect(
      getConfigPath({
        key: "ruleKey",
        settings: { ruleKey: "config.json" },
        cwd: "cwd",
      }),
    ).toEqual("C:\\relative\\src\\config.json");
  });

  it("should return config path when settings contain config path - absolute", () => {
    jest
      .spyOn(path, "resolve")
      .mockImplementation(() => "D:\\relative\\src\\config.json");

    (getProjectRoot as jest.Mock).mockReturnValue("C:/absolute/src");

    expect(
      getConfigPath({
        key: "ruleKey",
        settings: {
          ruleKey: "D:\\relative\\src\\config.json",
        },
        cwd: "cwd",
      }),
    ).toEqual("D:\\relative\\src\\config.json");
  });
});
