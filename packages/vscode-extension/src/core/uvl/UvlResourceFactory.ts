import {
  type EObject,
  type EObjectSerializer,
  type Resource,
  type ResourceFactory,
  type ResourceFactoryRegistry,
  ResourceImpl,
  type URI,
} from "@typemf/core";
import { FeatureModel as UvlFeatureModel } from "uvl-parser";

import { VariabilityPackageImpl } from "../model/variability/impl/VariabilityPackageImpl";
import type { VariabilityFactory } from "../model/variability/VariabilityFactory";
import type { FeatureModel } from "../model/variability/types/FeatureModel";
import type { Feature } from "../model/variability/types/Feature";
import { FeatureType } from "../model/variability/types/FeatureType";
import type { Group } from "../model/variability/types/Group";
import { GroupKind } from "../model/variability/types/GroupKind";

/**
 * Creates resources that read UVL (Universal Variability Language) files
 * into instances of the `variability` metamodel. The format is read-only:
 * saving such a resource throws.
 */
export class UvlResourceFactory implements ResourceFactory {
  createResource(uri: URI): Resource {
    return new ResourceImpl(uri, new UvlSerializer());
  }
}

/** Registers the UVL format for the "uvl" file extension. */
export function registerUvlFormat(registry: ResourceFactoryRegistry): void {
  registry.registerForExtension("uvl", new UvlResourceFactory());
}

/**
 * Parses UVL text with `uvl-parser` and builds a single `FeatureModel` root
 * from the parse tree.
 */
export class UvlSerializer implements EObjectSerializer {
  serialize(_roots: EObject[], resource: Resource): Promise<Uint8Array> {
    return Promise.reject(
      new Error(
        `Cannot save '${resource.getURI().toString()}': the UVL format is read-only.`,
      ),
    );
  }

  deserialize(content: Uint8Array, resource: Resource): Promise<EObject[]> {
    const text = new TextDecoder("utf-8").decode(content);

    let parsed: UvlFeatureModel;
    try {
      parsed = new UvlFeatureModel(text);
    } catch (err) {
      return Promise.reject(toSyntaxError(err, resource.getURI()));
    }

    const factory =
      VariabilityPackageImpl.eINSTANCE.getEFactoryInstance() as VariabilityFactory;
    return Promise.resolve([toFeatureModel(factory, parsed)]);
  }

  peekReferencedNsURIs(_content: Uint8Array): Promise<string[]> {
    const nsURI = VariabilityPackageImpl.eINSTANCE.getNsURI();
    return Promise.resolve(nsURI !== undefined ? [nsURI] : []);
  }
}

function toSyntaxError(err: unknown, uri: URI): Error {
  const payload = (err as { payload?: { line?: number; column?: number } })
    .payload;
  const message = err instanceof Error ? err.message : String(err);
  const position =
    payload?.line !== undefined
      ? ` (line ${String(payload.line)}, column ${String(payload.column ?? 0)})`
      : "";
  return new Error(
    `Syntax error in UVL file '${uri.toString()}'${position}: ${message}`,
  );
}

/**
 * Minimal local typings for the parts of the ANTLR-generated UVL parse tree
 * that the reader below walks. `uvl-parser` exposes no public types for
 * these (only the `FeatureModel` wrapper is exported), so these describe
 * just the accessors actually used here.
 */
interface UvlTerminalNode {
  getText(): string;
}

interface UvlReferenceContext {
  getText(): string;
}

interface UvlFeatureTypeContext {
  getText(): string;
  BOOLEAN_KEY(): UvlTerminalNode | null;
}

interface UvlGroupSpecContext {
  feature(): UvlFeatureContext[];
}

/**
 * The parser creates one subclass of GroupContext per group kind, and each
 * subclass only defines the accessor for its own keyword token - hence the
 * optional members.
 */
interface UvlGroupContext {
  getText(): string;
  groupSpec(): UvlGroupSpecContext;
  MANDATORY?(): UvlTerminalNode | null;
  OPTIONAL?(): UvlTerminalNode | null;
  ALTERNATIVE?(): UvlTerminalNode | null;
  ORGROUP?(): UvlTerminalNode | null;
  CARDINALITY?(): UvlTerminalNode | null;
}

interface UvlFeatureContext {
  reference(): UvlReferenceContext;
  featureType(): UvlFeatureTypeContext | null;
  group(): UvlGroupContext[];
}

interface UvlFeaturesContext {
  feature(): UvlFeatureContext;
}

interface UvlFeatureModelContext {
  features(): UvlFeaturesContext | null;
}

function toFeatureModel(
  factory: VariabilityFactory,
  root: UvlFeatureModel,
): FeatureModel {
  const target: FeatureModel = factory.createFeatureModel();
  const tree = root.getFeatureModel() as UvlFeatureModelContext;

  const featuresCtx = tree.features();
  if (!featuresCtx) {
    throw new Error("UVL file does not declare a 'features' section.");
  }

  target.setRoot(toFeature(factory, featuresCtx.feature()));

  return target;
}

function toFeature(
  factory: VariabilityFactory,
  source: UvlFeatureContext,
): Feature {
  const feature = factory.createFeature();
  feature.setName(toFeatureName(source.reference().getText()));
  feature.setType(toFeatureType(source.featureType()));

  for (const groupCtx of source.group()) {
    feature.getGroups().add(toGroup(factory, groupCtx));
  }

  return feature;
}

/**
 * UVL names that are not plain identifiers (e.g. containing '-') are written
 * in double quotes; the quotes are not part of the name.
 */
function toFeatureName(text: string): string {
  return text.length >= 2 && text.startsWith('"') && text.endsWith('"')
    ? text.slice(1, -1)
    : text;
}

function toFeatureType(source: UvlFeatureTypeContext | null): FeatureType {
  // Features without an explicit type are Boolean in UVL.
  if (source?.BOOLEAN_KEY() !== null) {
    return FeatureType.BOOLEAN;
  }
  throw new Error(
    `Unsupported feature type '${source.getText()}': only boolean features are currently supported.`,
  );
}

function toGroup(factory: VariabilityFactory, source: UvlGroupContext): Group {
  const group = factory.createGroup();
  group.setKind(toGroupKind(source));

  for (const featureCtx of source.groupSpec().feature()) {
    group.getFeatures().add(toFeature(factory, featureCtx));
  }

  return group;
}

function toGroupKind(source: UvlGroupContext): GroupKind {
  if (source.MANDATORY) {
    return GroupKind.MANDATORY;
  } else if (source.OPTIONAL) {
    return GroupKind.OPTIONAL;
  } else if (source.ALTERNATIVE) {
    return GroupKind.ALTERNATIVE;
  } else if (source.ORGROUP) {
    return GroupKind.OR;
  } else if (source.CARDINALITY) {
    return GroupKind.CARDINALITY;
  }

  throw new Error(`Unrecognized group kind: '${source.getText()}'`);
}
