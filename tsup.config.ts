/* eslint-disable no-restricted-exports */
import { defineConfig, Options } from "tsup";

const commonOptions: Options = {
    format: "cjs",
    dts: true,
    cjsInterop: true,
};

// ts-prune-ignore-next
export default defineConfig([
    {
        entry: ["src/index.ts"],
        outDir: "dist",
        clean: true,
        ...commonOptions,
    },
    {
        entry: ["src/parser.ts"],
        outDir: ".",
        ...commonOptions,
    },
]);
