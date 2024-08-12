import { getDirnamePath } from "rules/independentModules/helpers/getDirnamePath";

describe("getDirnamePath", () => {
  test.each([
    {
      filename: "C:/Users/user/Desktop/repo/src/",
      pattern: "{dirname}/*.ts",
      expected: "C:/Users/user/Desktop/repo",
    },
    {
      filename: "C:/Users/user/Desktop/repo/src/",
      pattern: "{dirname_1}/*.ts",
      expected: "C:/Users/user/Desktop/repo",
    },
    {
      filename: "C:/Users/user/Desktop/repo/src/",
      pattern: "{dirname_0}/*.ts",
      expected: "C:/Users/user/Desktop/repo/src/",
    },
    {
      filename: "C:/Users/user/Desktop/repo/src/",
      pattern: "{dirname_2}/*.ts",
      expected: "C:/Users/user/Desktop",
    },
  ])(
    "Should return correct value for %s",
    ({ filename, pattern, expected }) => {
      expect(getDirnamePath(filename, pattern)).toEqual(expected);
    },
  );
});
