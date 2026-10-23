import { EObject } from '@typemf/core';
import { Ids } from '../VariabilityPackage.js';
import { Feature } from '../types/Feature.js';
import { FeatureModel } from '../types/FeatureModel.js';
import { Group } from '../types/Group.js';

export abstract class VariabilitySwitch<T> {
  doSwitch(eObject: EObject): T | undefined {
    switch (eObject.eClass().getClassifierID()) {
      case Ids.FeatureModel.self: {
        // FeatureModel
        const result1 = this.caseFeatureModel(eObject as FeatureModel);
        if (result1 !== undefined) return result1;
        return this.defaultCase(eObject);
      }
      case Ids.Feature.self: {
        // Feature
        const result1 = this.caseFeature(eObject as Feature);
        if (result1 !== undefined) return result1;
        return this.defaultCase(eObject);
      }
      case Ids.Group.self: {
        // Group
        const result1 = this.caseGroup(eObject as Group);
        if (result1 !== undefined) return result1;
        return this.defaultCase(eObject);
      }
      default:
        return this.defaultCase(eObject);
    }
  }
  caseFeatureModel(_object: FeatureModel): T | undefined {
    return undefined;
  }
  caseFeature(_object: Feature): T | undefined {
    return undefined;
  }
  caseGroup(_object: Group): T | undefined {
    return undefined;
  }

  defaultCase(_object: EObject): T | undefined {
    return undefined;
  }
}
