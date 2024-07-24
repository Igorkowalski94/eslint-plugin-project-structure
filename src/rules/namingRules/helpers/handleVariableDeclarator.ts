import { TSESTree } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

import { validateName } from "./validateName";
import { ESLINT_ERRORS } from "../namingRules.consts";
import { NamingRule, NameType } from "../namingRules.types";

interface HandleVariableDeclaratorProps {
    node: TSESTree.VariableDeclarator;
    context: RuleContext<keyof typeof ESLINT_ERRORS, NamingRule[]>;
}

export const handleVariableDeclarator = ({
    node,
    context,
}: HandleVariableDeclaratorProps): void => {
    if (node.id.type !== TSESTree.AST_NODE_TYPES.Identifier) return;

    const nameType: NameType =
        node.init?.type === TSESTree.AST_NODE_TYPES.ArrowFunctionExpression
            ? "ArrowFunctionExpression"
            : "VariableDeclarator";

    validateName({
        node,
        context,
        name: node.id.name,
        nameType,
    });
};
