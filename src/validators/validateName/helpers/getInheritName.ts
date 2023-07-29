import { InheritParentName } from "../../../types";
import { lowerCaseFirstLetter } from "./lowerCaseFirstLetter";
import { upperCaseFirstLetter } from "./upperCaseFirstLetter";

export const getInheritName = (
  parentName: string,
  inheritParentName: InheritParentName
) =>
  inheritParentName === "firstLetterUppercase"
    ? upperCaseFirstLetter(parentName)
    : lowerCaseFirstLetter(parentName);
