import { describe, expect, it } from "vitest";
import type { EClass } from "@typemf/core";

import { resolveAllProxies } from "../../src/core/resolveProxies";
import { createTemplateHelpers } from "../../src/core/templateHelpers";
import { loadFixture } from "./fixtures";

async function setUp() {
  // lowerBound → constructive, bounded; copy → constructive
  const fixture = await loadFixture([
    [0, "constructive"],
    [0, "bounded"],
    [1, "constructive"],
  ]);
  await resolveAllProxies(fixture.resourceSet);

  const solution = fixture.api.getEClassifier("Solution") as EClass;
  const features = fixture.featureModel
    .getRoot()
    ?.getGroups()
    .get(0)
    .getFeatures();
  if (!features) throw new Error("fixture has no features");
  return {
    helpers: createTemplateHelpers(fixture.mapping),
    api: fixture.api,
    solution,
    lowerBound: solution.getEOperations().get(0),
    copy: solution.getEOperations().get(1),
    constructive: features.get(0),
    bounded: features.get(1),
  };
}

describe("createTemplateHelpers", () => {
  it("featuresOf returns all features of an element in mapping order", async () => {
    const { helpers, lowerBound, copy, solution } = await setUp();

    expect(helpers.featuresOf(lowerBound).map((f) => f.getName())).toEqual([
      "constructive",
      "bounded",
    ]);
    expect(helpers.featuresOf(copy).map((f) => f.getName())).toEqual([
      "constructive",
    ]);
    expect(helpers.featuresOf(solution)).toEqual([]);
  });

  it("elementsOf returns all elements of a feature", async () => {
    const { helpers, constructive, bounded, lowerBound, copy } = await setUp();

    expect(helpers.elementsOf(constructive)).toEqual([lowerBound, copy]);
    expect(helpers.elementsOf(bounded)).toEqual([lowerBound]);
  });

  it("documentation returns the GenModel documentation", async () => {
    const { helpers, lowerBound, copy } = await setUp();

    expect(helpers.documentation(lowerBound)).toBe("Computes a lower bound.");
    expect(helpers.documentation(copy)).toBeUndefined();
  });

  it("isEClass distinguishes classes from data types", async () => {
    const { helpers, api, solution } = await setUp();

    expect(helpers.isEClass(solution)).toBe(true);
    expect(helpers.isEClass(api.getEClassifier("Seed"))).toBe(false);
  });
});
