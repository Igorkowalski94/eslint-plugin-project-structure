import { getExtensionInvalidError } from "./helpers/getExtensionInvalidError";
import { validateExtension } from "./validateExtension";
import { Extension } from "../../types";

describe("validateExtension", () => {
    it("should not throw error when extension is empty", () => {
        expect(() => validateExtension("componentName.js", {})).not.toThrow();
    });

    it.each<[string, Extension]>([
        ["componentName.css", [".ts", ".js", ".tsx", ".jsx"]],
        ["componentName.ts", ".tsx"],
    ])(
        "should throw error when file name is %s and extension is is: %s",
        (fileName, extension) => {
            expect(() =>
                validateExtension(fileName, {
                    extension,
                }),
            ).toThrow(getExtensionInvalidError(fileName, extension).message);
        },
    );

    it.each<[string, Extension]>([
        ["componentName.css", [".css", ".js", ".tsx", ".jsx", ".ts"]],
        ["componentName.ts", ".ts"],
    ])(
        "should not throw error when file name is %s and extension is is: %s",
        (fileName, extension) => {
            expect(() =>
                validateExtension(fileName, {
                    extension,
                }),
            ).not.toThrow();
        },
    );
});
