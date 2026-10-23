import { EClass, EPackage, EReference } from '@typemf/core';


/** The classifier, feature and operation IDs; plain numbers, safe to import from anywhere. */
export const Ids = {
  MappingModel: { self: 0, mappings: 0 },
  Mapping: { self: 1, ecore: 0, variability: 1 },
} as const;


export interface MappingPackage extends EPackage {
  getMappingModel(): EClass;
  getMappingModel_Mappings(): EReference;
  getMapping(): EClass;
  getMapping_Ecore(): EReference;
  getMapping_Variability(): EReference;
}
