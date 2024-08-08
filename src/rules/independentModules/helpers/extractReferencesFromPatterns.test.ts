import { getInvalidReusableImportPatternsKeyError } from "rules/independentModules/errors/getInvalidReusableImportPatternsKeyError";
import { getRecursionLimitError } from "rules/independentModules/errors/getRecursionLimitError";
import { getReferenceAsPartOfPatternError } from "rules/independentModules/errors/getReferenceAsPartOfPatternError";
import { extractReferencesFromPatterns } from "rules/independentModules/helpers/extractReferencesFromPatterns";
import { IndependentModulesConfig } from "rules/independentModules/independentModules.types";

describe("extractReferencesFromPatterns", () => {
    const reusableImportPatterns: IndependentModulesConfig["reusableImportPatterns"] =
        {
            pattern0: ["pattern0"],
            pattern1: ["pattern1"],
            pattern2: ["pattern2_a", "pattern2_b"],
            pattern3: [
                "pattern3_a",
                "pattern3_b",
                ["pattern3_c", "pattern3_d"],
            ],

            pattern4: ["pattern4", "{pattern1}"],
            pattern5: ["pattern5", "root/{pattern1}/**"],
            pattern6: ["pattern6_a", ["pattern6_b", "{pattern1}"]],
            pattern7: ["pattern7_a", ["pattern7_b", "root/{pattern1}/**"]],

            pattern8: ["pattern8", "{pattern2}"],
            pattern9: [
                "pattern9_a",
                "{pattern5}",
                ["pattern9_b", "{pattern2}", "{pattern5}"],
            ],

            pattern10: ["pattern10", "{pattern2}"],
            pattern11: ["pattern11_a", ["pattern11_b", "{pattern2}"]],
        };

    test("Should return correct patterns", () => {
        expect(
            extractReferencesFromPatterns({
                patterns: [
                    "{pattern11}",
                    "**/{pattern0}/{pattern1}/**",
                    "**/{family}/**/{pattern0}/{pattern1}/**",
                    "**/{dirname}/**/{pattern0}/{pattern1}/**",
                    "**/{family_3}/**/{pattern0}/{pattern1}/**",
                    "**/{dirname_3}/**/{pattern0}/{pattern1}/**",
                    ["{pattern2}"],
                ],
                reusableImportPatterns,
            }),
        ).toEqual([
            "pattern11_a",
            ["pattern11_b", "pattern2_a", "pattern2_b"],
            "**/pattern0/pattern1/**",
            "**/{family}/**/pattern0/pattern1/**",
            "**/{dirname}/**/pattern0/pattern1/**",
            "**/{family_3}/**/pattern0/pattern1/**",
            "**/{dirname_3}/**/pattern0/pattern1/**",
            ["pattern2_a", "pattern2_b"],
        ]);
    });

    test("Should throw recursion error", () => {
        expect(() =>
            extractReferencesFromPatterns({
                patterns: ["{pattern1}"],
                reusableImportPatterns: {
                    pattern1: ["{pattern2}"],
                    pattern2: ["{pattern1}"],
                },
            }),
        ).toThrow(getRecursionLimitError(["{pattern1}"]));
    });

    test("Should throw getReferenceAsPartOfPatternError", () => {
        expect(() =>
            extractReferencesFromPatterns({
                patterns: ["{pattern1}/**"],
                reusableImportPatterns: {
                    pattern1: ["pattern1_a", "pattern1_b"],
                },
            }),
        ).toThrow(
            getReferenceAsPartOfPatternError("pattern1", "{pattern1}/**"),
        );
    });

    test("Should return patterns when reusableImportPatterns === undefined", () => {
        expect(
            extractReferencesFromPatterns({
                patterns: ["test/**"],
                reusableImportPatterns: undefined,
            }),
        ).toEqual(["test/**"]);
    });

    test("Should return error when reusableImportPatterns keys do not exist", () => {
        expect(() =>
            extractReferencesFromPatterns({
                patterns: ["{pattern3}"],
                reusableImportPatterns: {},
            }),
        ).toThrow(getInvalidReusableImportPatternsKeyError("pattern3"));
    });
});
