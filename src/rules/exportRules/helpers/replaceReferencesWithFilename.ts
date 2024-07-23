import { transformStringToCase } from "./transformStringToCase";
import {
    CAMEL_CASE,
    PASCAL_CASE,
    SNAKE_CASE_LOWER,
    SNAKE_CASE_UPPER,
} from "../../../consts";
import { DEFAULT_ALLOW_EXPORT_NAMES, REFERENCES } from "../exportRules.consts";
import { ExportRules } from "../exportRules.types";

interface ReplaceReferencesWithFilename {
    filenameWithoutParts: string;
    allowExportNames: ExportRules["allowExportNames"];
}

export const replaceReferenceWithFilename = ({
    allowExportNames,
    filenameWithoutParts,
}: ReplaceReferencesWithFilename): ExportRules["allowExportNames"] =>
    (allowExportNames ?? DEFAULT_ALLOW_EXPORT_NAMES)?.reduce<string[]>(
        (acc, pattern) => [
            ...acc,
            pattern
                .replaceAll(REFERENCES.PascalCase, PASCAL_CASE)
                .replaceAll(REFERENCES.camelCase, CAMEL_CASE)
                .replaceAll(REFERENCES.snake_case, SNAKE_CASE_LOWER)
                .replaceAll(REFERENCES.SNAKE_CASE, SNAKE_CASE_UPPER)
                .replaceAll(
                    REFERENCES.filename_PascalCase,
                    transformStringToCase(filenameWithoutParts, "PascalCase"),
                )
                .replaceAll(
                    REFERENCES.filename_snake_case,
                    transformStringToCase(filenameWithoutParts, "snake_case"),
                )
                .replaceAll(
                    REFERENCES.filename_SNAKE_CASE,
                    transformStringToCase(filenameWithoutParts, "SNAKE_CASE"),
                )
                .replaceAll(
                    REFERENCES.filename_camelCase,
                    transformStringToCase(filenameWithoutParts, "camelCase"),
                ),
        ],
        [],
    );
