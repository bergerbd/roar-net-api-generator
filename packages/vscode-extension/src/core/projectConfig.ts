export interface ProjectTemplate {
  template: string;
  folder: string;
  options: Record<string, unknown>;
}

export interface ProjectConfig {
  "api-model": string;
  "variability-model": string;
  "mapping-model": string;
  templates: ProjectTemplate[];
  "output-folder": string;
}

export class ProjectConfigParseError extends Error {}

/**
 * Parses roar-net.config.json.
 */
export function parseProjectConfig(text: string): ProjectConfig {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new ProjectConfigParseError(`Invalid JSON: ${message}`);
  }

  if (typeof raw !== "object" || raw === null) {
    throw new ProjectConfigParseError(
      "The configuration must be a JSON object.",
    );
  }

  const obj = raw as Record<string, unknown>;

  const requiredStringFields = [
    "api-model",
    "variability-model",
    "mapping-model",
    "output-folder",
  ] as const;
  for (const field of requiredStringFields) {
    if (typeof obj[field] !== "string") {
      throw new ProjectConfigParseError(
        `Field "${field}" is missing or is not a string.`,
      );
    }
  }

  if (!Array.isArray(obj["templates"])) {
    throw new ProjectConfigParseError(
      'Field "templates" is missing or is not an array.',
    );
  }

  const templates: ProjectTemplate[] = obj["templates"].map((entry, index) => {
    if (typeof entry !== "object" || entry === null) {
      throw new ProjectConfigParseError(
        `templates[${String(index)}] have to be an object.`,
      );
    }
    const templateEntry = entry as Record<string, unknown>;
    if (typeof templateEntry["template"] !== "string") {
      throw new ProjectConfigParseError(
        `templates[${String(index)}].template is missing or is not a string.`,
      );
    }
    if (typeof templateEntry["folder"] !== "string") {
      throw new ProjectConfigParseError(
        `templates[${String(index)}].folder is missing or is not a string.`,
      );
    }
    const options = templateEntry["options"];
    return {
      template: templateEntry["template"],
      folder: templateEntry["folder"],
      options:
        typeof options === "object" && options !== null
          ? (options as Record<string, unknown>)
          : {},
    };
  });

  return {
    "api-model": obj["api-model"] as string,
    "variability-model": obj["variability-model"] as string,
    "mapping-model": obj["mapping-model"] as string,
    templates,
    "output-folder": obj["output-folder"] as string,
  };
}

/** Serializes project configuration. */
export function serializeProjectConfig(config: ProjectConfig): string {
  return JSON.stringify(config, null, 4) + "\n";
}

export function createEmptyProjectConfig(): ProjectConfig {
  return {
    "api-model": "",
    "variability-model": "",
    "mapping-model": "",
    templates: [],
    "output-folder": "generated",
  };
}

export function createEmptyTemplate(): ProjectTemplate {
  return { template: "", folder: "", options: {} };
}
