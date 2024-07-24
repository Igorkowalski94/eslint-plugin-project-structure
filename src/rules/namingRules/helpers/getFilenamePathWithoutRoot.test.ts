import { getFilenamePathWithoutRoot } from "./getFilenamePathWithoutRoot";
import { getInvalidRootError } from "../errors/getInvalidRootError";

jest.mock("path", () => ({
    sep: "/",
}));

describe("getFilenamePathWithoutRoot", () => {
    test.each([
        {
            filename: "../libs/index.ts",
            settings: { "project-structure/export-rules-root": "libs" },
            expected: "index.ts",
        },
        {
            filename: "../src/index.ts",
            settings: {},
            expected: "index.ts",
        },
    ])(
        "Should return correct value for = %o",
        ({ filename, settings, expected }) => {
            expect(getFilenamePathWithoutRoot({ filename, settings })).toEqual(
                expected,
            );
        },
    );

    test("Should throw getInvalidRootError when root is invalid for default root", () => {
        expect(() =>
            getFilenamePathWithoutRoot({
                filename: "../libs/index.ts",
                settings: {},
            }),
        ).toThrow(getInvalidRootError("src"));
    });

    test("Should throw getInvalidRootError when root is invalid for custom root", () => {
        expect(() =>
            getFilenamePathWithoutRoot({
                filename: "../someRoot/index.ts",
                settings: { "project-structure/export-rules-root": "libs" },
            }),
        ).toThrow(getInvalidRootError("libs"));
    });
});
