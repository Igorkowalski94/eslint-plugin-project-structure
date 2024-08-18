import { JSONSchema4 } from "@typescript-eslint/utils/dist/json-schema";

export const NAMING_RULES_SCHEMA: JSONSchema4 = {
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {
    NameType: {
      type: "string",
      enum: [
        "class",
        "variable",
        "function",
        "arrowFunction",
        "type",
        "interface",
        "enum",
      ],
    },
    NamingRule: {
      type: "object",
      properties: {
        nameType: {
          oneOf: [
            { $ref: "#/definitions/NameType" },
            {
              type: "array",
              items: { $ref: "#/definitions/NameType" },
            },
          ],
        },
        filenamePartsToRemove: {
          type: "array",
          items: { type: "string" },
        },
        allowNamesFileRoot: {
          type: "array",
          items: { type: "string" },
        },
        allowNamesExport: {
          type: "array",
          items: { type: "string" },
        },
        allowNames: {
          type: "array",
          items: { type: "string" },
        },
      },
      required: ["nameType"],
      additionalProperties: false,
    },
    FileNamingRules: {
      type: "object",
      properties: {
        filePattern: {
          oneOf: [
            { type: "string" },
            {
              type: "array",
              items: { type: "string" },
            },
          ],
        },
        rules: {
          type: "array",
          items: { $ref: "#/definitions/NamingRule" },
        },
      },
      required: ["filePattern", "rules"],
      additionalProperties: false,
    },
  },
  type: "array",
  items: { $ref: "#/definitions/FileNamingRules" },
};
