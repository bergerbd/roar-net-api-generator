import { EClass, EFactoryImpl, EObject } from '@typemf/core';
import { FeatureImpl } from './FeatureImpl.js';
import { FeatureModelImpl } from './FeatureModelImpl.js';
import { GroupImpl } from './GroupImpl.js';
import { getVariabilityPackageRef } from './VariabilityPackageRef.js';
import { VariabilityFactory } from '../VariabilityFactory.js';
import { Ids } from '../VariabilityPackage.js';
import { Feature } from '../types/Feature.js';
import { FeatureModel } from '../types/FeatureModel.js';
import { Group } from '../types/Group.js';


export class VariabilityFactoryImpl extends EFactoryImpl implements VariabilityFactory {
  /**
   * The factory instance, as EMF's `VariabilityFactory.eINSTANCE` (on the class, since
   * TypeScript interfaces have no statics). Reading it constructs the package if necessary.
   */
  static get eINSTANCE(): VariabilityFactory {
    return getVariabilityPackageRef().getEFactoryInstance() as VariabilityFactory;
  }

  createFeatureModel(): FeatureModel {
    return new FeatureModelImpl();
  }
  createFeature(): Feature {
    return new FeatureImpl();
  }
  createGroup(): Group {
    return new GroupImpl();
  }

  override create(eClass: EClass): EObject {
    switch (eClass.getClassifierID()) {
      case Ids.FeatureModel.self:
        return this.createFeatureModel();
      case Ids.Feature.self:
        return this.createFeature();
      case Ids.Group.self:
        return this.createGroup();
      default:
        return super.create(eClass);
    }
  }
}
