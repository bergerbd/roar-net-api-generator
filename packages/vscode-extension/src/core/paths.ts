import * as path from "node:path";

export function toRelativePortablePath(
  baseDir: string,
  absoluteTarget: string,
): string {
  const relative = path.relative(baseDir, absoluteTarget);
  return relative.split(path.sep).join("/");
}

export function toAbsolutePath(
  baseDir: string,
  relativePortablePath: string,
): string {
  const segments = relativePortablePath.split("/");
  return path.resolve(baseDir, ...segments);
}
