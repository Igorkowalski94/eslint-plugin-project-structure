import { removeQueryParamsFromPath } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/removeQueryParamsFromPath";

describe("removeQueryParamsFromPath", () => {
  test.each<{
    importPath: string;
    expected: string;
  }>([
    {
      importPath: "a.png?sizes[]=64&useResponsiveLoader=true",
      expected: "a.png",
    },
    {
      importPath: "src/icons/icon.svg?",
      expected: "src/icons/icon.svg",
    },
    {
      importPath: "../../shared/ui/icons/icon.svg?react",
      expected: "../../shared/ui/icons/icon.svg",
    },
    {
      importPath: "src/lib/class-names",
      expected: "src/lib/class-names",
    },
  ])("Should return correct value for %s", ({ importPath, expected }) => {
    expect(removeQueryParamsFromPath({ importPath })).toEqual(expected);
  });
});
