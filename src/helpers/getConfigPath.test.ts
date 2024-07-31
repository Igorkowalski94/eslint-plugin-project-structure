import { getConfigPath } from "./getConfigPath";
import { getMissingConfigError } from "../errors/getMissingConfigError";

describe("getConfigPath", () => {
    it("should throw getMissingConfigError when config path is missing", () => {
        expect(() =>
            getConfigPath({ cwd: "src", key: "ruleKey", settings: {} }),
        ).toThrow(getMissingConfigError("ruleKey"));
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
