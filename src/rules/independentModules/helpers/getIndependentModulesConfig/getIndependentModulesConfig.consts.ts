import { JSONSchema4 } from "@typescript-eslint/utils/dist/json-schema";

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
          default: [],
          items: {
            type: "string",
            default: "",
          },
        },
      ],
    },
    Module: {
      type: "object",
      default: {
        name: "",
        pattern: "",
        allowImportsFrom: [],
      },
      additionalProperties: false,
      properties: {
        name: {
          type: "string",
          default: "",
        },
        pattern: {
          oneOf: [
            { type: "string", default: "" },
            {
              type: "array",
              default: [],
              items: {
                oneOf: [
                  { type: "string", default: "" },
                  {
                    type: "array",
                    default: [],
                    items: { type: "string" },
                  },
                ],
              },
            },
          ],
        },
        errorMessage: {
          type: "string",
          default: "",
        },
        allowImportsFrom: {
          type: "array",
          default: [],
          items: {
            $ref: "#/definitions/Pattern",
          },
        },
        allowExternalImports: {
          type: "boolean",
          default: false,
        },
      },
      required: ["name", "pattern", "allowImportsFrom"],
    },
    IndependentModulesConfig: {
      type: "object",
      default: {},
      additionalProperties: false,
      properties: {
        extensions: {
          type: "array",
          default: [],
          items: {
            type: "string",
            default: "",
          },
        },
        debugMode: {
          type: "boolean",
          default: true,
        },
        tsconfigPath: {
          type: "string",
          default: "./tsconfig.json",
        },
        pathAliases: {
          type: "object",
          default: {},
          additionalProperties: false,
          properties: {
            baseUrl: { type: "string", default: "" },
            paths: {
              type: "object",
              default: {},
              additionalProperties: {
                type: "array",
                default: [],
                items: { type: "string" },
              },
            },
          },
          required: ["baseUrl", "paths"],
        },
        reusableImportPatterns: {
          type: "object",
          default: {},
          additionalProperties: {
            type: "array",
            items: {
              $ref: "#/definitions/Pattern",
            },
          },
        },
        modules: {
          type: "array",
          default: [],
          items: {
            $ref: "#/definitions/Module",
          },
        },
      },
      required: ["modules"],
    },
  },
};
