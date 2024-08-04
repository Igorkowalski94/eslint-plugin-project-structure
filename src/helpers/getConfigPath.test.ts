import { getConfigPath } from "./getConfigPath";
import { getMissingConfigFileError } from "../errors/getMissingConfigFileError";

describe("getConfigPath", () => {
    it("should throw getMissingConfigFileError when config path is missing", () => {
        expect(() =>
            getConfigPath({ cwd: "src", key: "ruleKey", settings: {} }),
        ).toThrow(getMissingConfigFileError("ruleKey"));
    });

    it("should return config path when settings contain config path - relative", () => {
        expect(
            getConfigPath({
                cwd: "C:/relative/src",
                key: "ruleKey",
                settings: { ruleKey: "config.json" },
            }),
        ).toEqual("C:\\relative\\src\\config.json");
    });

    it("should return config path when settings contain config path - absolute", () => {
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
