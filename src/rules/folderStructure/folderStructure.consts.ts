import { JSONSchema4 } from "@typescript-eslint/utils/dist/json-schema";

export const REFERENCES = {
    parentName: "{parentName}",
    ParentName: "{ParentName}",
    name: "{name}",
    Name: "{Name}",
};

export const FOLDER_STRUCTURE_SCHEMA: JSONSchema4 = {
    $schema: "http://json-schema.org/draft-07/schema#",
    definitions: {
        Rule: {
            type: "object",
            default: { name: "" },
            properties: {
                ruleId: {
                    type: "string",
                    default: "",
                },
                name: {
                    type: "string",
                    default: "",
                },
                children: {
                    type: "array",
                    default: [],
                    items: {
                        $ref: "#/definitions/Rule",
                    },
                },
                enforceExistence: {
                    type: "array",
                    default: [],
                    items: {
                        type: "string",
                    },
                },
            },
            additionalProperties: false,
        },
        RegexParameters: {
            type: "object",
            default: {},
            additionalProperties: {
                type: "string",
            },
        },
    },
    type: "object",
    properties: {
        ignorePatterns: {
            type: "array",
            default: [],
            items: {
                type: "string",
            },
        },
        structure: {
            $ref: "#/definitions/Rule",
        },
        rules: {
            type: "object",
            default: {},
            additionalProperties: {
                $ref: "#/definitions/Rule",
            },
        },
        regexParameters: {
            $ref: "#/definitions/RegexParameters",
        },
    },
    required: ["structure"],
    additionalProperties: false,
};
