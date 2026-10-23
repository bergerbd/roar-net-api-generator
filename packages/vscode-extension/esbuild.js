// @ts-check
const esbuild = require("esbuild");
const fs = require("node:fs");
const path = require("node:path");

const production = process.argv.includes("--production");
const watch = process.argv.includes("--watch");

// `uvl-parser` imports `antlr4` via a static ESM `import`, so esbuild
// resolves antlr4's "import" export condition and bundles its ESM build -
// even though our own output format is CJS. That build calls
// `createRequire(import.meta.url)` at module scope purely to `require("fs")`
// (a common trick for using Node builtins from pure-ESM code). esbuild can't
// resolve `import.meta.url` when the output format is CJS and replaces it
// with `undefined`, so createRequire() throws "The argument 'filename' must
// be a file URL object, ..." the moment the extension is activated.
// Since only Node builtins are ever required through it here, the exact
// value doesn't matter as long as it's a valid absolute file URL - so we
// define it as a fixed constant instead of leaving it unresolved.
const importMetaUrlShim = JSON.stringify(
  require("node:url").pathToFileURL(path.resolve("dist/extension.js")).href,
);

/**
 * Prints "[watch] build started" / "[watch] build finished", so that the
 * $esbuild-watch problem matcher (extension: connor4312.esbuild-problem-matchers)
 * recognizes when a build has finished. Without it, VS Code waits forever for
 * an "isBackground: true" preLaunchTask to signal completion.
 * @type {import('esbuild').Plugin}
 */
const esbuildProblemMatcherPlugin = {
  name: "esbuild-problem-matcher",
  setup(build) {
    build.onStart(() => {
      console.log("[watch] build started");
    });
    build.onEnd((result) => {
      result.errors.forEach(({ text, location }) => {
        console.error(`✘ [ERROR] ${text}`);
        if (location) {
          console.error(
            `    ${location.file}:${location.line}:${location.column}:`,
          );
        }
      });
      console.log("[watch] build finished");
    });
  },
};

function copyWebviewCss() {
  fs.mkdirSync("dist/webview", { recursive: true });
  fs.copyFileSync(
    path.join("webview-ui", "media", "main.css"),
    path.join("dist", "webview", "main.css"),
  );
}

async function main() {
  const extensionCtx = await esbuild.context({
    entryPoints: ["src/extension.ts"],
    bundle: true,
    format: "cjs",
    minify: production,
    sourcemap: !production,
    sourcesContent: false,
    platform: "node",
    outfile: "dist/extension.js",
    // "vscode" is provided by the extension host at runtime; do not bundle it.
    // "fsevents" (macOS only, optional dependency of chokidar via nunjucks) is a
    // native module that esbuild cannot bundle; nunjucks only needs it for
    // template watching, which the generator does not use.
    external: ["vscode", "fsevents"],
    define: {
      "import.meta.url": importMetaUrlShim,
    },
    logLevel: "warning",
    plugins: [esbuildProblemMatcherPlugin],
  });

  const webviewCtx = await esbuild.context({
    entryPoints: ["webview-ui/src/main.ts"],
    bundle: true,
    format: "iife",
    minify: production,
    sourcemap: !production,
    sourcesContent: false,
    platform: "browser",
    outfile: "dist/webview/main.js",
    logLevel: "warning",
  });

  copyWebviewCss();

  if (watch) {
    await Promise.all([extensionCtx.watch(), webviewCtx.watch()]);
  } else {
    await Promise.all([extensionCtx.rebuild(), webviewCtx.rebuild()]);
    await Promise.all([extensionCtx.dispose(), webviewCtx.dispose()]);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
