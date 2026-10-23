import { EClass, EClassImpl, EcorePackageImpl, EPackageImpl, EReference, EReferenceImpl } from '@typemf/core';
import { MappingFactoryImpl } from './MappingFactoryImpl.js';
import { MappingImpl } from './MappingImpl.js';
import { MappingModelImpl } from './MappingModelImpl.js';
import { registerMappingPackageInitializer, setMappingPackageRef } from './MappingPackageRef.js';
import { MappingFactory } from '../MappingFactory.js';
import { Ids, MappingPackage } from '../MappingPackage.js';
import { VariabilityPackageImpl } from '../../variability/impl/VariabilityPackageImpl.js';







export class MappingPackageImpl extends EPackageImpl implements MappingPackage {
  private readonly _MappingModel: EClassImpl;
  private readonly _MappingModel_mappings: EReferenceImpl;
  private readonly _Mapping: EClassImpl;
  private readonly _Mapping_ecore: EReferenceImpl;
  private readonly _Mapping_variability: EReferenceImpl;

  private static _instance: MappingPackageImpl | undefined;

  /**
   * Constructs the package, if that hasn't happened yet, and returns it. To use your own factory
   * (e.g. one returning subclasses), call this with it before anything reads `eINSTANCE`; a
   * factory passed after construction is ignored with a warning.
   */
  static init(factory?: MappingFactory): MappingPackageImpl {
    if (!MappingPackageImpl._instance) {
      MappingPackageImpl._instance = new MappingPackageImpl();
      MappingPackageImpl._instance.setEFactoryInstance(factory ?? new MappingFactoryImpl());
    } else if (factory) {
      console.warn(
        'MappingPackageImpl.init() called again with a different factory after the singleton already ' +
          'existed - ignoring the new factory and keeping the existing one.'
      );
    }
    return MappingPackageImpl._instance;
  }

  static get eINSTANCE(): MappingPackageImpl {
    return MappingPackageImpl.init();
  }

  private constructor() {
    super();
    // Set first: constructing the classifiers below already needs the package reference.
    setMappingPackageRef(this);

    // Pass 1: create every classifier (empty shell - no features/supertypes
    // yet), so later passes can reference any of them regardless of
    // declaration order.
    this._MappingModel = new EClassImpl();
this._MappingModel.setName("MappingModel");

    this._MappingModel.setClassifierID(Ids.MappingModel.self);


this.getEClassifiers().add(this._MappingModel);

    this._Mapping = new EClassImpl();
this._Mapping.setName("Mapping");

    this._Mapping.setClassifierID(Ids.Mapping.self);


this.getEClassifiers().add(this._Mapping);


    // Pass 2: attributes/references, now that every classifier (including
    // ones referenced as a feature's eType) already exists.
    this._MappingModel_mappings = new EReferenceImpl();
this._MappingModel_mappings.setName("mappings");

this._MappingModel_mappings.setEType(this._Mapping);

this._MappingModel_mappings.setLowerBound(0);

this._MappingModel_mappings.setUpperBound(-1);

this._MappingModel_mappings.setDerived(false);

this._MappingModel_mappings.setTransient(false);

this._MappingModel_mappings.setVolatile(false);

this._MappingModel_mappings.setUnsettable(false);

this._MappingModel_mappings.setChangeable(true);

this._MappingModel_mappings.setOrdered(true);

this._MappingModel_mappings.setUnique(true);

    this._MappingModel_mappings.setFeatureID(Ids.MappingModel.mappings);
    this._MappingModel_mappings.setContainerClass(MappingModelImpl);
this._MappingModel_mappings.setEContainingClass(this._MappingModel);

this._MappingModel_mappings.setContainment(true);



this._MappingModel.getEStructuralFeatures().add(this._MappingModel_mappings);

    this._Mapping_ecore = new EReferenceImpl();
this._Mapping_ecore.setName("ecore");

this._Mapping_ecore.setEType(EcorePackageImpl.eINSTANCE.getEModelElement());

this._Mapping_ecore.setLowerBound(1);

this._Mapping_ecore.setUpperBound(1);

this._Mapping_ecore.setDerived(false);

this._Mapping_ecore.setTransient(false);

this._Mapping_ecore.setVolatile(false);

this._Mapping_ecore.setUnsettable(false);

this._Mapping_ecore.setChangeable(true);

this._Mapping_ecore.setOrdered(true);

this._Mapping_ecore.setUnique(true);

    this._Mapping_ecore.setFeatureID(Ids.Mapping.ecore);
    this._Mapping_ecore.setContainerClass(MappingImpl);
this._Mapping_ecore.setEContainingClass(this._Mapping);

this._Mapping_ecore.setContainment(false);



this._Mapping.getEStructuralFeatures().add(this._Mapping_ecore);

    this._Mapping_variability = new EReferenceImpl();
this._Mapping_variability.setName("variability");

this._Mapping_variability.setEType(VariabilityPackageImpl.eINSTANCE.getFeature());

this._Mapping_variability.setLowerBound(1);

this._Mapping_variability.setUpperBound(1);

this._Mapping_variability.setDerived(false);

this._Mapping_variability.setTransient(false);

this._Mapping_variability.setVolatile(false);

this._Mapping_variability.setUnsettable(false);

this._Mapping_variability.setChangeable(true);

this._Mapping_variability.setOrdered(true);

this._Mapping_variability.setUnique(true);

    this._Mapping_variability.setFeatureID(Ids.Mapping.variability);
    this._Mapping_variability.setContainerClass(MappingImpl);
this._Mapping_variability.setEContainingClass(this._Mapping);

this._Mapping_variability.setContainment(false);



this._Mapping.getEStructuralFeatures().add(this._Mapping_variability);


    // Pass 2.5: operations and their parameters, after every classifier and feature exists, since
    // their types can refer to any of them.

    // Pass 3: every classifier's owning package (self-referential, so must
    // come after pass 1 creates them all).
this._MappingModel.setEPackage(this);

this._Mapping.setEPackage(this);


    // Pass 4: supertypes.

    // Pass 4b: opposites. Set after all bootstrap adds, so those adds don't trigger inverse updates.
    // Opposites in another package are not emitted.


    // Pass 5: the package's own name, nsURI, nsPrefix and annotations, last: the setters used here
    // need the features built above.
    this.setName("mapping");
    this.setNsURI("http://roar-net.com/mapping");
    this.setNsPrefix("map");


  }

  getMappingModel(): EClass {
    return this._MappingModel;
  }
  getMappingModel_Mappings(): EReference {
    return this._MappingModel_mappings;
  }
  getMapping(): EClass {
    return this._Mapping;
  }
  getMapping_Ecore(): EReference {
    return this._Mapping_ecore;
  }
  getMapping_Variability(): EReference {
    return this._Mapping_variability;
  }
}

// Lets getMappingPackageRef() construct the package on first use.
registerMappingPackageInitializer(() => {
  void MappingPackageImpl.eINSTANCE;
});
