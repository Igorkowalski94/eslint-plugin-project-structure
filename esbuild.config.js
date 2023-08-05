const { build } = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");

build({
    platform: "node",
    entryPoints: ["src/index.ts"],
    outfile: "dist/index.js",
    bundle: true,
    minify: true,
    treeShaking: true,
    plugins: [nodeExternalsPlugin()],
}).catch(() => process.exit(1));
