import { readFileSync } from "fs";

import { load } from "js-yaml";

import { readConfigFile } from "./readConfigFile";

jest.mock("fs", () => ({
    readFileSync: jest.fn(),
}));

jest.mock("js-yaml", () => ({
    load: jest.fn(),
}));

describe("readConfigFile", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("should return config from json", () => {
        (readFileSync as jest.Mock).mockReturnValue('{"name":"json"}');

        expect(readConfigFile("folderStructure.json")).toEqual({
            name: "json",
        });
    });

    it("should return config from yaml", () => {
        (load as jest.Mock).mockReturnValue({ name: "yaml" });
        expect(readConfigFile("folderStructure.yaml")).toEqual({
            name: "yaml",
        });
    });

    it("should return undefined when yaml/json config path is incorrect", () => {
        expect(readConfigFile("folderStructure.extension")).toEqual(undefined);
    });
});
