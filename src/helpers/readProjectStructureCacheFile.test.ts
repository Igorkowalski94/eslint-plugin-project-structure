import { readFileSync } from "fs";

import { readProjectStructureCacheFile } from "helpers/readProjectStructureCacheFile";

jest.mock("fs", () => ({
  readFileSync: jest.fn(),
}));

describe("readProjectStructureCacheFile", () => {
  it("should return config", () => {
    (readFileSync as jest.Mock).mockReturnValue('{"name":"json"}');

    expect(readProjectStructureCacheFile("cwd")).toEqual({
      name: "json",
    });
  });

  it("should return undefined", () => {
    (readFileSync as jest.Mock).mockReturnValue(undefined);

    expect(readProjectStructureCacheFile("cwd")).toEqual(undefined);
  });
});