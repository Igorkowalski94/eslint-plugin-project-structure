import { getImportPaths } from "rules/independentModules/helpers/getImportPaths";
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
    ])(
        "Should return correct value for %s",
        ({ importPath, paths, expected }) => {
            expect(getImportPaths({ importPath, paths })).toEqual(expected);
        },
    );
});
