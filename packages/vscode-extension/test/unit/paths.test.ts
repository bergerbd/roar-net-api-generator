import { describe, expect, it } from "vitest";
import * as path from "node:path";
import { toAbsolutePath, toRelativePortablePath } from "../../src/core/paths";

describe("toRelativePortablePath", () => {
  it("computes a relative path using forward slashes", () => {
    const base = path.resolve("/project/config-dir");
    const target = path.resolve("/project/config-dir/templates/java");
    expect(toRelativePortablePath(base, target)).toBe("templates/java");
  });

  it("can also lead out of subfolders (..)", () => {
    const base = path.resolve("/project/config-dir/sub");
    const target = path.resolve("/project/other");
    expect(toRelativePortablePath(base, target)).toBe("../../other");
  });
});

describe("toAbsolutePath", () => {
  it("resolves a portable relative path correctly", () => {
    const base = path.resolve("/project/config-dir");
    expect(toAbsolutePath(base, "templates/java")).toBe(
      path.resolve("/project/config-dir/templates/java"),
    );
  });

  it("is the inverse of toRelativePortablePath", () => {
    const base = path.resolve("/project/config-dir");
    const original = path.resolve("/project/config-dir/a/b/c");
    const relative = toRelativePortablePath(base, original);
    expect(toAbsolutePath(base, relative)).toBe(original);
  });
});
