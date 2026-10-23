import { EClass, EFactory, EObject } from '@typemf/core';
import { Mapping } from './types/Mapping.js';
import { MappingModel } from './types/MappingModel.js';

export interface MappingFactory extends EFactory {
  createMappingModel(): MappingModel;
  createMapping(): Mapping;
  create(eClass: EClass): EObject;
}
