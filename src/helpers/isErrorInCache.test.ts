import { isErrorInCache } from "helpers/isErrorInCache";
import { readProjectStructureCacheFile } from "helpers/readProjectStructureCacheFile";

jest.mock("helpers/readProjectStructureCacheFile", () => ({
  readProjectStructureCacheFile: jest.fn(),
}));

jest.mock("helpers/handleCache", () => ({
  handleCache: jest.fn(),
}));

describe("isErrorInCache", () => {
  it("should return false when !cacheData", () => {
    (readProjectStructureCacheFile as jest.Mock).mockReturnValue(undefined);

    expect(
      isErrorInCache({
        projectRoot: "projectRoot",
        errorCache: { errorMessage: "error", filename: "" },
      }),
    ).toEqual(false);
  });

  it("should return true when errorCache.filename !== cacheData.filename", () => {
    (readProjectStructureCacheFile as jest.Mock).mockReturnValue([
      { errorMessage: "error", filename: "filename2" },
    ]);

    expect(
      isErrorInCache({
        projectRoot: "projectRoot",
        errorCache: { errorMessage: "error", filename: "filename1" },
      }),
    ).toEqual(true);
  });

  it("should return false when errorCache.filename === cacheData.filename", () => {
    (readProjectStructureCacheFile as jest.Mock).mockReturnValue([
      { errorMessage: "error", filename: "filename1" },
    ]);

    expect(
      isErrorInCache({
        projectRoot: "projectRoot",
        errorCache: { errorMessage: "error", filename: "filename1" },
      }),
    ).toEqual(false);
  });
});
