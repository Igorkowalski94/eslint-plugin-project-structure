import { getCwdWithRoot } from "./getCwdWithRoot";

jest.mock("path", () => ({
    sep: "/",
}));

describe("getCwdWithRoot", () => {
    test.each([
        {
            cwd: "C:/Users/user/Desktop/repo",
            root: "funkyRoot",
            expected: "C:/Users/user/Desktop/repo/funkyRoot/",
        },
        {
            cwd: "C:/Users/user/Desktop/repo",
            root: undefined,
            expected: "C:/Users/user/Desktop/repo/src/",
        },
        {
            cwd: "C:/Users/user/Desktop/repo",
            root: null,
            expected: "C:/Users/user/Desktop/repo/",
        },
    ])("Should return correct value for %s", ({ cwd, root, expected }) => {
        expect(getCwdWithRoot(cwd, root)).toEqual(expected);
    });
});
