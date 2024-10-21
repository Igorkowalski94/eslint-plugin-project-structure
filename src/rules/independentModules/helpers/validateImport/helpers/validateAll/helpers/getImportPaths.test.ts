import { getImportPaths } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/getImportPaths";
import { Paths } from "rules/independentModules/independentModules.types";

describe("getImportPaths", () => {
  test.each<{
    importPath: string;
    paths?: Paths;
    expected: string[];
  }>([
    {
      importPath: "src/rules/independentModules/independentModules",
      paths: undefined,
      expected: ["src/rules/independentModules/independentModules"],
    },
    {
      importPath: "src/rules/independentModules/independentModules",
      paths: {},
      expected: ["src/rules/independentModules/independentModules"],
    },
    {
      importPath: "@independentModules/independentModules",
      paths: {
        "@independentModules/*": [
          "src/rules/independentModules/*",
          "src/rules2/independentModules/*",
        ],
      },
      expected: [
        "src/rules/independentModules/independentModules",
        "src/rules2/independentModules/independentModules",
      ],
    },
    {
      importPath: "independentModules/independentModules",
      paths: {
        "independentModules/*": ["src/rules/independentModules/*"],
      },
      expected: ["src/rules/independentModules/independentModules"],
    },

    {
      importPath: "@clerk/nextjs",
      paths: {
        "@/*": ["./src/*"],
      },
      expected: ["@clerk/nextjs"],
    },

    {
      importPath: "@/components/hello",
      paths: {
        "@/*": ["./src/*", "../../test/*"],
      },
      expected: ["src/components/hello", "test/components/hello"],
    },
  ])(
    "Should return correct value for %o",
    ({ importPath, paths, expected }) => {
      expect(getImportPaths({ importPath, paths })).toEqual(expected);
    },
  );
});
