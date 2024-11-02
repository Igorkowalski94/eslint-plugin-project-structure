import path, { sep } from "path";

import { getProjectRootWithBaseUrl } from "rules/independentModules/helpers/validateImport/helpers/validateAll/helpers/getProjectRootWithBaseUrl";

describe("getProjectRootWithBaseUrl", () => {
  test.each([
    {
      projectRoot: path.join("C:", "Users", "user", "Desktop", "repo"),
      baseUrl: "test",
      expected:
        path.join("C:", "Users", "user", "Desktop", "repo", "test") + sep,
    },
    {
      projectRoot: path.join("C:", "Users", "user", "Desktop", "repo"),
      baseUrl: undefined,
      expected: path.join("C:", "Users", "user", "Desktop", "repo") + sep,
    },
  ])(
    "Should return correct value for %s",
    ({ projectRoot, baseUrl, expected }) => {
      expect(getProjectRootWithBaseUrl({ projectRoot, baseUrl })).toEqual(
        expected,
      );
    },
  );
});
