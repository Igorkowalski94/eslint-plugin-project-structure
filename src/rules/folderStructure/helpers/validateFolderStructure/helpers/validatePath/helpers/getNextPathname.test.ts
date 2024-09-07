import { getNextPathname } from "rules/folderStructure/helpers/validateFolderStructure/helpers/validatePath/helpers/getNextPathname";

describe("getNextPathname", () => {
  it("should return correct next path", () => {
    expect(
      getNextPathname({
        pathname: "src/features/ComponentName.tsx",
        nodeName: "src/features",
      }),
    ).toEqual("ComponentName.tsx");
  });
});
