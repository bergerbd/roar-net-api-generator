import { EObject } from '@typemf/core';
import { Ids } from '../MappingPackage.js';
import { Mapping } from '../types/Mapping.js';
import { MappingModel } from '../types/MappingModel.js';

export abstract class MappingSwitch<T> {
  doSwitch(eObject: EObject): T | undefined {
    switch (eObject.eClass().getClassifierID()) {
      case Ids.MappingModel.self: {
        // MappingModel
        const result1 = this.caseMappingModel(eObject as MappingModel);
        if (result1 !== undefined) return result1;
        return this.defaultCase(eObject);
      }
      case Ids.Mapping.self: {
        // Mapping
        const result1 = this.caseMapping(eObject as Mapping);
        if (result1 !== undefined) return result1;
        return this.defaultCase(eObject);
      }
      default:
        return this.defaultCase(eObject);
    }
  }
  caseMappingModel(_object: MappingModel): T | undefined {
    return undefined;
  }
  caseMapping(_object: Mapping): T | undefined {
    return undefined;
  }

  defaultCase(_object: EObject): T | undefined {
    return undefined;
  }
}
