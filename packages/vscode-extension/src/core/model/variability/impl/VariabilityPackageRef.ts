import type { VariabilityPackage } from '../VariabilityPackage.js';

/**
 * A reference to the VariabilityPackage singleton that every generated class of the package
 * reads instead of importing VariabilityPackageImpl, which would be a circular import: the
 * package constructs those classes while it constructs itself. This module only has a type
 * import, so it can be imported from anywhere.
 */
let ref: VariabilityPackage | undefined;

/** Constructs the package on first use; registered when VariabilityPackageImpl.ts is evaluated. */
let initializer: (() => void) | undefined;
let initializing = false;

export function setVariabilityPackageRef(pkg: VariabilityPackage): void {
  ref = pkg;
}

export function registerVariabilityPackageInitializer(init: () => void): void {
  initializer = init;
}

export function getVariabilityPackageRef(): VariabilityPackage {
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
      'getVariabilityPackageRef() called before the VariabilityPackage singleton finished constructing itself, and no ' +
        'initializer was registered to construct it on demand - this means VariabilityPackageImpl.ts\'s own module ' +
        'was never evaluated at all (an unusual bundler/tree-shaking setup). Call VariabilityPackageImpl.eINSTANCE ' +
        'or .init() yourself first, or check that this package is marked side-effectful.'
    );
  }
  return ref;
}
