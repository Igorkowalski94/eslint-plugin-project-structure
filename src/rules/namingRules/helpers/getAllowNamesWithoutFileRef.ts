import { REFERENCES } from "../namingRules.consts";
import { NamingRule } from "../namingRules.types";

interface GetAllowNamesWithoutFileRefProps {
    allowNames: NamingRule["allowNames"];
    ignoreFilenameReferences: boolean;
}

export const getAllowNamesWithoutFileRef = ({
    allowNames,
    ignoreFilenameReferences,
}: GetAllowNamesWithoutFileRefProps): NamingRule["allowNames"] | undefined => {
    if (!ignoreFilenameReferences) return allowNames;

    return allowNames?.filter(
        (p) =>
            !p.includes(REFERENCES.filename_PascalCase) &&
            !p.includes(REFERENCES.filename_SNAKE_CASE) &&
            !p.includes(REFERENCES.filename_camelCase) &&
            !p.includes(REFERENCES.filename_snake_case),
    );
};
