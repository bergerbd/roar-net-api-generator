import {
  type EModelElement,
  type EObject,
  detailValue,
  isEClass,
} from "@typemf/core";
import type nunjucks from "nunjucks";

import type { MappingModel } from "./model/mapping/types/MappingModel";
import type { Feature } from "./model/variability/types/Feature";

const GENMODEL_SOURCE = "http://www.eclipse.org/emf/2002/GenModel";

/** Globals available to every template. */
export interface TemplateHelpers {
  /** The features an API element is mapped to, in mapping order. */
  featuresOf(element: EObject): Feature[];
  /** The API elements mapped to a feature, in mapping order. */
  elementsOf(feature: Feature): EModelElement[];
  /** The GenModel `documentation` annotation of an element, if any. */
  documentation(element: EModelElement): string | undefined;
  /** Whether a classifier is an EClass (and not a data type or enum). */
  isEClass(value: unknown): boolean;
}

/**
 * Builds the helpers from a mapping whose proxies are already resolved
 * (see `resolveAllProxies`), so the mapped objects are the very instances
 * templates get from the API and variability models.
 */
export function createTemplateHelpers(mapping: MappingModel): TemplateHelpers {
  const featuresByElement = new Map<EObject, Feature[]>();
  const elementsByFeature = new Map<Feature, EModelElement[]>();

  for (const entry of mapping.getMappings()) {
    const element = entry.getEcore();
    const feature = entry.getVariability();
    if (!element || !feature) continue;

    append(featuresByElement, element, feature);
    append(elementsByFeature, feature, element);
  }

  return {
    featuresOf: (element) => featuresByElement.get(element) ?? [],
    elementsOf: (feature) => elementsByFeature.get(feature) ?? [],
    documentation: (element) => {
      const annotation = element.getEAnnotation(GENMODEL_SOURCE);
      return annotation
        ? detailValue(annotation.getDetails(), "documentation")
        : undefined;
    },
    isEClass: (value) => isEClass(value),
  };
}

/** Registers the helpers as globals of a Nunjucks environment. */
export function addTemplateHelpers(
  env: nunjucks.Environment,
  helpers: TemplateHelpers,
): void {
  for (const [name, helper] of Object.entries(helpers)) {
    env.addGlobal(name, helper);
  }
}

function append<K, V>(map: Map<K, V[]>, key: K, value: V): void {
  const values = map.get(key);
  if (values) {
    values.push(value);
  } else {
    map.set(key, [value]);
  }
}
