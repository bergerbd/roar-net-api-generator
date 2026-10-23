import { EList, EObject } from '@typemf/core';
import { FeatureType } from './FeatureType.js';
import { Group } from './Group.js';



export interface Feature extends EObject {

  getName(): string | undefined;
  setName(value: string | undefined): void;

  getType(): FeatureType | undefined;
  setType(value: FeatureType | undefined): void;

  getGroups(): EList<Group>;

  getParent(): Group | undefined;
  setParent(value: Group | undefined): void;
}
