import { describe, expect, it } from "vitest";
import {
  createEmptyProjectConfig,
  parseProjectConfig,
  ProjectConfigParseError,
  serializeProjectConfig,
} from "../../src/core/projectConfig";

const exampleJson = `{
    "api-model" : "roar-net-api.ecore",
    "variability-model" :  "roar-net-variability.uvl",
    "mapping-model" : "variability-mapping.tson",
    "templates" : [
        {
            "template" : "markdown",
            "folder"   : "templates/markdown",
            "options"  : {}
        },
        {
            "template" : "java",
            "folder"   : "templates/java",
            "options"  : {
                "base-package" : "roar_net"
            }
        }
    ],
    "output-folder" : "generated"
}`;

describe("parseProjectConfig", () => {
  it("parses the example from the requirements correctly", () => {
    const config = parseProjectConfig(exampleJson);

    expect(config["api-model"]).toBe("roar-net-api.ecore");
    expect(config.templates).toHaveLength(2);
    expect(config.templates[1]).toEqual({
      template: "java",
      folder: "templates/java",
      options: { "base-package": "roar_net" },
    });
    expect(config["output-folder"]).toBe("generated");
  });

  it("throws a ProjectConfigParseError on invalid JSON", () => {
    expect(() => parseProjectConfig("{ not valid")).toThrow(
      ProjectConfigParseError,
    );
  });

  it("throws an error when a required field is missing", () => {
    const invalid = JSON.stringify({ "api-model": "x.ecore" });
    expect(() => parseProjectConfig(invalid)).toThrow(/variability-model/);
  });

  it("throws an error when a template has no 'folder'", () => {
    const invalid = JSON.stringify({
      "api-model": "a",
      "variability-model": "b",
      "mapping-model": "c",
      templates: [{ template: "markdown" }],
      "output-folder": "generated",
    });
    expect(() => parseProjectConfig(invalid)).toThrow(/templates\[0\].folder/);
  });

  it("sets 'options' to an empty object when it is missing", () => {
    const withoutOptions = JSON.stringify({
      "api-model": "a",
      "variability-model": "b",
      "mapping-model": "c",
      templates: [{ template: "markdown", folder: "templates/markdown" }],
      "output-folder": "generated",
    });
    const parsed = parseProjectConfig(withoutOptions);
    expect(parsed.templates[0]).toBeDefined();
    expect(parsed.templates[0]?.options).toEqual({});
  });
});

describe("serializeProjectConfig", () => {
  it("is the inverse of parseProjectConfig (round-trip)", () => {
    const config = parseProjectConfig(exampleJson);
    const reparsed = parseProjectConfig(serializeProjectConfig(config));
    expect(reparsed).toEqual(config);
  });

  it("produces valid, indented JSON", () => {
    const config = createEmptyProjectConfig();
    const text = serializeProjectConfig(config);
    expect(() => JSON.parse(text) as unknown).not.toThrow();
    expect(text).toContain('    "output-folder"');
  });
});
