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
    it("should return config from yaml", () => {
        (readFileSync as jest.Mock).mockReturnValue('{"name":"yaml"}');
        expect(readConfigFile("projectStructure.yaml")).toEqual({
            name: "yaml",
        });
    });

    it("should return undefined when yaml config path is incorrect", () => {
        (load as jest.Mock).mockImplementationOnce(() => {
            throw "";
        });

        expect(readConfigFile("projectStructure.yaml")).toEqual(undefined);
    });

    it("should return config from json", () => {
        (load as jest.Mock).mockReturnValue(null);
        (readFileSync as jest.Mock).mockReturnValue('{"name":"json"}');

        expect(readConfigFile("projectStructure.json")).toEqual({
            name: "json",
        });
    });

    it("should return undefined when json config path is incorrect", () => {
        (load as jest.Mock).mockReturnValue(null);
        (readFileSync as jest.Mock).mockImplementationOnce(() => {
            throw "";
        });

        expect(readConfigFile("projectStructure.json")).toEqual(undefined);
    });
});
