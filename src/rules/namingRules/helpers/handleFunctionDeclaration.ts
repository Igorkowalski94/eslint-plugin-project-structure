import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

import { validateName } from "./validateName";
import { ESLINT_ERRORS } from "../namingRules.consts";
import { FileNamingRules } from "../namingRules.types";

interface HandleFunctionDeclarationProps {
    node: TSESTree.FunctionDeclaration;
    context: RuleContext<keyof typeof ESLINT_ERRORS, FileNamingRules[]>;
}

export const handleFunctionDeclaration = ({
    node,
    context,
}: HandleFunctionDeclarationProps): void => {
    if (!node.id?.name) return;

    validateName({
        node,
        context,
        name: node.id.name,
        nameType: "ClassDeclaration",
    });
};
