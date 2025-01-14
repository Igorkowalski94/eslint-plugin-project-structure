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
        root: {
          type: "string",
          default: "..",
        },
        countFromSystemRoot: {
          type: "boolean",
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
    FolderRecursionRule: {
      type: "object",
      default: { name: "" },
      additionalProperties: false,
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
          oneOf: [
            { type: "string", default: "" },
            { type: "array", default: [], items: { type: "string" } },
          ],
        },
        folderRecursionLimit: {
          type: "number",
        },
      },
    },
    Rule: {
      type: "object",
      default: { name: "" },
      additionalProperties: false,
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
          oneOf: [
            { type: "string", default: "" },
            { type: "array", default: [], items: { type: "string" } },
          ],
        },
      },
    },
    RegexParameters: {
      type: "object",
      default: {},
      additionalProperties: {
        type: "string",
        default: "",
      },
    },
  },
  type: "object",
  additionalProperties: false,
  properties: {
    ignorePatterns: {
      oneOf: [
        { type: "string", default: "" },
        {
          type: "array",
          default: [],
          items: {
            oneOf: [
              { type: "string", default: "" },
              { type: "array", default: [], items: { type: "string" } },
            ],
          },
        },
      ],
    },
    projectRoot: {
      type: "string",
      default: ".",
    },
    structureRoot: {
      type: "string",
      default: ".",
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
          default: [],
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
        $ref: "#/definitions/FolderRecursionRule",
      },
    },
    regexParameters: {
      $ref: "#/definitions/RegexParameters",
    },
  },
  required: ["structure"],
};
