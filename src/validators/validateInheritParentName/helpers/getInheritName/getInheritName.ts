import { getLowerCaseFirstLetter } from "./helpers/getLowerCaseFirstLetter";
import { getUpperCaseFirstLetter } from "./helpers/getUpperCaseFirstLetter";
import { InheritParentName } from "../../../../types";

export const getInheritName = (
    parentName: string,
    inheritParentName: InheritParentName,
): string =>
    inheritParentName === "firstLetterUppercase"
        ? getUpperCaseFirstLetter(parentName)
        : getLowerCaseFirstLetter(parentName);
