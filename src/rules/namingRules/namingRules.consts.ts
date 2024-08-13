import { JSONSchema4 } from "@typescript-eslint/utils/dist/json-schema";

import { NameTypes } from "rules/namingRules/namingRules.types";

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

export const DEFAULT_ALLOW_NAMES = [
  REFERENCES.camelCase,
  REFERENCES.PascalCase,
];

export const NAME_TYPES: NameTypes = {
  VariableDeclarator: "variable",
  ClassDeclaration: "class",
  FunctionDeclaration: "function",
  ArrowFunctionExpression: "arrowFunction",
  TSEnumDeclaration: "enum",
  TSInterfaceDeclaration: "interface",
  TSTypeAliasDeclaration: "type",
};

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

export const ESLINT_ERRORS = {
  invalidName: `🔥 Invalid {{nameType}} name, allowed names = {{allowNamesWithoutReferences}} 🔥`,
};
