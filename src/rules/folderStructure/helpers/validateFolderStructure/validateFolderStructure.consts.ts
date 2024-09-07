import { JSONSchema4 } from "@typescript-eslint/utils/dist/json-schema";

export const FOLDER_STRUCTURE_SCHEMA: JSONSchema4 = {
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {
    LongPathsInfo: {
      type: "object",
      default: { maxLength: 240, mode: "warn" },
      properties: {
        maxLength: {
          type: "number",
          default: 240,
        },
        mode: {
          type: "string",
          default: "warn",
          enum: ["warn", "error"],
        },
      },
      required: ["mode"],
      additionalProperties: false,
    },
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
    longPathsInfo: {
      oneOf: [
        {
          $ref: "#/definitions/LongPathsInfo",
        },
        {
          type: "boolean",
          enum: [false],
        },
      ],
    },
    structure: {
      oneOf: [
        {
          $ref: "#/definitions/Rule",
        },
        {
          type: "array",
          items: {
            $ref: "#/definitions/Rule",
          },
        },
      ],
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
