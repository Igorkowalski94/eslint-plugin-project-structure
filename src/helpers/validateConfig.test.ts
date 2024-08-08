import { JSONSchema4 } from "@typescript-eslint/utils/dist/json-schema";

import { getInvalidConfigError } from "errors/getInvalidConfigError";

import { validateConfig } from "helpers/validateConfig";

describe("validateConfig", () => {
    const schema: JSONSchema4 = {
        $schema: "http://json-schema.org/draft-07/schema#",
        type: "object",
        properties: {
            key1: {
                type: "number",
            },
            key2: {
                type: "string",
            },
            key3: {
                type: "object",
                properties: {
                    key4: {
                        type: "array",
                        items: [
                            {
                                type: "null",
                            },
                        ],
                    },
                },
            },
            key5: {
                type: "array",
                items: [
                    {
                        type: "boolean",
                    },
                ],
            },
        },
        required: ["key1"],
        additionalProperties: false,
    };

    it("should throw error when schema is incorrect", () => {
        expect(() =>
            validateConfig({
                config: {
                    key1: [],
                    key2: {},
                    key3: {
                        key4: [true],
                    },
                    key5: [1],
                },
                schema,
            }),
        ).toThrow(
            getInvalidConfigError([
                "configuration.key1 is not of a type(s) number",
                "configuration.key2 is not of a type(s) string",
                "configuration.key3.key4[0] is not of a type(s) null",
                "configuration.key5[0] is not of a type(s) boolean",
            ]),
        );
    });

    it("should not throw error when schema is correct", () => {
        expect(() =>
            validateConfig({
                config: {
                    $schema:
                        "node_modules/eslint-plugin-project-structure/schema.json",
                    key1: 1,
                    key2: "",
                },
                schema,
            }),
        ).not.toThrow();
    });
});
