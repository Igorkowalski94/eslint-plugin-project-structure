const { build } = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");

const common = {
    platform: "node",
    bundle: true,
    minify: true,
    treeShaking: true,
    plugins: [nodeExternalsPlugin()],
};

build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/index.js",
    ...common,
}).catch(() => process.exit(1));

build({
    entryPoints: ["./parser.js"],
    outfile: "dist/parser.js",
    ...common,
}).catch(() => process.exit(1));
