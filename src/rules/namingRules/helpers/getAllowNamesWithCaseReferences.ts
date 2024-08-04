import {
    CAMEL_CASE,
    PASCAL_CASE,
    SNAKE_CASE_LOWER,
    SNAKE_CASE_UPPER,
} from "../../../consts";
import { REFERENCES } from "../namingRules.consts";

export const getAllowNamesWithCaseReferences = (
    allowNamesWithoutReferences: string[],
): string[] =>
    allowNamesWithoutReferences.map((pattern) =>
        pattern
            .replaceAll(PASCAL_CASE, REFERENCES.PascalCase)
            .replaceAll(CAMEL_CASE, REFERENCES.camelCase)
            .replaceAll(SNAKE_CASE_LOWER, REFERENCES.snake_case)
            .replaceAll(SNAKE_CASE_UPPER, REFERENCES.SNAKE_CASE),
    );
