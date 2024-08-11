import { NameTypeRule } from "rules/namingRules/namingRules.types";

interface IsCorrectNameTypeProps {
    ruleNameType: NameTypeRule | NameTypeRule[];
    nameType: NameTypeRule;
}

export const isCorrectNameType = ({
    ruleNameType,
    nameType,
}: IsCorrectNameTypeProps): boolean =>
    (Array.isArray(ruleNameType) && ruleNameType.includes(nameType)) ||
    (typeof ruleNameType === "string" && ruleNameType === nameType);
