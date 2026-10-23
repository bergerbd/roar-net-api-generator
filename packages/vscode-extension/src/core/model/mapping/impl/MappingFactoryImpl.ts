import { EClass, EFactoryImpl, EObject } from '@typemf/core';
import { MappingImpl } from './MappingImpl.js';
import { MappingModelImpl } from './MappingModelImpl.js';
import { getMappingPackageRef } from './MappingPackageRef.js';
import { MappingFactory } from '../MappingFactory.js';
import { Ids } from '../MappingPackage.js';
import { Mapping } from '../types/Mapping.js';
import { MappingModel } from '../types/MappingModel.js';


export class MappingFactoryImpl extends EFactoryImpl implements MappingFactory {
  /**
   * The factory instance, as EMF's `MappingFactory.eINSTANCE` (on the class, since
   * TypeScript interfaces have no statics). Reading it constructs the package if necessary.
   */
  static get eINSTANCE(): MappingFactory {
    return getMappingPackageRef().getEFactoryInstance() as MappingFactory;
  }

  createMappingModel(): MappingModel {
    return new MappingModelImpl();
  }
  createMapping(): Mapping {
    return new MappingImpl();
  }

  override create(eClass: EClass): EObject {
    switch (eClass.getClassifierID()) {
      case Ids.MappingModel.self:
        return this.createMappingModel();
      case Ids.Mapping.self:
        return this.createMapping();
      default:
        return super.create(eClass);
    }
  }
}
