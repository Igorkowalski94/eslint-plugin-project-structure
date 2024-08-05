import { defineConfig, Options } from "tsup";

const commonOptions: Options = {
    format: ["cjs", "esm"],
    dts: true,
    cjsInterop: true,
};

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
