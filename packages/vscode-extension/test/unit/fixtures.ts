import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

import { type EPackage, type ResourceSet, URI } from "@typemf/core";

import { createResourceSet } from "../../src/core/generator";
import type { MappingModel } from "../../src/core/model/mapping/types/MappingModel";
import type { FeatureModel } from "../../src/core/model/variability/types/FeatureModel";

const API = `<?xml version="1.0" encoding="UTF-8"?>
<ecore:EPackage xmi:version="2.0" xmlns:xmi="http://www.omg.org/XMI"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:ecore="http://www.eclipse.org/emf/2002/Ecore" name="api" nsURI="http://example.org/api" nsPrefix="api">
  <eClassifiers xsi:type="ecore:EClass" name="Solution">
    <eStructuralFeatures xsi:type="ecore:EReference" name="features" upperBound="-1"
        eType="ecore:EClass http://roar-net.com/variability#//Feature"/>
    <eOperations name="lowerBound" lowerBound="1" eType="ecore:EDataType http://www.eclipse.org/emf/2002/Ecore#//EDouble">
      <eAnnotations source="http://www.eclipse.org/emf/2002/GenModel">
        <details key="documentation" value="Computes a lower bound."/>
      </eAnnotations>
    </eOperations>
    <eOperations name="copy" lowerBound="1" eType="#//Solution"/>
  </eClassifiers>
  <eClassifiers xsi:type="ecore:EDataType" name="Seed" instanceClassName="long"/>
</ecore:EPackage>
`;

const UVL = `features
    Root
        optional
            constructive
            bounded
`;

/** One mapping entry: operation index in `Solution` → feature name. */
export type MappingEntry = [operation: number, feature: string];

function mappingJson(dir: string, entries: MappingEntry[]): string {
  const base = URI.createFileURI(dir).toString();
  return JSON.stringify(
    {
      $namespaces: {
        map: "http://roar-net.com/mapping",
        ecore: "http://www.eclipse.org/emf/2002/Ecore",
      },
      $roots: [
        {
          $eClass: { namespace: "map", name: "MappingModel" },
          mappings: entries.map(([operation, feature]) => ({
            $eClass: { namespace: "map", name: "Mapping" },
            ecore: {
              $ref: `${base}/api.ecore#//@eClassifiers.0/@eOperations.${String(operation)}`,
              $eClass: { namespace: "ecore", name: "EOperation" },
            },
            variability: { $ref: `${base}/model.uvl#Feature_${feature}` },
          })),
        },
      ],
    },
    null,
    2,
  );
}

export interface Fixture {
  resourceSet: ResourceSet;
  api: EPackage;
  featureModel: FeatureModel;
  mapping: MappingModel;
}

/**
 * Writes a small API model, UVL model and mapping to a temp folder and loads
 * them the way the generator does (proxies are left unresolved).
 */
export async function loadFixture(entries: MappingEntry[]): Promise<Fixture> {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "generator-fixture-"));
  fs.writeFileSync(path.join(dir, "api.ecore"), API);
  fs.writeFileSync(path.join(dir, "model.uvl"), UVL);
  fs.writeFileSync(path.join(dir, "mapping.json"), mappingJson(dir, entries));

  const resourceSet = createResourceSet();

  const load = async <T>(name: string): Promise<T> => {
    const resource = await resourceSet.getResource(
      URI.createFileURI(path.join(dir, name)),
      true,
    );
    return resource?.getContents().get(0) as T;
  };

  return {
    resourceSet,
    api: await load<EPackage>("api.ecore"),
    featureModel: await load<FeatureModel>("model.uvl"),
    mapping: await load<MappingModel>("mapping.json"),
  };
}
