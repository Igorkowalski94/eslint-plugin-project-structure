import { TSESTree } from "@typescript-eslint/utils";

import { Context } from "rules/fileComposition/fileComposition.types";
import { handleMethodDefinition } from "rules/fileComposition/helpers/handleMethodDefinition";
import { validateFile } from "rules/fileComposition/helpers/validateFile/validateFile";

jest.mock("rules/fileComposition/helpers/validateFile/validateFile", () => ({
  validateFile: jest.fn(),
}));

describe("handleMethodDefinition", () => {
  test("Should call validateFile when node.key.type === TSESTree.AST_NODE_TYPES.Identifier", () => {
    const validateFileMock = jest.fn();

    (validateFile as jest.Mock).mockImplementation(validateFileMock);

    handleMethodDefinition({
      node: {
        key: { type: TSESTree.AST_NODE_TYPES.Identifier, name: "methodName" },
      } as TSESTree.MethodDefinition,
      context: {} as Context,
    });

    expect(validateFileMock).toHaveBeenCalled();
  });

  test("Should not call validateFile when node.key.type !== TSESTree.AST_NODE_TYPES.Identifier", () => {
    const validateFileMock = jest.fn();

    (validateFile as jest.Mock).mockImplementation(validateFileMock);

    handleMethodDefinition({
      node: {
        key: {
          type: TSESTree.AST_NODE_TYPES.ConditionalExpression,
        },
      } as TSESTree.MethodDefinition,
      context: {} as Context,
    });

    expect(validateFileMock).not.toHaveBeenCalled();
  });
});
