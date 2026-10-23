import { EObject } from '@typemf/core';
import { Feature } from './Feature.js';



export interface FeatureModel extends EObject {

  getRoot(): Feature | undefined;
  setRoot(value: Feature | undefined): void;
}
