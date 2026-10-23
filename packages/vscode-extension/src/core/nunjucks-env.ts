import fs from "node:fs";
import path from "node:path";

import nunjucks from "nunjucks";

/**
 * A file written by a `{% file %}` block during a single template render.
 */
export interface WrittenFile {
  /** Path as given in the template, relative to the target's outputDir. */
  relativePath: string;
  /** Absolute path the file was actually written to. */
  absolutePath: string;
}

/**
 * Minimal local typings for Nunjucks' internal parser/nodes API, which
 * `@types/nunjucks` itself leaves untyped (`parse(parser: any, nodes: any,
 * lexer: any): any` on `Extension`) since it's undocumented upstream. These
 * cover only the members this file actually uses.
 */
interface NunjucksParser {
  nextToken(): { value: string };
  parseSignature(tolerant: boolean | null, noParens?: boolean): unknown;
  advanceAfterBlockEnd(name?: string): void;
  parseUntilBlocks(...blockNames: string[]): unknown;
}

interface NunjucksNodes {
  CallExtension: new (
    ext: unknown,
    prop: string,
    args: unknown,
    contentArgs: unknown[],
  ) => unknown;
}

/**
 * Custom Nunjucks tag: `{% file "RelativePath.ext" %}...{% endfile %}`
 *
 * Writes the block's rendered content to a file at `RelativePath.ext`,
 * resolved against this extension's `outputDir`. This lets a single
 * `main.njk` render pass produce any number of output files - typically one
 * per classifier - instead of the whole template producing one fixed
 * output stream.
 *
 * Template authors use it like any other Nunjucks tag; they don't need to
 * know it's implemented as an Environment extension.
 */
export class FileExtension {
  public tags = ["file"];
  private outputDir: string;

  constructor(outputDir: string) {
    this.outputDir = outputDir;
  }

  public parse(parser: NunjucksParser, nodes: NunjucksNodes): unknown {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    const body = parser.parseUntilBlocks("endfile");
    parser.advanceAfterBlockEnd();
    return new nodes.CallExtension(this, "run", args, [body]);
  }

  public run(
    _context: unknown,
    relativePath: string,
    body: () => string,
  ): nunjucks.runtime.SafeString {
    const content = body();
    const absolutePath = path.join(this.outputDir, relativePath);
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
    fs.writeFileSync(absolutePath, content, "utf8");
    // The main template's own top-level output (outside any {% file %}
    // block) is discarded - only the files written via this tag matter.
    return new nunjucks.runtime.SafeString("");
  }
}
