import { EList, EObject } from '@typemf/core';
import { Mapping } from './Mapping.js';



export interface MappingModel extends EObject {

  getMappings(): EList<Mapping>;
}
