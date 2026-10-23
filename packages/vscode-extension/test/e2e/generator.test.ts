import { describe, expect, it } from "vitest";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import { generateCode } from "../../src/core/generator";
import type { Logger } from "../../src/core/logger";
import { parseProjectConfig } from "../../src/core/projectConfig";

/**
 * End-to-end test: runs the generator on a snapshot of the example workspace
 * (`fixture/workspace`) and compares every generated file with the golden copy
 * in `fixture/expected`.
 *
 * After an intended change of the generator or a template, refresh the golden
 * copy with `pnpm test:update-golden` and review the diff.
 */
const fixture = path.join(__dirname, "fixture");
const expectedDir = path.join(fixture, "expected");
const updateGolden = process.env["UPDATE_GOLDEN"] === "1";

const silentLogger: Logger = {
  info: () => undefined,
};

function listFiles(dir: string): string[] {
  return fs
    .readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) =>
      path
        .relative(dir, path.join(entry.parentPath, entry.name))
        .split(path.sep)
        .join("/"),
    )
    .sort();
}

describe("generateCode (end-to-end)", () => {
  it("generates the expected files for the example workspace", async () => {
    // Work on a copy, so the output does not end up in the fixture.
    const workspace = fs.mkdtempSync(path.join(os.tmpdir(), "generator-e2e-"));
    fs.cpSync(path.join(fixture, "workspace"), workspace, { recursive: true });
    const config = parseProjectConfig(
      fs.readFileSync(path.join(workspace, "roar-net.config.json"), "utf8"),
    );

    await generateCode(workspace, config, silentLogger);

    const outputDir = path.join(workspace, config["output-folder"]);
    if (updateGolden) {
      fs.rmSync(expectedDir, { recursive: true, force: true });
      fs.cpSync(outputDir, expectedDir, { recursive: true });
    }

    const files = listFiles(outputDir);
    expect(files).toEqual(listFiles(expectedDir));
    for (const file of files) {
      expect(
        fs.readFileSync(path.join(outputDir, file), "utf8"),
        `content of ${file}`,
      ).toBe(fs.readFileSync(path.join(expectedDir, file), "utf8"));
    }
  });
});
