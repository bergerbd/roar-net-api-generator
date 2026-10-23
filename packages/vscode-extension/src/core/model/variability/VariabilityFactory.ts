import { EClass, EFactory, EObject } from '@typemf/core';
import { Feature } from './types/Feature.js';
import { FeatureModel } from './types/FeatureModel.js';
import { Group } from './types/Group.js';

export interface VariabilityFactory extends EFactory {
  createFeatureModel(): FeatureModel;
  createFeature(): Feature;
  createGroup(): Group;
  create(eClass: EClass): EObject;
}
