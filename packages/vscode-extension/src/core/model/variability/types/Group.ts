import { EList, EObject } from '@typemf/core';
import { Feature } from './Feature.js';
import { GroupKind } from './GroupKind.js';



export interface Group extends EObject {

  getKind(): GroupKind | undefined;
  setKind(value: GroupKind | undefined): void;

  getParent(): Feature | undefined;
  setParent(value: Feature | undefined): void;

  getFeatures(): EList<Feature>;
}
