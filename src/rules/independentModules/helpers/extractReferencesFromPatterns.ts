import { hasNestedArray } from "./hasNestedArray";
import { getInvalidReusableImportPatternsKeyError } from "../errors/getInvalidReusableImportPatternsKeyError";
import { getNestedArrayInPatternError } from "../errors/getNestedArrayInPatternError";
import { getRecursionLimitError } from "../errors/getRecursionLimitError";
import { getReferenceAsPartOfPatternError } from "../errors/getReferenceAsPartOfPatternError";
import { IndependentModulesConfig, Pattern } from "../independentModules.types";

interface ExtractReferencesFromPatternsProps {
    patterns: Pattern[];
    reusableImportPatterns: IndependentModulesConfig["reusableImportPatterns"];
    recursionLimit?: number;
    checkNestedArrays?: boolean;
}

export const extractReferencesFromPatterns = ({
    patterns,
    reusableImportPatterns,
    recursionLimit = 1000,
    checkNestedArrays = false,
}: ExtractReferencesFromPatternsProps): Pattern[] => {
    if (!reusableImportPatterns) return patterns;

    if (recursionLimit === 0) throw getRecursionLimitError(patterns);

    return patterns.reduce<Pattern[]>((acc, pattern) => {
        if (Array.isArray(pattern))
            return [
                ...acc,
                extractReferencesFromPatterns({
                    patterns: pattern,
                    reusableImportPatterns,
                    recursionLimit: recursionLimit - 1,
                    checkNestedArrays,
                }) as Pattern,
            ];

        const patternMatch = pattern.match(/\{([^{}]*?)\}/g);
        const forbiddenPattern = /^(family|dirname)(_\d+)?$/;
        const referenceKeys = patternMatch
            ?.map((match) => match.slice(1, -1))
            .filter((pattern) => !forbiddenPattern.test(pattern));
        const referenceKey = referenceKeys?.[0];
        const referenceAsPartOfPattern = patternMatch?.[0]
            ? pattern.replace(patternMatch?.[0], "")
            : undefined;

        if (!referenceKey) return [...acc, pattern];

        if (!reusableImportPatterns[referenceKey])
            throw getInvalidReusableImportPatternsKeyError(referenceKey);

        const reference = extractReferencesFromPatterns({
            patterns: reusableImportPatterns[referenceKey],
            reusableImportPatterns,
            recursionLimit: recursionLimit - 1,
            checkNestedArrays,
        });

        if (
            referenceAsPartOfPattern &&
            (reference.length !== 1 || typeof reference[0] !== "string")
        )
            throw getReferenceAsPartOfPatternError(referenceKey, pattern);

        if (
            referenceAsPartOfPattern &&
            reference.length === 1 &&
            typeof reference[0] === "string"
        ) {
            if (referenceKeys.length > 1)
                return [
                    ...acc,
                    ...extractReferencesFromPatterns({
                        patterns: [
                            pattern.replace(`{${referenceKey}}`, reference[0]),
                        ],
                        reusableImportPatterns,
                        recursionLimit: recursionLimit - 1,
                        checkNestedArrays,
                    }),
                ];

            return [...acc, pattern.replace(`{${referenceKey}}`, reference[0])];
        }

        if (
            checkNestedArrays &&
            Array.isArray(reference) &&
            hasNestedArray(reference)
        ) {
            throw getNestedArrayInPatternError(patterns, referenceKey);
        }

        return [
            ...acc,
            ...extractReferencesFromPatterns({
                patterns: reference,
                reusableImportPatterns,
                recursionLimit: recursionLimit - 1,
                checkNestedArrays,
            }),
        ];
    }, []);
};
