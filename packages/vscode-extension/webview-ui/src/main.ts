import type {
  ProjectConfig,
  ProjectTemplate,
} from "../../src/core/projectConfig";

type ExtensionToWebviewMessage =
  | { type: "update"; config: ProjectConfig }
  | { type: "parseError"; message: string }
  | { type: "pickResult"; field: string; value: string };

type WebviewToExtensionMessage =
  | { type: "edit"; config: ProjectConfig }
  | { type: "pickFile"; field: string; currentValue: string }
  | { type: "pickFolder"; field: string; currentValue: string }
  | { type: "execute" };

declare function acquireVsCodeApi(): {
  postMessage(message: WebviewToExtensionMessage): void;
};

const vscode = acquireVsCodeApi();

let currentConfig: ProjectConfig = {
  "api-model": "",
  "variability-model": "",
  "mapping-model": "",
  templates: [],
  "output-folder": "",
};

function sendEdit(): void {
  vscode.postMessage({ type: "edit", config: currentConfig });
}

function browseField(
  field: "api-model" | "variability-model" | "mapping-model" | "output-folder",
): void {
  const isFolder = field === "output-folder";
  vscode.postMessage({
    type: isFolder ? "pickFolder" : "pickFile",
    field,
    currentValue: currentConfig[field],
  });
}

function browseTemplateFolder(index: number): void {
  vscode.postMessage({
    type: "pickFolder",
    field: `templates.${String(index)}.folder`,
    currentValue: currentConfig.templates[index]?.folder ?? "",
  });
}

function labeledPathRow(
  label: string,
  value: string,
  onChange: (v: string) => void,
  onBrowse: () => void,
): HTMLElement {
  const row = document.createElement("div");
  row.className = "row";

  const labelEl = document.createElement("label");
  labelEl.textContent = label;
  row.appendChild(labelEl);

  const input = document.createElement("input");
  input.type = "text";
  input.value = value;
  input.addEventListener("change", () => {
    onChange(input.value);
  });
  row.appendChild(input);

  const browseButton = document.createElement("button");
  browseButton.textContent = "Browse…";
  browseButton.addEventListener("click", onBrowse);
  row.appendChild(browseButton);

  return row;
}

function templateRow(index: number, tpl: ProjectTemplate): HTMLElement {
  const wrapper = document.createElement("fieldset");
  wrapper.className = "template";

  const legend = document.createElement("legend");
  legend.textContent = `Template ${String(index + 1)}`;
  wrapper.appendChild(legend);

  const nameRow = document.createElement("div");
  nameRow.className = "row";
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Name";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = tpl.template;
  nameInput.addEventListener("change", () => {
    const current = currentConfig.templates[index];
    if (!current) return;
    current.template = nameInput.value;
    sendEdit();
  });
  nameRow.append(nameLabel, nameInput);
  wrapper.appendChild(nameRow);

  wrapper.appendChild(
    labeledPathRow(
      "Folder",
      tpl.folder,
      (v) => {
        const current = currentConfig.templates[index];
        if (!current) return;
        current.folder = v;
        sendEdit();
      },
      () => {
        browseTemplateFolder(index);
      },
    ),
  );

  const optionsRow = document.createElement("div");
  optionsRow.className = "row";
  const optionsLabel = document.createElement("label");
  optionsLabel.textContent = "Options (JSON)";
  const optionsTextarea = document.createElement("textarea");
  optionsTextarea.value = JSON.stringify(tpl.options, null, 2);
  optionsTextarea.addEventListener("change", () => {
    const current = currentConfig.templates[index];
    if (!current) return;
    try {
      current.options = JSON.parse(optionsTextarea.value) as Record<
        string,
        unknown
      >;
      optionsTextarea.classList.remove("invalid");
      sendEdit();
    } catch {
      optionsTextarea.classList.add("invalid");
    }
  });
  optionsRow.append(optionsLabel, optionsTextarea);
  wrapper.appendChild(optionsRow);

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove template";
  removeButton.className = "danger";
  removeButton.addEventListener("click", () => {
    currentConfig.templates.splice(index, 1);
    render();
    sendEdit();
  });
  wrapper.appendChild(removeButton);

  return wrapper;
}

function render(): void {
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML = "";

  const inputHeading = document.createElement("h3");
  inputHeading.textContent = "Input";
  app.appendChild(inputHeading);

  app.appendChild(
    labeledPathRow(
      "API model",
      currentConfig["api-model"],
      (v) => {
        currentConfig["api-model"] = v;
        sendEdit();
      },
      () => {
        browseField("api-model");
      },
    ),
  );
  app.appendChild(
    labeledPathRow(
      "Variability model",
      currentConfig["variability-model"],
      (v) => {
        currentConfig["variability-model"] = v;
        sendEdit();
      },
      () => {
        browseField("variability-model");
      },
    ),
  );
  app.appendChild(
    labeledPathRow(
      "Mapping model",
      currentConfig["mapping-model"],
      (v) => {
        currentConfig["mapping-model"] = v;
        sendEdit();
      },
      () => {
        browseField("mapping-model");
      },
    ),
  );

  const templatesHeading = document.createElement("h3");
  templatesHeading.textContent = "Templates";
  app.appendChild(templatesHeading);

  currentConfig.templates.forEach((tpl, index) => {
    app.appendChild(templateRow(index, tpl));
  });

  const addButton = document.createElement("button");
  addButton.textContent = "+ Add template";
  addButton.addEventListener("click", () => {
    currentConfig.templates.push({ template: "", folder: "", options: {} });
    render();
    sendEdit();
  });
  app.appendChild(addButton);

  const outputHeading = document.createElement("h3");
  outputHeading.textContent = "Output";
  app.appendChild(outputHeading);

  app.appendChild(
    labeledPathRow(
      "Output folder",
      currentConfig["output-folder"],
      (v) => {
        currentConfig["output-folder"] = v;
        sendEdit();
      },
      () => {
        browseField("output-folder");
      },
    ),
  );

  const executeButton = document.createElement("button");
  executeButton.textContent = "Generate";
  executeButton.addEventListener("click", () => {
    vscode.postMessage({ type: "execute" });
  });
  app.appendChild(executeButton);
}

window.addEventListener(
  "message",
  (event: MessageEvent<ExtensionToWebviewMessage>) => {
    const message = event.data;
    switch (message.type) {
      case "update":
        currentConfig = message.config;
        render();
        break;
      case "parseError":
        break;
      case "pickResult": {
        if (message.field.startsWith("templates.")) {
          const [, indexStr] = message.field.split(".");
          const index = Number(indexStr);
          const template = currentConfig.templates[index];
          if (template) {
            template.folder = message.value;
          }
        } else {
          (currentConfig as unknown as Record<string, string>)[message.field] =
            message.value;
        }
        render();
        sendEdit();
        break;
      }
    }
  },
);

render();
