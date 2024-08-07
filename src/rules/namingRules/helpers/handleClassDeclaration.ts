import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

import { validateName } from "rules/namingRules/helpers/validateName";
import { ESLINT_ERRORS } from "rules/namingRules/namingRules.consts";
import { FileNamingRules } from "rules/namingRules/namingRules.types";

interface HandleClassDeclarationProps {
    node: TSESTree.ClassDeclaration;
    context: RuleContext<keyof typeof ESLINT_ERRORS, FileNamingRules[]>;
}

export const handleClassDeclaration = ({
    node,
    context,
}: HandleClassDeclarationProps): void => {
    if (!node.id?.name) return;

    validateName({
        node,
        context,
        name: node.id.name,
        nameType: "ClassDeclaration",
    });
};
