import { BasicEList, EClass, EList, EObjectImpl, EStructuralFeature } from '@typemf/core';
import { getVariabilityPackageRef } from './VariabilityPackageRef.js';
import { Feature } from '../types/Feature.js';
import { Group } from '../types/Group.js';
import { GroupKind } from '../types/GroupKind.js';



export class GroupImpl extends EObjectImpl implements Group {

  private _kind: GroupKind | undefined;

  private _parent: Feature | undefined;

  private _featuresCache: BasicEList<Feature> | undefined;

  private get _features(): BasicEList<Feature> {
    this._featuresCache ??= new BasicEList<Feature>(this, getVariabilityPackageRef().getGroup_Features());
    return this._featuresCache;
  }


  eClass(): EClass {
    return getVariabilityPackageRef().getGroup();
  }

  getKind(): GroupKind | undefined {
    return this._kind;
  }
  setKind(value: GroupKind | undefined): void {
    this.eSet(getVariabilityPackageRef().getGroup_Kind(), value);
  }
  getParent(): Feature | undefined {
    return this._parent;
  }
  setParent(value: Feature | undefined): void {
    this.eSet(getVariabilityPackageRef().getGroup_Parent(), value);
  }
  getFeatures(): EList<Feature> {
    return this._features;
  }

  eGet(feature: EStructuralFeature): unknown {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {
      case 0: return this._kind;
      case 1: return this._parent;
      case 2: return this._features;
      default:
        throw new Error(`Group has no feature with id ${String(feature.getFeatureID())}`);
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
      case 2: {
        const list = this._features;
        const items = value === undefined || value === null ? [] : [...(value as Iterable<unknown>)];
        list.clear();
        for (const item of items) list.add(item as Feature);
        return;
      }

      default:
        throw new Error(`Group has no feature with id ${String(feature.getFeatureID())}`);
    }
  }
  eBasicSetValue(feature: EStructuralFeature | number, value: unknown): void {
    const featureId = typeof feature === 'number' ? feature : feature.getFeatureID();
    switch (featureId) {
      case 0: this._kind = value as GroupKind | undefined; return;
      case 1: this._parent = value as Feature | undefined; return;
      default:
        throw new Error(`Feature ${String(featureId)} on Group is many-valued or unknown.`);
    }
  }


  eIsSet(feature: EStructuralFeature): boolean {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {
      case 0: return this._kind !== undefined;
      case 1: return this._parent !== undefined;
      case 2: return this._featuresCache !== undefined && this._featuresCache.size() !== 0;
      default:
        throw new Error(`Group has no feature with id ${String(feature.getFeatureID())}`);
    }
  }

  eUnset(feature: EStructuralFeature): void {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {

      case 0: {
        const wasSet = this.eIsSet(feature);
        const oldValue = this._kind;
        this._kind = undefined;
        this.eDidRemove(feature, oldValue);
        this.eNotify({ eventType: 'UNSET', notifier: this, feature, oldValue, newValue: undefined, position: undefined, wasSet });
        return;
      }


      case 1: {
        const wasSet = this.eIsSet(feature);
        const oldValue = this._parent;
        this._parent = undefined;
        this.eDidRemove(feature, oldValue);
        this.eNotify({ eventType: 'UNSET', notifier: this, feature, oldValue, newValue: undefined, position: undefined, wasSet });
        return;
      }

      case 2: this._featuresCache?.clear(); return;

      default:
        throw new Error(`Group has no feature with id ${String(feature.getFeatureID())}`);
    }
  }
}
