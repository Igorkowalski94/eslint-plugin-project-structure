import { Scope } from "rules/fileComposition/fileComposition.types";

interface IsCorrectScopeProps {
  scope?: Scope | Scope[];
  expect: Scope;
}

export const isCorrectScope = ({
  expect,
  scope,
}: IsCorrectScopeProps): boolean => {
  if (expect === "file" && !scope) return true;
  if (!scope) return false;
  if (typeof scope === "string") return scope === expect;
  return scope.some((s) => s === expect);
};
