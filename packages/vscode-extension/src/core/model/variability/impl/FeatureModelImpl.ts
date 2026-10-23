import { EClass, EObjectImpl, EStructuralFeature } from '@typemf/core';
import { getVariabilityPackageRef } from './VariabilityPackageRef.js';
import { Feature } from '../types/Feature.js';
import { FeatureModel } from '../types/FeatureModel.js';



export class FeatureModelImpl extends EObjectImpl implements FeatureModel {

  private _root: Feature | undefined;


  eClass(): EClass {
    return getVariabilityPackageRef().getFeatureModel();
  }

  getRoot(): Feature | undefined {
    return this._root;
  }
  setRoot(value: Feature | undefined): void {
    this.eSet(getVariabilityPackageRef().getFeatureModel_Root(), value);
  }

  eGet(feature: EStructuralFeature): unknown {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {
      case 0: return this._root;
      default:
        throw new Error(`FeatureModel has no feature with id ${String(feature.getFeatureID())}`);
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
      default:
        throw new Error(`FeatureModel has no feature with id ${String(feature.getFeatureID())}`);
    }
  }
  eBasicSetValue(feature: EStructuralFeature | number, value: unknown): void {
    const featureId = typeof feature === 'number' ? feature : feature.getFeatureID();
    switch (featureId) {
      case 0: this._root = value as Feature | undefined; return;
      default:
        throw new Error(`Feature ${String(featureId)} on FeatureModel is many-valued or unknown.`);
    }
  }


  eIsSet(feature: EStructuralFeature): boolean {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {
      case 0: return this._root !== undefined;
      default:
        throw new Error(`FeatureModel has no feature with id ${String(feature.getFeatureID())}`);
    }
  }

  eUnset(feature: EStructuralFeature): void {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {

      case 0: {
        const wasSet = this.eIsSet(feature);
        const oldValue = this._root;
        this._root = undefined;
        this.eDidRemove(feature, oldValue);
        this.eNotify({ eventType: 'UNSET', notifier: this, feature, oldValue, newValue: undefined, position: undefined, wasSet });
        return;
      }

      default:
        throw new Error(`FeatureModel has no feature with id ${String(feature.getFeatureID())}`);
    }
  }
}
