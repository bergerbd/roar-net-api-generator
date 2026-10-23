import { EAttribute, EAttributeImpl, EClass, EClassImpl, EcorePackageImpl, EEnum, EEnumImpl, EEnumLiteralImpl, EPackageImpl, EReference, EReferenceImpl } from '@typemf/core';
import { FeatureImpl } from './FeatureImpl.js';
import { FeatureModelImpl } from './FeatureModelImpl.js';
import { GroupImpl } from './GroupImpl.js';
import { VariabilityFactoryImpl } from './VariabilityFactoryImpl.js';
import { registerVariabilityPackageInitializer, setVariabilityPackageRef } from './VariabilityPackageRef.js';
import { VariabilityFactory } from '../VariabilityFactory.js';
import { Ids, VariabilityPackage } from '../VariabilityPackage.js';







export class VariabilityPackageImpl extends EPackageImpl implements VariabilityPackage {
  private readonly _FeatureModel: EClassImpl;
  private readonly _FeatureModel_root: EReferenceImpl;
  private readonly _Feature: EClassImpl;
  private readonly _Feature_name: EAttributeImpl;
  private readonly _Feature_type: EAttributeImpl;
  private readonly _Feature_groups: EReferenceImpl;
  private readonly _Feature_parent: EReferenceImpl;
  private readonly _FeatureType: EEnumImpl;
  private readonly _Group: EClassImpl;
  private readonly _Group_kind: EAttributeImpl;
  private readonly _Group_parent: EReferenceImpl;
  private readonly _Group_features: EReferenceImpl;
  private readonly _GroupKind: EEnumImpl;

  private static _instance: VariabilityPackageImpl | undefined;

  /**
   * Constructs the package, if that hasn't happened yet, and returns it. To use your own factory
   * (e.g. one returning subclasses), call this with it before anything reads `eINSTANCE`; a
   * factory passed after construction is ignored with a warning.
   */
  static init(factory?: VariabilityFactory): VariabilityPackageImpl {
    if (!VariabilityPackageImpl._instance) {
      VariabilityPackageImpl._instance = new VariabilityPackageImpl();
      VariabilityPackageImpl._instance.setEFactoryInstance(factory ?? new VariabilityFactoryImpl());
    } else if (factory) {
      console.warn(
        'VariabilityPackageImpl.init() called again with a different factory after the singleton already ' +
          'existed - ignoring the new factory and keeping the existing one.'
      );
    }
    return VariabilityPackageImpl._instance;
  }

  static get eINSTANCE(): VariabilityPackageImpl {
    return VariabilityPackageImpl.init();
  }

