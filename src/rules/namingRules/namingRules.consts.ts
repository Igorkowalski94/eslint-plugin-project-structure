import { JSONSchema4 } from "@typescript-eslint/utils/dist/json-schema";

export const REFERENCES = {
    filename_PascalCase: "{filename_PascalCase}",
    filename_camelCase: "{filename_camelCase}",
    filename_snake_case: "{filename_snake_case}",
    filename_SNAKE_CASE: "{filename_SNAKE_CASE}",

    PascalCase: "{PascalCase}",
    camelCase: "{camelCase}",
    snake_case: "{snake_case}",
    SNAKE_CASE: "{SNAKE_CASE}",
};

export const DEFAULT_ROOT = "src";

export const DEFAULT_ALLOW_NAMES = [
    `/^${REFERENCES.camelCase}$/`,
    `/^${REFERENCES.PascalCase}$/`,
];

export const NAMING_RULES_SCHEMA: JSONSchema4 = {
    $schema: "http://json-schema.org/draft-04/schema#",
    definitions: {
        Cases: {
            type: "string",
            enum: ["camelCase", "PascalCase", "snake_case"],
        },
        NameRule: {
            type: "object",
            properties: {
                filePattern: {
                    oneOf: [
                        {
                            type: "string",
                        },
                        {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },
                    ],
                },
                filenamePartsToRemove: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                    default: [],
                },
                allowCases: {
                    type: "array",
                    items: {
                        $ref: "#/definitions/Cases",
                    },
                    default: [],
                },
                allowNames: {
                    type: "array",
                    items: {
                        type: "string",
                    },
                    default: [],
                },
            },
            required: ["filePattern"],
            additionalProperties: false,
        },
    },
    type: "array",
    items: {
        $ref: "#/definitions/NameRule",
    },
};

export const ESLINT_ERRORS = {
    invalidName: `🔥 Invalid name, allowNames: {{allowNamesWithoutReference}}. 🔥`,
};
