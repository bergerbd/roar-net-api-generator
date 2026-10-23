import { EObject } from '@typemf/core';
import { getMappingPackageRef } from '../impl/MappingPackageRef.js';
import { Mapping } from '../types/Mapping.js';
import { MappingModel } from '../types/MappingModel.js';

/**
 * Type guards for the classifiers of the package. They check an object's class with
 * `isSuperTypeOf()`, so they also work for abstract classes, interfaces and dynamic objects,
 * unlike `instanceof`.
 */
function hasEClass(obj: unknown): obj is EObject {
  return obj !== null && typeof obj === 'object' && typeof (obj as { eClass?: unknown }).eClass === 'function';
}

export function isMappingModel(obj: unknown): obj is MappingModel {
  return hasEClass(obj) && getMappingPackageRef().getMappingModel().isSuperTypeOf(obj.eClass());
}
export function isMapping(obj: unknown): obj is Mapping {
  return hasEClass(obj) && getMappingPackageRef().getMapping().isSuperTypeOf(obj.eClass());
}
