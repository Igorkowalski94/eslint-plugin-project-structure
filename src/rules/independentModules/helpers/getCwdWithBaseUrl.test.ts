import path, { sep } from "path";

import { getCwdWithBaseUrl } from "rules/independentModules/helpers/getCwdWithBaseUrl";

describe("getCwdWithBaseUrl", () => {
    test.each([
        {
            cwd: path.join("C:", "Users", "user", "Desktop", "repo"),
            baseUrl: "test",
            expected:
                path.join("C:", "Users", "user", "Desktop", "repo", "test") +
                sep,
        },
        {
            cwd: path.join("C:", "Users", "user", "Desktop", "repo"),
            baseUrl: undefined,
            expected: path.join("C:", "Users", "user", "Desktop", "repo") + sep,
        },
    ])("Should return correct value for %s", ({ cwd, baseUrl, expected }) => {
        expect(getCwdWithBaseUrl({ cwd, baseUrl })).toEqual(expected);
    });
});
