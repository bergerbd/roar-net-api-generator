import { describe, expect, it } from "vitest";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import { ResourceSetImpl, URI } from "@typemf/core";
import { NodeFileUriConverter } from "@typemf/node";

import { registerUvlFormat } from "../../src/core/uvl/UvlResourceFactory";
import { isFeatureModel } from "../../src/core/model/variability/util/VariabilityTypeGuards";
import { GroupKind } from "../../src/core/model/variability/types/GroupKind";
import { FeatureType } from "../../src/core/model/variability/types/FeatureType";

function writeUvl(source: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "uvl-test-"));
  const file = path.join(dir, "model.uvl");
  fs.writeFileSync(file, source, "utf8");
  return file;
}

function createResourceSet(): ResourceSetImpl {
  const resourceSet = new ResourceSetImpl();
  resourceSet.getUriConverterRegistry().register(new NodeFileUriConverter());
  registerUvlFormat(resourceSet.getResourceFactoryRegistry());
  return resourceSet;
}

const source = `features
    Root
        mandatory
            A
        optional
            B
        alternative
            C
            D
        or
            E
            F
        [1..2]
            G
            H
`;

describe("UvlResourceFactory", () => {
  it("reads a UVL file into a FeatureModel", async () => {
    const resource = await createResourceSet().getResource(
      URI.createFileURI(writeUvl(source)),
      true,
    );

    const root = resource?.getContents().get(0);
    expect(isFeatureModel(root)).toBe(true);
    if (!isFeatureModel(root)) return;

    const feature = root.getRoot();
    expect(feature?.getName()).toBe("Root");
    expect(feature?.getType()).toBe(FeatureType.BOOLEAN);

    const groups = [...(feature?.getGroups() ?? [])];
    expect(groups.map((g) => g.getKind())).toEqual([
      GroupKind.MANDATORY,
      GroupKind.OPTIONAL,
      GroupKind.ALTERNATIVE,
      GroupKind.OR,
      GroupKind.CARDINALITY,
    ]);
    expect(
      [...(groups[2]?.getFeatures() ?? [])].map((f) => f.getName()),
    ).toEqual(["C", "D"]);
  });

  it("strips the quotes from quoted feature names", async () => {
    const resource = await createResourceSet().getResource(
      URI.createFileURI(
        writeUvl(
          'features\n    Root\n        optional\n            "is-reversible"\n',
        ),
      ),
      true,
    );
    const root = resource?.getContents().get(0);
    if (!isFeatureModel(root)) throw new Error("no FeatureModel root");
    const group = root.getRoot()?.getGroups().get(0);
    expect(group?.getFeatures().get(0).getName()).toBe("is-reversible");
  });

  it("rejects saving", async () => {
    const resource = await createResourceSet().getResource(
      URI.createFileURI(writeUvl(source)),
      true,
    );
    await expect(resource?.save()).rejects.toThrow(/read-only/);
  });

  it("reports syntax errors with the file URI", async () => {
    const file = writeUvl(
      "features\n    Root\n        mandatory\n            A B C {{{\n",
    );
    await expect(
      createResourceSet().getResource(URI.createFileURI(file), true),
    ).rejects.toThrow(/Syntax error in UVL file/);
  });
});
