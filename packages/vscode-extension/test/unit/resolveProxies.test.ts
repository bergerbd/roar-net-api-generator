import { describe, expect, it } from "vitest";
import { type EClass, getProxyURI } from "@typemf/core";

import { resolveAllProxies } from "../../src/core/resolveProxies";
import { loadFixture } from "./fixtures";

describe("resolveAllProxies", () => {
  it("resolves references to Ecore data types in the API model", async () => {
    const { resourceSet, api } = await loadFixture([]);
    const lowerBound = (api.getEClassifier("Solution") as EClass)
      .getEOperations()
      .get(0);
    const proxy = lowerBound.getEType();
    expect(proxy && getProxyURI(proxy)).toBeDefined();

    expect(await resolveAllProxies(resourceSet)).toEqual([]);

    const resolved = lowerBound.getEType();
    expect(resolved && getProxyURI(resolved)).toBeUndefined();
    expect(lowerBound.getEType()?.getName()).toBe("EDouble");
  });

  it("resolves references from the API model to the variability metamodel", async () => {
    const { resourceSet, api } = await loadFixture([]);

    expect(await resolveAllProxies(resourceSet)).toEqual([]);

    const features = (api.getEClassifier("Solution") as EClass)
      .getEStructuralFeatures()
      .get(0);
    expect(features.getEType()?.getName()).toBe("Feature");
    expect(features.getEType()?.getEPackage()?.getNsURI()).toBe(
      "http://roar-net.com/variability",
    );
  });

  it("resolves mapping references to the loaded API and UVL objects", async () => {
    const { resourceSet, api, featureModel, mapping } = await loadFixture([
      [0, "bounded"],
    ]);

    expect(await resolveAllProxies(resourceSet)).toEqual([]);

    const entry = mapping.getMappings().get(0);
    const lowerBound = (api.getEClassifier("Solution") as EClass)
      .getEOperations()
      .get(0);
    const bounded = featureModel
      .getRoot()
      ?.getGroups()
      .get(0)
      .getFeatures()
      .get(1);
    expect(entry.getEcore()).toBe(lowerBound);
    expect(entry.getVariability()).toBe(bounded);
  });

  it("reports references that cannot be resolved", async () => {
    const { resourceSet } = await loadFixture([[0, "missing"]]);

    const unresolved = await resolveAllProxies(resourceSet);

    expect(unresolved).toHaveLength(1);
    expect(unresolved[0]).toMatchObject({
      owner: "Mapping",
      feature: "variability",
    });
    expect(unresolved[0]?.uri).toMatch(/model\.uvl#Feature_missing$/);
  });
});
