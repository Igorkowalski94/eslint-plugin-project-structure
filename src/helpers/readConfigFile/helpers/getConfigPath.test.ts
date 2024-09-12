import path from "path";

import { getMissingConfigFileError } from "errors/getMissingConfigFileError";

import { getConfigPath } from "helpers/readConfigFile/helpers/getConfigPath";

describe("getConfigPath", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should throw getMissingConfigFileError when config path is missing", () => {
    expect(() =>
      getConfigPath({ cwd: "src", key: "ruleKey", settings: {} }),
    ).toThrow(getMissingConfigFileError("ruleKey"));
  });

  it("should return config path when settings contain config path - relative", () => {
    jest
      .spyOn(path, "resolve")
      .mockImplementation(() => "C:\\relative\\src\\config.json");

    expect(
      getConfigPath({
        cwd: "C:/relative/src",
        key: "ruleKey",
        settings: { ruleKey: "config.json" },
      }),
    ).toEqual("C:\\relative\\src\\config.json");
  });

  it("should return config path when settings contain config path - absolute", () => {
    jest
      .spyOn(path, "resolve")
      .mockImplementation(() => "D:\\relative\\src\\config.json");

    expect(
      getConfigPath({
        cwd: "C:/absolute/src",
        key: "ruleKey",
        settings: {
          ruleKey: "D:\\relative\\src\\config.json",
        },
      }),
    ).toEqual("D:\\relative\\src\\config.json");
  });
});
