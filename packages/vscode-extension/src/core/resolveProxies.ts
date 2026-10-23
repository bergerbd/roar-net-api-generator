import {
  type EList,
  type EObject,
  type EReference,
  type Resource,
  type ResourceSet,
  getProxyURI,
} from "@typemf/core";

/** A cross-reference that could not be resolved. */
export interface UnresolvedReference {
  /** Human-readable description of the object holding the reference. */
  owner: string;
  /** Name of the reference feature, e.g. `eType`. */
  feature: string;
  /** The proxy URI that could not be resolved. */
  uri: string;
  message: string;
}

/**
 * Replaces every proxy in the resource set by the object it stands for,
 * like EMF's `EcoreUtil.resolveAll()`. Templates render synchronously and
 * cannot resolve proxies on the fly, so this has to happen before rendering.
 *
 * Resources loaded while resolving are processed as well.
 *
 * @returns the references that could not be resolved; empty if all resolved.
 */
export async function resolveAllProxies(
  resourceSet: ResourceSet,
): Promise<UnresolvedReference[]> {
  const unresolved: UnresolvedReference[] = [];
  const processed = new Set<Resource>();

  // Resolving can load further resources, so re-read the list until every
  // resource has been processed.
  let pending = resourceSet.getResources();
  while (pending.length > 0) {
    for (const resource of pending) {
      processed.add(resource);
      await resolveResource(resourceSet, resource, unresolved);
    }
    pending = resourceSet.getResources().filter((r) => !processed.has(r));
  }

  return unresolved;
}

async function resolveResource(
  resourceSet: ResourceSet,
  resource: Resource,
  unresolved: UnresolvedReference[],
): Promise<void> {
  for (const root of resource.getContents()) {
    for (const obj of [root, ...root.eAllContents()]) {
      for (const reference of obj.eClass().getEAllReferences()) {
        if (!isResolvable(reference)) continue;
        await resolveReference(resourceSet, obj, reference, unresolved);
      }
    }
  }
}

/** Only plain, stored cross-references can hold proxies that we may replace. */
function isResolvable(reference: EReference): boolean {
  return (
    !reference.isContainment() &&
    !reference.isContainer() &&
    !reference.isDerived() &&
    reference.isChangeable()
  );
}

async function resolveReference(
  resourceSet: ResourceSet,
  obj: EObject,
  reference: EReference,
  unresolved: UnresolvedReference[],
): Promise<void> {
  const record = (proxy: EObject, err: unknown): void => {
    unresolved.push({
      owner: describe(obj),
      feature: reference.getName() ?? "?",
      uri: getProxyURI(proxy)?.toString() ?? "?",
      message: err instanceof Error ? err.message : String(err),
    });
  };

  if (!reference.isMany()) {
    const value = obj.eGet(reference) as EObject | undefined;
    if (value && getProxyURI(value)) {
      try {
        await resourceSet.resolveFeature(obj, reference);
      } catch (err) {
        record(value, err);
      }
    }
    return;
  }

  // ResourceSet.resolveFeature() does not handle many-valued features.
  const list = obj.eGet(reference) as EList<EObject>;
  for (let index = 0; index < list.size(); index++) {
    const item = list.get(index);
    if (!getProxyURI(item)) continue;
    try {
      const resolved = await resourceSet.resolve(item);
      list.removeAt(index);
      list.addAt(index, resolved);
    } catch (err) {
      record(item, err);
    }
  }
}

function describe(obj: EObject): string {
  const className = obj.eClass().getName() ?? "EObject";
  const name = (obj as { getName?: () => unknown }).getName?.();
  return typeof name === "string" ? `${className} '${name}'` : className;
}
