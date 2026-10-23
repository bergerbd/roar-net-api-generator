import { EClass, EModelElement, EObjectImpl, EStructuralFeature } from '@typemf/core';
import { getMappingPackageRef } from './MappingPackageRef.js';
import { Mapping } from '../types/Mapping.js';
import { Feature } from '../../variability/types/Feature.js';



export class MappingImpl extends EObjectImpl implements Mapping {

  private _ecore: EModelElement | undefined;

  private _variability: Feature | undefined;


  eClass(): EClass {
    return getMappingPackageRef().getMapping();
  }

  getEcore(): EModelElement | undefined {
    return this._ecore;
  }
  setEcore(value: EModelElement | undefined): void {
    this.eSet(getMappingPackageRef().getMapping_Ecore(), value);
  }
  getVariability(): Feature | undefined {
    return this._variability;
  }
  setVariability(value: Feature | undefined): void {
    this.eSet(getMappingPackageRef().getMapping_Variability(), value);
  }

  eGet(feature: EStructuralFeature): unknown {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {
      case 0: return this._ecore;
      case 1: return this._variability;
      default:
        throw new Error(`Mapping has no feature with id ${String(feature.getFeatureID())}`);
    }
  }

  eSet(feature: EStructuralFeature, value: unknown): void {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {
      case 0: {
        const oldValue = this.eGet(feature);
        if (oldValue === value) return;
        const wasSet = this.eIsSet(feature);
        this.eBasicSetValue(feature, value);
        this.eDidRemove(feature, oldValue);
        this.eDidAdd(feature, value);
        this.eNotify({ eventType: 'SET', notifier: this, feature, oldValue, newValue: value, position: undefined, wasSet });
        return;
      }
      case 1: {
        const oldValue = this.eGet(feature);
        if (oldValue === value) return;
        const wasSet = this.eIsSet(feature);
        this.eBasicSetValue(feature, value);
        this.eDidRemove(feature, oldValue);
        this.eDidAdd(feature, value);
        this.eNotify({ eventType: 'SET', notifier: this, feature, oldValue, newValue: value, position: undefined, wasSet });
        return;
      }
      default:
        throw new Error(`Mapping has no feature with id ${String(feature.getFeatureID())}`);
    }
  }
  eBasicSetValue(feature: EStructuralFeature | number, value: unknown): void {
    const featureId = typeof feature === 'number' ? feature : feature.getFeatureID();
    switch (featureId) {
      case 0: this._ecore = value as EModelElement | undefined; return;
      case 1: this._variability = value as Feature | undefined; return;
      default:
        throw new Error(`Feature ${String(featureId)} on Mapping is many-valued or unknown.`);
    }
  }


  eIsSet(feature: EStructuralFeature): boolean {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {
      case 0: return this._ecore !== undefined;
      case 1: return this._variability !== undefined;
      default:
        throw new Error(`Mapping has no feature with id ${String(feature.getFeatureID())}`);
    }
  }

  eUnset(feature: EStructuralFeature): void {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {

      case 0: {
        const wasSet = this.eIsSet(feature);
        const oldValue = this._ecore;
        this._ecore = undefined;
        this.eDidRemove(feature, oldValue);
        this.eNotify({ eventType: 'UNSET', notifier: this, feature, oldValue, newValue: undefined, position: undefined, wasSet });
        return;
      }


      case 1: {
        const wasSet = this.eIsSet(feature);
        const oldValue = this._variability;
        this._variability = undefined;
        this.eDidRemove(feature, oldValue);
        this.eNotify({ eventType: 'UNSET', notifier: this, feature, oldValue, newValue: undefined, position: undefined, wasSet });
        return;
      }

      default:
        throw new Error(`Mapping has no feature with id ${String(feature.getFeatureID())}`);
    }
  }
}
