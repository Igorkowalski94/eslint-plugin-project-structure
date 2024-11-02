import { createProjectStructureCacheFile } from "helpers/createProjectStructureCacheFile";
import { handleCache } from "helpers/handleCache";
import { readProjectStructureCacheFile } from "helpers/readProjectStructureCacheFile";

jest.mock("helpers/readProjectStructureCacheFile", () => ({
  readProjectStructureCacheFile: jest.fn(),
}));

jest.mock("helpers/createProjectStructureCacheFile", () => ({
  createProjectStructureCacheFile: jest.fn(),
}));

jest.mock("fs", () => ({
  existsSync: jest.fn(() => true),
}));

describe("handleCache", () => {
  it("should create new cache file", () => {
    (readProjectStructureCacheFile as jest.Mock).mockReturnValue(undefined);

    const createProjectStructureCacheFileMock = jest.fn();

    (createProjectStructureCacheFile as jest.Mock).mockImplementation(
      createProjectStructureCacheFileMock,
    );

    handleCache({
      projectRoot: "projectRoot",
      errorCache: { errorMessage: "error", filename: "" },
    });

    expect(createProjectStructureCacheFileMock).toHaveBeenCalledWith({
      projectRoot: "projectRoot",
      projectStructureCache: [{ errorMessage: "error", filename: "" }],
    });
  });

  it("should not call createProjectStructureCacheFile when error is in cache", () => {
    (readProjectStructureCacheFile as jest.Mock).mockReturnValue([
      {
        errorMessage: "error1",
        filename: "1",
      },
      {
        errorMessage: "error2",
        filename: "2",
      },
    ]);

    const createProjectStructureCacheFileMock = jest.fn();

    (createProjectStructureCacheFile as jest.Mock).mockImplementation(
      createProjectStructureCacheFileMock,
    );

    handleCache({
      projectRoot: "projectRoot",
      errorCache: { errorMessage: "error1", filename: "" },
    });

    expect(createProjectStructureCacheFileMock).not.toHaveBeenCalledWith({
      projectRoot: "projectRoot",
      projectStructureCache: [
        { errorMessage: "error1", filename: "1" },
        { errorMessage: "error2", filename: "2" },
      ],
    });
  });

  it("should call createProjectStructureCacheFile when error is not in cache", () => {
    (readProjectStructureCacheFile as jest.Mock).mockReturnValue([
      {
        errorMessage: "error1",
        filename: "1",
      },
      {
        errorMessage: "error2",
        filename: "2",
      },
    ]);

    const createProjectStructureCacheFileMock = jest.fn();

    (createProjectStructureCacheFile as jest.Mock).mockImplementation(
      createProjectStructureCacheFileMock,
    );

    handleCache({
      projectRoot: "projectRoot",
      errorCache: { errorMessage: "error3", filename: "3" },
    });

    expect(createProjectStructureCacheFileMock).not.toHaveBeenCalledWith({
      projectRoot: "projectRoot",
      projectStructureCache: [
        { errorMessage: "error1", filename: "1" },
        { errorMessage: "error2", filename: "2" },
        { errorMessage: "error3", filename: "3" },
      ],
    });
  });
});
