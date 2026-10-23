import { EModelElement, EObject } from '@typemf/core';
import { Feature } from '../../variability/types/Feature.js';



export interface Mapping extends EObject {

  getEcore(): EModelElement | undefined;
  setEcore(value: EModelElement | undefined): void;

  getVariability(): Feature | undefined;
  setVariability(value: Feature | undefined): void;
}
