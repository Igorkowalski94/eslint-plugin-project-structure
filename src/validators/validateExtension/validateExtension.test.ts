import { getExtensionError } from "./helpers/getExtensionError";
import { getInvalidExtensionError } from "./helpers/getInvalidExtensionError";
import { validateExtension } from "./validateExtension";
import { Extension } from "../../types";

describe("validateExtension", () => {
    it.each([
        0,
        1,
        {},
        undefined,
        null,
        [""],
        [0],
        [1],
        [{}],
        [[]],
        [undefined],
        [null],
    ])(
        "should throw error when extension is invalid extension = %s",
        (extension) => {
            expect(() =>
                validateExtension("componentName.js", extension as Extension),
            ).toThrow(getInvalidExtensionError(extension));
        },
    );

    it.each<[string, Extension]>([
        ["componentName.css", [".ts", ".js", ".tsx", ".jsx"]],
        ["componentName.ts", ".tsx"],
    ])(
        "should throw error when file name is %s and extension is is: %s",
        (fileName, extension) => {
            expect(() => validateExtension(fileName, extension)).toThrow(
                getExtensionError(fileName, extension).message,
            );
        },
    );

    it.each<[string, Extension]>([
        ["componentName.xxx", "*"],
        ["componentName.xxx", ["*"]],
        ["componentName.css", [".css", ".js", ".tsx", ".jsx", ".ts"]],
        ["componentName.ts", ".ts"],
    ])(
        "should not throw error when file name is %s and extension is is: %s",
        (fileName, extension) => {
            expect(validateExtension(fileName, extension)).toEqual(undefined);
        },
    );
});
