import path from "path";

import { getProjectRoot } from "helpers/getProjectRoot";

describe("getProjectRoot", () => {
  it("should return rootPath when !projectRootConfig", () => {
    jest
      .spyOn(path, "dirname")
      .mockReturnValue(path.resolve("c:/users/project/node_modules/test.ts"));

    expect(getProjectRoot({ cwd: "cwd" })).toEqual(
      path.resolve("c:/users/project"),
    );
  });

  it("should return cwd when path does not contain node_modules", () => {
    jest
      .spyOn(path, "dirname")
      .mockReturnValue(path.resolve("c:/users/project/test.ts"));

    expect(getProjectRoot({ cwd: "cwd" })).toEqual("cwd");
  });

  it("should return rootPath with projectRootConfig", () => {
    jest
      .spyOn(path, "dirname")
      .mockReturnValue(path.resolve("c:/users/project/node_modules/test.ts"));
    expect(
      getProjectRoot({
        cwd: "cwd",
        projectRootConfig: "packages/package-name",
      }),
    ).toEqual(path.resolve("c:/users/project/packages/package-name"));
  });
});
