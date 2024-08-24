import { JSONSchema4 } from "@typescript-eslint/utils/dist/json-schema";

export const NAMING_RULES_SCHEMA: JSONSchema4 = {
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {
    Selector: {
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
        selector: {
          oneOf: [
            { $ref: "#/definitions/Selector" },
            {
              type: "array",
              items: { $ref: "#/definitions/Selector" },
            },
          ],
        },
        filenamePartsToRemove: {
          type: "array",
          items: { type: "string" },
        },
        format: {
          type: "array",
          items: { type: "string" },
        },
      },
      required: ["selector"],
      additionalProperties: false,
    },
    NamingRuleObject: {
      type: "object",
      properties: {
        allowOnlySpecifiedSelectors: { type: "boolean" },
        errors: {
          type: "object",
          properties: {
            class: { type: "string" },
            variable: { type: "string" },
            function: { type: "string" },
            arrowFunction: { type: "string" },
            type: { type: "string" },
            interface: { type: "string" },
            enum: { type: "string" },
          },
          additionalProperties: false,
        },
        rules: {
          type: "array",
          items: { $ref: "#/definitions/NamingRule" },
        },
      },
      required: ["rules"],
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
        fileRootRules: {
          oneOf: [
            {
              type: "array",
              items: { $ref: "#/definitions/NamingRule" },
            },
            { $ref: "#/definitions/NamingRuleObject" },
          ],
        },
        fileExportsRules: {
          oneOf: [
            {
              type: "array",
              items: { $ref: "#/definitions/NamingRule" },
            },
            { $ref: "#/definitions/NamingRuleObject" },
          ],
        },
        fileRules: {
          oneOf: [
            {
              type: "array",
              items: { $ref: "#/definitions/NamingRule" },
            },
            { $ref: "#/definitions/NamingRuleObject" },
          ],
        },
      },
      required: ["filePattern"],
      additionalProperties: false,
    },
  },
  type: "array",
  items: { $ref: "#/definitions/FileNamingRules" },
};
