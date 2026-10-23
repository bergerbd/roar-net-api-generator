import { EAttribute, EClass, EEnum, EPackage, EReference } from '@typemf/core';


/** The classifier, feature and operation IDs; plain numbers, safe to import from anywhere. */
export const Ids = {
  FeatureModel: { self: 0, root: 0 },
  Feature: { self: 1, name: 0, type: 1, groups: 2, parent: 3 },
  FeatureType: { self: 2 },
  Group: { self: 3, kind: 0, parent: 1, features: 2 },
  GroupKind: { self: 4 },
} as const;


export interface VariabilityPackage extends EPackage {
  getFeatureModel(): EClass;
  getFeatureModel_Root(): EReference;
  getFeature(): EClass;
  getFeature_Name(): EAttribute;
  getFeature_Type(): EAttribute;
  getFeature_Groups(): EReference;
  getFeature_Parent(): EReference;
  getFeatureType(): EEnum;
  getGroup(): EClass;
  getGroup_Kind(): EAttribute;
  getGroup_Parent(): EReference;
  getGroup_Features(): EReference;
  getGroupKind(): EEnum;
}
