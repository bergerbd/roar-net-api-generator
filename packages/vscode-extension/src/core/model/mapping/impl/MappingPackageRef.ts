import type { MappingPackage } from '../MappingPackage.js';

/**
 * A reference to the MappingPackage singleton that every generated class of the package
 * reads instead of importing MappingPackageImpl, which would be a circular import: the
 * package constructs those classes while it constructs itself. This module only has a type
 * import, so it can be imported from anywhere.
 */
let ref: MappingPackage | undefined;

/** Constructs the package on first use; registered when MappingPackageImpl.ts is evaluated. */
let initializer: (() => void) | undefined;
let initializing = false;

export function setMappingPackageRef(pkg: MappingPackage): void {
  ref = pkg;
}

export function registerMappingPackageInitializer(init: () => void): void {
  initializer = init;
}

export function getMappingPackageRef(): MappingPackage {
  // `initializing` turns a reentrant call during construction into the error below.
  if (!ref && initializer && !initializing) {
    initializing = true;
    try {
      initializer();
    } finally {
      initializing = false;
    }
  }
  if (!ref) {
    throw new Error(
      'getMappingPackageRef() called before the MappingPackage singleton finished constructing itself, and no ' +
        'initializer was registered to construct it on demand - this means MappingPackageImpl.ts\'s own module ' +
        'was never evaluated at all (an unusual bundler/tree-shaking setup). Call MappingPackageImpl.eINSTANCE ' +
        'or .init() yourself first, or check that this package is marked side-effectful.'
    );
  }
  return ref;
}
