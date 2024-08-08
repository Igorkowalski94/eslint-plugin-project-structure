import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

import { handleClassDeclaration } from "rules/namingRules/helpers/handleClassDeclaration";
import { validateName } from "rules/namingRules/helpers/validateName";
import { ESLINT_ERRORS } from "rules/namingRules/namingRules.consts";
import { FileNamingRules } from "rules/namingRules/namingRules.types";

jest.mock("rules/namingRules/helpers/validateName", () => ({
    validateName: jest.fn(),
}));

describe("handleClassDeclaration", () => {
    test("Should call validateName when !!name", () => {
        const validateNameMock = jest.fn();

        (validateName as jest.Mock).mockImplementation(validateNameMock);

        handleClassDeclaration({
            node: {
                id: { name: "className" },
            } as TSESTree.ClassDeclaration,
            context: {} as RuleContext<
                keyof typeof ESLINT_ERRORS,
                FileNamingRules[]
            >,
        });

        expect(validateNameMock).toHaveBeenCalled();
    });

    test("Should not call validateName when !name", () => {
        const validateNameMock = jest.fn();

        (validateName as jest.Mock).mockImplementation(validateNameMock);

        handleClassDeclaration({
            node: {} as TSESTree.ClassDeclaration,
            context: {} as RuleContext<
                keyof typeof ESLINT_ERRORS,
                FileNamingRules[]
            >,
        });

        expect(validateNameMock).not.toHaveBeenCalled();
    });
});
