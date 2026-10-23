import { BasicEList, EClass, EList, EObjectImpl, EStructuralFeature } from '@typemf/core';
import { getVariabilityPackageRef } from './VariabilityPackageRef.js';
import { Feature } from '../types/Feature.js';
import { FeatureType } from '../types/FeatureType.js';
import { Group } from '../types/Group.js';



export class FeatureImpl extends EObjectImpl implements Feature {

  private _name: string | undefined;

  private _type: FeatureType | undefined;

  private _groupsCache: BasicEList<Group> | undefined;

  private get _groups(): BasicEList<Group> {
    this._groupsCache ??= new BasicEList<Group>(this, getVariabilityPackageRef().getFeature_Groups());
    return this._groupsCache;
  }

  private _parent: Group | undefined;


  eClass(): EClass {
    return getVariabilityPackageRef().getFeature();
  }

  getName(): string | undefined {
    return this._name;
  }
  setName(value: string | undefined): void {
    this.eSet(getVariabilityPackageRef().getFeature_Name(), value);
  }
  getType(): FeatureType | undefined {
    return this._type;
  }
  setType(value: FeatureType | undefined): void {
    this.eSet(getVariabilityPackageRef().getFeature_Type(), value);
  }
  getGroups(): EList<Group> {
    return this._groups;
  }
  getParent(): Group | undefined {
    return this._parent;
  }
  setParent(value: Group | undefined): void {
    this.eSet(getVariabilityPackageRef().getFeature_Parent(), value);
  }

  eGet(feature: EStructuralFeature): unknown {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {
      case 0: return this._name;
      case 1: return this._type;
      case 2: return this._groups;
      case 3: return this._parent;
      default:
        throw new Error(`Feature has no feature with id ${String(feature.getFeatureID())}`);
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
        const list = this._groups;
        const items = value === undefined || value === null ? [] : [...(value as Iterable<unknown>)];
        list.clear();
        for (const item of items) list.add(item as Group);
        return;
      }

      case 3: {
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
        throw new Error(`Feature has no feature with id ${String(feature.getFeatureID())}`);
    }
  }
  eBasicSetValue(feature: EStructuralFeature | number, value: unknown): void {
    const featureId = typeof feature === 'number' ? feature : feature.getFeatureID();
    switch (featureId) {
      case 0: this._name = value as string | undefined; return;
      case 1: this._type = value as FeatureType | undefined; return;
      case 3: this._parent = value as Group | undefined; return;
      default:
        throw new Error(`Feature ${String(featureId)} on Feature is many-valued or unknown.`);
    }
  }


  eIsSet(feature: EStructuralFeature): boolean {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {
      case 0: return this._name !== undefined;
      case 1: return this._type !== undefined;
      case 2: return this._groupsCache !== undefined && this._groupsCache.size() !== 0;
      case 3: return this._parent !== undefined;
      default:
        throw new Error(`Feature has no feature with id ${String(feature.getFeatureID())}`);
    }
  }

  eUnset(feature: EStructuralFeature): void {
    this.requireOwnFeature(feature);
    switch (feature.getFeatureID()) {

      case 0: {
        const wasSet = this.eIsSet(feature);
        const oldValue = this._name;
        this._name = undefined;
        this.eDidRemove(feature, oldValue);
        this.eNotify({ eventType: 'UNSET', notifier: this, feature, oldValue, newValue: undefined, position: undefined, wasSet });
        return;
      }


      case 1: {
        const wasSet = this.eIsSet(feature);
        const oldValue = this._type;
        this._type = undefined;
        this.eDidRemove(feature, oldValue);
        this.eNotify({ eventType: 'UNSET', notifier: this, feature, oldValue, newValue: undefined, position: undefined, wasSet });
        return;
      }

      case 2: this._groupsCache?.clear(); return;


      case 3: {
        const wasSet = this.eIsSet(feature);
        const oldValue = this._parent;
        this._parent = undefined;
        this.eDidRemove(feature, oldValue);
        this.eNotify({ eventType: 'UNSET', notifier: this, feature, oldValue, newValue: undefined, position: undefined, wasSet });
        return;
      }

      default:
        throw new Error(`Feature has no feature with id ${String(feature.getFeatureID())}`);
    }
  }
}
