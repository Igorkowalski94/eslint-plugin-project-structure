import path from "path";

import { getImportPaths } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/getImportPaths";
import { Paths } from "rules/independentModules/independentModules.types";

jest.mock("fs", () => ({
  existsSync: jest.fn((path) => {
    if (
      path ===
      "C:/Users/project/src/rules2/independentModules/independentModules.html"
    ) {
      return false;
    }

    return true;
  }),
}));

describe("getImportPaths", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.each<{
    importPath: string;
    paths?: Paths;
    resolve: string;
    expected: { importPath: string; pathAlias: boolean }[];
  }>([
    {
      importPath: "@hg/bob-store",
      resolve: "C:/Users/project/libs/shared/util/hg-bob-store/src/index.ts",
      paths: {
        "@hg/bob": ["libs/shared/ui/hg-bob/src/index.ts"],
        "@hg/bob-store": ["libs/shared/util/hg-bob-store/src/index.ts"],
      },
      expected: [
        {
          importPath: "libs/shared/util/hg-bob-store/src/index.ts.html",
          pathAlias: true,
        },
      ],
    },
    {
      importPath: "src/rules/independentModules/independentModules",
      resolve: "",
      paths: undefined,
      expected: [
        {
          importPath: "src/rules/independentModules/independentModules",
          pathAlias: false,
        },
      ],
    },
    {
      importPath: "src/rules/independentModules/independentModules",
      resolve: "",
      paths: {},
      expected: [
        {
          importPath: "src/rules/independentModules/independentModules",
          pathAlias: false,
        },
      ],
    },
    {
      importPath: "@independentModules/independentModules",
      resolve: "C:/Users/project/src/rules2/independentModules",
      paths: {
        "@independentModules/*": ["src/rules2/independentModules/*"],
      },
      expected: [
        {
          importPath:
            "src/rules2/independentModules/independentModules/index.html",
          pathAlias: true,
        },
      ],
    },
    {
      importPath: "independentModules/independentModules",
      resolve: "C:/Users/project/src/rules/independentModules",
      paths: {
        "independentModules/*": ["src/rules/independentModules/*"],
      },
      expected: [
        {
          importPath: "src/rules/independentModules/independentModules.html",
          pathAlias: true,
        },
      ],
    },

    {
      importPath: "@clerk/nextjs",
      resolve: "",
      paths: {
        "@/*": ["./src/*"],
      },
      expected: [{ importPath: "@clerk/nextjs", pathAlias: false }],
    },

    {
      importPath: "@datasrc/file",
      resolve: "C:/datasrc",
      paths: {
        "@datasrc/*": ["../../datasrc/*"],
      },
      expected: [{ importPath: "C:/datasrc/file.html", pathAlias: true }],
    },

    {
      importPath: "@/components/hello",
      resolve: "C:/Users/project/src",
      paths: {
        "@/*": ["./src/*"],
      },
      expected: [{ importPath: "src/components/hello.html", pathAlias: true }],
    },
  ])(
    "Should return correct value for %o",
    ({ importPath, paths, resolve, expected }) => {
      jest.spyOn(path, "resolve").mockImplementation(() => resolve);

      expect(
        getImportPaths({
          importPath,
          paths,
          projectRootWithBaseUrl: "C:/Users/project",
        }),
      ).toEqual(expected);

      jest.clearAllMocks();
    },
  );
});