  private constructor() {
    super();
    // Set first: constructing the classifiers below already needs the package reference.
    setVariabilityPackageRef(this);

    // Pass 1: create every classifier (empty shell - no features/supertypes
    // yet), so later passes can reference any of them regardless of
    // declaration order.
    this._FeatureModel = new EClassImpl();
this._FeatureModel.setName("FeatureModel");

    this._FeatureModel.setClassifierID(Ids.FeatureModel.self);


this.getEClassifiers().add(this._FeatureModel);

    this._Feature = new EClassImpl();
this._Feature.setName("Feature");

    this._Feature.setClassifierID(Ids.Feature.self);


this.getEClassifiers().add(this._Feature);

    this._FeatureType = new EEnumImpl();
this._FeatureType.setName("FeatureType");

    this._FeatureType.setClassifierID(Ids.FeatureType.self);
    {
      const literal = new EEnumLiteralImpl();
literal.setName("BOOLEAN");

literal.setValue(0);

literal.setLiteral("Boolean");




      this._FeatureType.getELiterals().add(literal);
    }


this.getEClassifiers().add(this._FeatureType);

    this._Group = new EClassImpl();
this._Group.setName("Group");

    this._Group.setClassifierID(Ids.Group.self);


this.getEClassifiers().add(this._Group);

    this._GroupKind = new EEnumImpl();
this._GroupKind.setName("GroupKind");

    this._GroupKind.setClassifierID(Ids.GroupKind.self);
    {
      const literal = new EEnumLiteralImpl();
literal.setName("MANDATORY");

literal.setValue(0);

literal.setLiteral("mandatory");




      this._GroupKind.getELiterals().add(literal);
    }
    {
      const literal = new EEnumLiteralImpl();
literal.setName("OPTIONAL");

literal.setValue(1);

literal.setLiteral("optional");




      this._GroupKind.getELiterals().add(literal);
    }
    {
      const literal = new EEnumLiteralImpl();
literal.setName("OR");

literal.setValue(2);

literal.setLiteral("or");




      this._GroupKind.getELiterals().add(literal);
    }
    {
      const literal = new EEnumLiteralImpl();
literal.setName("ALTERNATIVE");

literal.setValue(3);

literal.setLiteral("alternative");




      this._GroupKind.getELiterals().add(literal);
    }
    {
      const literal = new EEnumLiteralImpl();
literal.setName("CARDINALITY");

literal.setValue(4);

literal.setLiteral("cardinality");




      this._GroupKind.getELiterals().add(literal);
    }


this.getEClassifiers().add(this._GroupKind);


    // Pass 2: attributes/references, now that every classifier (including
    // ones referenced as a feature's eType) already exists.
    this._FeatureModel_root = new EReferenceImpl();
this._FeatureModel_root.setName("root");

this._FeatureModel_root.setEType(this._Feature);

this._FeatureModel_root.setLowerBound(0);

this._FeatureModel_root.setUpperBound(1);

this._FeatureModel_root.setDerived(false);

this._FeatureModel_root.setTransient(false);

this._FeatureModel_root.setVolatile(false);

this._FeatureModel_root.setUnsettable(false);

this._FeatureModel_root.setChangeable(true);

this._FeatureModel_root.setOrdered(true);

this._FeatureModel_root.setUnique(true);

    this._FeatureModel_root.setFeatureID(Ids.FeatureModel.root);
    this._FeatureModel_root.setContainerClass(FeatureModelImpl);
this._FeatureModel_root.setEContainingClass(this._FeatureModel);

this._FeatureModel_root.setContainment(true);



this._FeatureModel.getEStructuralFeatures().add(this._FeatureModel_root);

    this._Feature_name = new EAttributeImpl();
this._Feature_name.setName("name");

this._Feature_name.setEType(EcorePackageImpl.eINSTANCE.getEString());

this._Feature_name.setLowerBound(0);

this._Feature_name.setUpperBound(1);

this._Feature_name.setDerived(false);

this._Feature_name.setTransient(false);

this._Feature_name.setVolatile(false);

this._Feature_name.setUnsettable(false);

this._Feature_name.setChangeable(true);

this._Feature_name.setOrdered(true);

this._Feature_name.setUnique(true);

    this._Feature_name.setFeatureID(Ids.Feature.name);
    this._Feature_name.setContainerClass(FeatureImpl);
this._Feature_name.setEContainingClass(this._Feature);

this._Feature_name.setID(true);



this._Feature.getEStructuralFeatures().add(this._Feature_name);

    this._Feature_type = new EAttributeImpl();
this._Feature_type.setName("type");

this._Feature_type.setEType(this._FeatureType);

this._Feature_type.setLowerBound(0);

this._Feature_type.setUpperBound(1);

this._Feature_type.setDerived(false);

this._Feature_type.setTransient(false);

this._Feature_type.setVolatile(false);

this._Feature_type.setUnsettable(false);

this._Feature_type.setChangeable(true);

this._Feature_type.setOrdered(true);

this._Feature_type.setUnique(true);

    this._Feature_type.setFeatureID(Ids.Feature.type);
    this._Feature_type.setContainerClass(FeatureImpl);
this._Feature_type.setEContainingClass(this._Feature);



this._Feature.getEStructuralFeatures().add(this._Feature_type);

    this._Feature_groups = new EReferenceImpl();
this._Feature_groups.setName("groups");

this._Feature_groups.setEType(this._Group);

this._Feature_groups.setLowerBound(0);

this._Feature_groups.setUpperBound(-1);

this._Feature_groups.setDerived(false);

this._Feature_groups.setTransient(false);

this._Feature_groups.setVolatile(false);

this._Feature_groups.setUnsettable(false);

this._Feature_groups.setChangeable(true);

this._Feature_groups.setOrdered(true);

this._Feature_groups.setUnique(true);

    this._Feature_groups.setFeatureID(Ids.Feature.groups);
    this._Feature_groups.setContainerClass(FeatureImpl);
this._Feature_groups.setEContainingClass(this._Feature);

this._Feature_groups.setContainment(true);



this._Feature.getEStructuralFeatures().add(this._Feature_groups);

    this._Feature_parent = new EReferenceImpl();
this._Feature_parent.setName("parent");

this._Feature_parent.setEType(this._Group);

this._Feature_parent.setLowerBound(0);

this._Feature_parent.setUpperBound(1);

this._Feature_parent.setDerived(false);

this._Feature_parent.setTransient(false);

this._Feature_parent.setVolatile(false);

this._Feature_parent.setUnsettable(false);

this._Feature_parent.setChangeable(true);

this._Feature_parent.setOrdered(true);

this._Feature_parent.setUnique(true);

    this._Feature_parent.setFeatureID(Ids.Feature.parent);
    this._Feature_parent.setContainerClass(FeatureImpl);
this._Feature_parent.setEContainingClass(this._Feature);

this._Feature_parent.setContainment(false);



this._Feature.getEStructuralFeatures().add(this._Feature_parent);

    this._Group_kind = new EAttributeImpl();
this._Group_kind.setName("kind");

this._Group_kind.setEType(this._GroupKind);

this._Group_kind.setLowerBound(0);

this._Group_kind.setUpperBound(1);

this._Group_kind.setDerived(false);

this._Group_kind.setTransient(false);

this._Group_kind.setVolatile(false);

this._Group_kind.setUnsettable(false);

this._Group_kind.setChangeable(true);

this._Group_kind.setOrdered(true);

this._Group_kind.setUnique(true);

    this._Group_kind.setFeatureID(Ids.Group.kind);
    this._Group_kind.setContainerClass(GroupImpl);
this._Group_kind.setEContainingClass(this._Group);



this._Group.getEStructuralFeatures().add(this._Group_kind);

    this._Group_parent = new EReferenceImpl();
this._Group_parent.setName("parent");

this._Group_parent.setEType(this._Feature);

this._Group_parent.setLowerBound(0);

this._Group_parent.setUpperBound(1);

this._Group_parent.setDerived(false);

this._Group_parent.setTransient(false);

this._Group_parent.setVolatile(false);

this._Group_parent.setUnsettable(false);

this._Group_parent.setChangeable(true);

this._Group_parent.setOrdered(true);

this._Group_parent.setUnique(true);

    this._Group_parent.setFeatureID(Ids.Group.parent);
    this._Group_parent.setContainerClass(GroupImpl);
this._Group_parent.setEContainingClass(this._Group);

this._Group_parent.setContainment(false);



this._Group.getEStructuralFeatures().add(this._Group_parent);

    this._Group_features = new EReferenceImpl();
this._Group_features.setName("features");

this._Group_features.setEType(this._Feature);

this._Group_features.setLowerBound(0);

this._Group_features.setUpperBound(-1);

this._Group_features.setDerived(false);

this._Group_features.setTransient(false);

this._Group_features.setVolatile(false);

this._Group_features.setUnsettable(false);

this._Group_features.setChangeable(true);

this._Group_features.setOrdered(true);

this._Group_features.setUnique(true);

    this._Group_features.setFeatureID(Ids.Group.features);
    this._Group_features.setContainerClass(GroupImpl);
this._Group_features.setEContainingClass(this._Group);

this._Group_features.setContainment(true);



this._Group.getEStructuralFeatures().add(this._Group_features);


    // Pass 2.5: operations and their parameters, after every classifier and feature exists, since
    // their types can refer to any of them.

    // Pass 3: every classifier's owning package (self-referential, so must
    // come after pass 1 creates them all).
this._FeatureModel.setEPackage(this);

this._Feature.setEPackage(this);

this._FeatureType.setEPackage(this);

this._Group.setEPackage(this);

this._GroupKind.setEPackage(this);


    // Pass 4: supertypes.

    // Pass 4b: opposites. Set after all bootstrap adds, so those adds don't trigger inverse updates.
    // Opposites in another package are not emitted.
this._Feature_groups.setEOpposite(this._Group_parent);

this._Feature_parent.setEOpposite(this._Group_features);

this._Group_parent.setEOpposite(this._Feature_groups);

this._Group_features.setEOpposite(this._Feature_parent);



    // Pass 5: the package's own name, nsURI, nsPrefix and annotations, last: the setters used here
    // need the features built above.
    this.setName("variability");
    this.setNsURI("http://roar-net.com/variability");
    this.setNsPrefix("var");


  }

  getFeatureModel(): EClass {
    return this._FeatureModel;
  }
  getFeatureModel_Root(): EReference {
    return this._FeatureModel_root;
  }
  getFeature(): EClass {
    return this._Feature;
  }
  getFeature_Name(): EAttribute {
    return this._Feature_name;
  }
  getFeature_Type(): EAttribute {
    return this._Feature_type;
  }
  getFeature_Groups(): EReference {
    return this._Feature_groups;
  }
  getFeature_Parent(): EReference {
    return this._Feature_parent;
  }
  getFeatureType(): EEnum {
    return this._FeatureType;
  }
  getGroup(): EClass {
    return this._Group;
  }
  getGroup_Kind(): EAttribute {
    return this._Group_kind;
  }
  getGroup_Parent(): EReference {
    return this._Group_parent;
  }
  getGroup_Features(): EReference {
    return this._Group_features;
  }
  getGroupKind(): EEnum {
    return this._GroupKind;
  }
}

// Lets getVariabilityPackageRef() construct the package on first use.
registerVariabilityPackageInitializer(() => {
  void VariabilityPackageImpl.eINSTANCE;
});
