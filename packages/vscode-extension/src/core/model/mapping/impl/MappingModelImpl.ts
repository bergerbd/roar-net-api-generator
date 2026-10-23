import { BasicEList, EClass, EList, EObjectImpl, EStructuralFeature } from '@typemf/core';
import { getMappingPackageRef } from './MappingPackageRef.js';
import { Mapping } from '../types/Mapping.js';
import { MappingModel } from '../types/MappingModel.js';



export class MappingModelImpl extends EObjectImpl implements MappingModel {

  private _mappingsCache: BasicEList<Mapping> | undefined;

  private get _mappings(): BasicEList<Mapping> {
    this._mappingsCache ??= new BasicEList<Mapping>(this, getMappingPackageRef().getMappingModel_Mappings());
    return this._mappingsCache;
  }


  eClass(): EClass {
    return getMappingPackageRef().getMappingModel();
  }

  getMappings(): EList<Mapping> {
    return this._mappings;
  }

  eGet(feature: EStructuralFeature): unknown {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {
      case 0: return this._mappings;
      default:
        throw new Error(`MappingModel has no feature with id ${String(feature.getFeatureID())}`);
    }
  }

  eSet(feature: EStructuralFeature, value: unknown): void {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {
      case 0: {
        const list = this._mappings;
        const items = value === undefined || value === null ? [] : [...(value as Iterable<unknown>)];
        list.clear();
        for (const item of items) list.add(item as Mapping);
        return;
      }

      default:
        throw new Error(`MappingModel has no feature with id ${String(feature.getFeatureID())}`);
    }
  }
  eBasicSetValue(feature: EStructuralFeature | number, _value: unknown): void {
    const featureId = typeof feature === 'number' ? feature : feature.getFeatureID();
    switch (featureId) {
      default:
        throw new Error(`Feature ${String(featureId)} on MappingModel is many-valued or unknown.`);
    }
  }


  eIsSet(feature: EStructuralFeature): boolean {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {
      case 0: return this._mappingsCache !== undefined && this._mappingsCache.size() !== 0;
      default:
        throw new Error(`MappingModel has no feature with id ${String(feature.getFeatureID())}`);
    }
  }

  eUnset(feature: EStructuralFeature): void {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {
      case 0: this._mappingsCache?.clear(); return;

      default:
        throw new Error(`MappingModel has no feature with id ${String(feature.getFeatureID())}`);
    }
  }
}
