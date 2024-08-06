import { readFileSync } from "fs";

import { load } from "js-yaml";

import { getConfigPath } from "./getConfigPath";
import { readConfigFile } from "./readConfigFile";
import { getInvalidConfigFileError } from "../errors/getInvalidConfigFileError";

jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

jest.mock("js-yaml", () => ({
    load: jest.fn(),
}));

jest.mock("./getConfigPath", () => ({
    getConfigPath: jest.fn(),
}));

describe("readConfigFile", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should return config from options", () => {
        expect(
            readConfigFile({
                cwd: "",
                key: "",
                options: [{ name: "options" }],
                settings: {},
            }),
        ).toEqual({
            name: "options",
        });
    });

    it("should return config from json", () => {
        (getConfigPath as jest.Mock).mockReturnValue("config.json");
        (readFileSync as jest.Mock).mockReturnValue('{"name":"json"}');

        expect(
            readConfigFile({
                cwd: "",
                key: "",
                options: [],
                settings: {},
            }),
        ).toEqual({
            name: "json",
        });
    });

    it("should return config from yaml", () => {
        (getConfigPath as jest.Mock).mockReturnValue("config.yaml");
        (load as jest.Mock).mockReturnValue({ name: "yaml" });

        expect(
            readConfigFile({
                cwd: "",
                key: "",
                options: [],
                settings: {},
            }),
        ).toEqual({
            name: "yaml",
        });
    });

    it("should throw getInvalidConfigFileError when yaml/json file is incorrect", () => {
        (getConfigPath as jest.Mock).mockReturnValue("config.error");

        expect(() =>
            readConfigFile({
                cwd: "",
                key: "",
                options: [],
                settings: {},
            }),
        ).toThrow(getInvalidConfigFileError("config.error"));
    });
});
