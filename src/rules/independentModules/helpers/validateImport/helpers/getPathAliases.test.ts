import { parse } from "comment-json";

import { getPathAliases } from "rules/independentModules/helpers/validateImport/helpers/getPathAliases";
import {
  IndependentModulesConfig,
  PathAliases,
  TsConfigJson,
} from "rules/independentModules/independentModules.types";

jest.mock("comment-json", () => ({
  parse: jest.fn(),
}));

jest.mock("fs", () => ({
  readFileSync: jest.fn(),
}));

describe("getPathAliases", () => {
  test.each<{
    config: Partial<IndependentModulesConfig>;
    expected: PathAliases;
    tsconfig?: TsConfigJson;
  }>([
    {
      config: {
        pathAliases: {
          baseUrl: "pathAliases",
          paths: {},
        },
      },
      expected: {
        baseUrl: "pathAliases",
        paths: {},
      },
    },
    {
      config: {
        tsconfigPath: "./tsconfig.json",
      },
      tsconfig: {
        compilerOptions: {
          baseUrl: "tsconfigPath",
        },
      },
      expected: {
        baseUrl: "tsconfigPath",
        paths: {},
      },
    },
    {
      config: {},
      tsconfig: {
        compilerOptions: {
          baseUrl: "defaultTsconfig",
        },
      },
      expected: {
        baseUrl: "defaultTsconfig",
        paths: {},
      },
    },
    {
      config: {},
      tsconfig: {
        compilerOptions: {
          paths: {
            "@components/*": ["components/*"],
          },
        },
      },
      expected: {
        baseUrl: ".",
        paths: {
          "@components/*": ["components/*"],
        },
      },
    },
  ])("Should return correct value for %o", ({ config, tsconfig, expected }) => {
    (parse as jest.Mock).mockReturnValue(tsconfig);

    expect(
      getPathAliases({
        config: config as IndependentModulesConfig,
        cwd: "cwd",
      }),
    ).toEqual(expected);
  });

  test("Should return undefined when parse throw", () => {
    (parse as jest.Mock).mockImplementation(() => {
      throw new Error("");
    });

    expect(
      getPathAliases({
        config: { modules: [] },
        cwd: "cwd",
      }),
    ).toEqual(undefined);
  });
});
