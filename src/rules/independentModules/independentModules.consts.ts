import { JSONSchema4 } from "@typescript-eslint/utils/dist/json-schema";

export const DIRNAME_REGEX = /{dirname(_\d+)?}/g;
export const FAMILY_REGEX = /{family(_\d+)?}/g;

export const DEFAULT_IMPORT_ROOT = "src";
export const NO_FAMILY = "NO_FAMILY";

export const FILE_EXTENSIONS = [
    ".js",
    ".jsx",
    ".mjs",
    ".cjs",

    ".d.ts",
    ".ts",
    ".tsx",

    ".vue",
    ".svelte",

    ".json",
    ".jsonc",
    ".yml",
    ".yaml",

    ".svg",
    ".png",
    ".jpg",
    ".ico",

    ".css",
    ".scss",
    ".sass",
    ".less",

    ".html",
];

export const INDEPENDENT_MODULES_SCHEMA: JSONSchema4 = {
    $ref: "#/definitions/IndependentModulesConfig",
    $schema: "http://json-schema.org/draft-07/schema#",
    definitions: {
        Pattern: {
            anyOf: [
                {
                    type: "string",
                    default: "",
                },
                {
                    type: "array",
                    items: {
                        type: "string",
                        default: "",
                    },
                    default: [],
                },
            ],
        },
        Module: {
            type: "object",
            additionalProperties: false,
            properties: {
                name: {
                    type: "string",
                    default: "",
                },
                pattern: {
                    $ref: "#/definitions/Pattern",
                    default: "",
                },
                errorMessage: {
                    type: "string",
                    default: "",
                },
                allowImportsFrom: {
                    type: "array",
                    items: {
                        $ref: "#/definitions/Pattern",
                    },
                    default: [],
                },
                allowExternalImports: {
                    type: "boolean",
                    default: false,
                },
            },
            default: {
                name: "",
                pattern: "",
                allowImportsFrom: [],
            },
            required: ["name", "pattern", "allowImportsFrom"],
        },
        IndependentModulesConfig: {
            type: "object",
            additionalProperties: false,
            properties: {
                extensions: {
                    type: "array",
                    items: {
                        type: "string",
                        default: "",
                    },
                },
                debugMode: {
                    type: "boolean",
                    default: true,
                },
                root: {
                    anyOf: [
                        {
                            type: "string",
                            default: "src",
                        },
                        {
                            type: "null",
                            default: null,
                        },
                    ],
                },
                reusableImportPatterns: {
                    type: "object",
                    additionalProperties: {
                        type: "array",
                        items: {
                            $ref: "#/definitions/Pattern",
                        },
                    },
                    default: {},
                },
                modules: {
                    type: "array",
                    items: {
                        $ref: "#/definitions/Module",
                    },
                    default: [],
                },
            },
            required: ["modules"],
        },
    },
};
