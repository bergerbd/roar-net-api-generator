import { EObject } from '@typemf/core';
import { getVariabilityPackageRef } from '../impl/VariabilityPackageRef.js';
import { Feature } from '../types/Feature.js';
import { FeatureModel } from '../types/FeatureModel.js';
import { Group } from '../types/Group.js';

/**
 * Type guards for the classifiers of the package. They check an object's class with
 * `isSuperTypeOf()`, so they also work for abstract classes, interfaces and dynamic objects,
 * unlike `instanceof`.
 */
function hasEClass(obj: unknown): obj is EObject {
  return obj !== null && typeof obj === 'object' && typeof (obj as { eClass?: unknown }).eClass === 'function';
}

export function isFeatureModel(obj: unknown): obj is FeatureModel {
  return hasEClass(obj) && getVariabilityPackageRef().getFeatureModel().isSuperTypeOf(obj.eClass());
}
export function isFeature(obj: unknown): obj is Feature {
  return hasEClass(obj) && getVariabilityPackageRef().getFeature().isSuperTypeOf(obj.eClass());
}
export function isGroup(obj: unknown): obj is Group {
  return hasEClass(obj) && getVariabilityPackageRef().getGroup().isSuperTypeOf(obj.eClass());
}
