/* eslint-disable @typescript-eslint/restrict-template-expressions */
const SNAKE_CASE_LOWER_RE = /((([a-z]|\d)+_)*([a-z]|\d)+)/;
const SNAKE_CASE_UPPER_RE = /((([A-Z]|\d)+_)*([A-Z]|\d)+)/;
const KEBAB_CASE_RE = /((([a-z]|\d)+-)*([a-z]|\d)+)/;
const CAMEL_CASE_RE = /([a-z]+[A-Z0-9]*[A-Z0-9]*)*/;
const PASCAL_CASE_RE = /([A-Z]+[a-z0-9]*[A-Z0-9]*)*/;
const STRICT_CAMEL_CASE_RE =
  /[a-z][a-z0-9]*(([A-Z][a-z0-9]+)*[A-Z]?|([a-z0-9]+[A-Z])*|[A-Z])/;
const STRICT_PASCAL_CASE_RE = /[A-Z](([a-z0-9]+[A-Z]?)*)/;

export const SNAKE_CASE_LOWER = `${SNAKE_CASE_LOWER_RE}`.replace(/\//g, "");
export const SNAKE_CASE_UPPER = `${SNAKE_CASE_UPPER_RE}`.replace(/\//g, "");
export const KEBAB_CASE = `${KEBAB_CASE_RE}`.replace(/\//g, "");
export const CAMEL_CASE = `${CAMEL_CASE_RE}`.replace(/\//g, "");
export const PASCAL_CASE = `${PASCAL_CASE_RE}`.replace(/\//g, "");
export const STRICT_CAMEL_CASE = `${STRICT_CAMEL_CASE_RE}`.replace(/\//g, "");
export const STRICT_PASCAL_CASE = `${STRICT_PASCAL_CASE_RE}`.replace(/\//g, "");

export const RECURSION_LIMIT = 1000;
export const WILDCARD_REGEX = "(([^/]*)+)";

export const ESLINT_ERRORS = {
  error: `{{error}}`,
};

export const PROJECT_STRUCTURE_CACHE_FILE_NAME = "projectStructure.cache.json";
