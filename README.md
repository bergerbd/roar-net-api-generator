# ROAR-NET API Generator

Generates the documentation and the language APIs of the [ROAR-NET API](https://github.com/roar-net/roar-net-api-spec)
from an Ecore API model, a UVL variability model and a mapping between both. The generator is a VS Code
extension; templates are written in [Nunjucks](https://mozilla.github.io/nunjucks/).

## Repository layout

| Path                         | Content                                                                                                                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/vscode-extension/` | The VS Code extension (generator core, project-config editor). [README](packages/vscode-extension/README.md) (Marketplace page), [DEVELOPMENT](packages/vscode-extension/DEVELOPMENT.md). |
| `playground/`                | Example project and workspace of the Extension Development Host: example inputs, the ROAR-NET templates (`templates/`) and their output (`generated/`, not tracked).                      |
| `.changeset/`                | Pending [changesets](https://changesets.dev) (version bumps and changelog entries).                                                                                                       |

## Getting started

Requires Node.js 24 (enforced by pnpm via `devEngines`) and pnpm 12; the devcontainer provides both.

1. Open the repository in VS Code and "Reopen in Container"; the devcontainer installs pnpm and runs `pnpm install`.
2. Press `F5`: builds the extension in watch mode and opens the playground in an Extension Development Host.
3. Open `roar-net.config.json` there and press "Generate".

## Scripts (repository root)

| Command          | Purpose                                                              |
| ---------------- | -------------------------------------------------------------------- |
| `pnpm verify`    | Typecheck, lint, format check, unit and end-to-end tests             |
| `pnpm build`     | Development build of all packages                                    |
| `pnpm package`   | Builds the `.vsix` of the extension                                  |
| `pnpm changeset` | Records a change (patch/minor/major + changelog entry) for a release |

## Releases

Every user-facing change comes with a changeset (`pnpm changeset`). On `main`, the release workflow collects
pending changesets into a "Version Packages" pull request; merging it bumps the version, updates the changelog
and publishes the extension to the VS Code Marketplace (secret `VSCE_PAT`). Nothing is published to npm.

## Acknowledgement

Supported by [COST Action CA22137](https://www.cost.eu/actions/CA22137/) "Randomised Optimisation Algorithms
Research Network" ([ROAR-NET](https://roar-net.eu/)), funded by COST (European Cooperation in Science and Technology).

## License

[Apache-2.0](LICENSE)
