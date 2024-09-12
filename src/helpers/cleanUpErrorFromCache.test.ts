import { unlinkSync } from "fs";

import { cleanUpErrorFromCache } from "helpers/cleanUpErrorFromCache";
import { createProjectStructureCacheFile } from "helpers/createProjectStructureCacheFile";
import { readProjectStructureCacheFile } from "helpers/readProjectStructureCacheFile";

jest.mock("helpers/readProjectStructureCacheFile", () => ({
  readProjectStructureCacheFile: jest.fn(),
}));

jest.mock("fs", () => ({
  unlinkSync: jest.fn(),
  existsSync: jest.fn(() => true),
}));

jest.mock("helpers/createProjectStructureCacheFile", () => ({
  createProjectStructureCacheFile: jest.fn(),
}));

describe("cleanUpErrorFromCache", () => {
  it("should return undefined when !cacheData", () => {
    (readProjectStructureCacheFile as jest.Mock).mockReturnValue(undefined);

    expect(
      cleanUpErrorFromCache({
        cwd: "cwd",
        filename: "",
      }),
    ).toEqual(undefined);
  });

  it("should call unlinkSync when projectStructureCache is empty", () => {
    (readProjectStructureCacheFile as jest.Mock).mockReturnValue([]);

    const unlinkSyncMock = jest.fn();

    (unlinkSync as jest.Mock).mockImplementation(unlinkSyncMock);

    cleanUpErrorFromCache({
      cwd: "cwd",
      filename: "filename1",
    });

    expect(unlinkSync).toHaveBeenCalled();
  });

  it("should call createProjectStructureCacheFile", () => {
    (readProjectStructureCacheFile as jest.Mock).mockReturnValue([
      { errorMessage: "error1", filename: "filename1" },
      { errorMessage: "error2", filename: "filename2" },
    ]);

    const createProjectStructureCacheFileMock = jest.fn();

    (createProjectStructureCacheFile as jest.Mock).mockImplementation(
      createProjectStructureCacheFileMock,
    );

    cleanUpErrorFromCache({
      cwd: "cwd",
      filename: "filename1",
    });

    expect(createProjectStructureCacheFileMock).toHaveBeenCalledWith({
      cwd: "cwd",
      projectStructureCache: [
        { errorMessage: "error2", filename: "filename2" },
      ],
    });
  });
});
