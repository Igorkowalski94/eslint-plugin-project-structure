import { isFile } from "rules/folderStructure/helpers/isFile";

describe("isFile", () => {
  it("should return false when pathname includes /", () => {
    expect(isFile("src/componentName")).toEqual(false);
  });

  it("should return true when pathname not includes /", () => {
    expect(isFile("componentName")).toEqual(true);
  });
});
