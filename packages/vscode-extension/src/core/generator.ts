import path from "node:path";

import nunjucks from "nunjucks";

import {
  EcorePackageImpl,
  EPackage,
  type ResourceSet,
  ResourceSetImpl,
  URI,
} from "@typemf/core";
import { NodeFileUriConverter } from "@typemf/node";
import { registerJsonFormat } from "@typemf/json";
import { registerXmiFormat } from "@typemf/xmi";

import { FeatureModel } from "./model/variability/types/FeatureModel";
import { isFeatureModel } from "./model/variability/util/VariabilityTypeGuards";
import { registerUvlFormat } from "./uvl/UvlResourceFactory";
import { ProjectConfig } from "./projectConfig";

import { MappingModel } from "./model/mapping/types/MappingModel";
import { MappingPackageImpl } from "./model/mapping/impl/MappingPackageImpl";
import { VariabilityPackageImpl } from "./model/variability/impl/VariabilityPackageImpl";
import { FileExtension } from "./nunjucks-env";
import { resolveAllProxies } from "./resolveProxies";
import { addTemplateHelpers, createTemplateHelpers } from "./templateHelpers";
import { ConsoleLogger, type Logger } from "./logger";
import { isMappingModel } from "./model/mapping/util/MappingTypeGuards";

/**
 * This function reads all models using the TypeMF library:
 *   config["api-model"] is an Ecore model to read
 *   config["variability-model"] is the variability model
 *   config["mapping-model"] the mapping of the variability model to the ecore model
 *
 * Then, for each entry of config["templates"], a separate Nunjucks
 *   environment renders `main.njk` from the template's folder. Templates see
 *   `api`, `variability` and `mapping`, their own options under `options`,
 *   and the helpers from `templateHelpers.ts`. All cross-model references
 *   are resolved before rendering; unresolved ones abort the generation. Files written with `{% file %}` land in
 *   `<output-folder>/<template name>`.
 *
 * All paths in the configuration are relative to `rootFolder`.
 *
 * The variability model is a UVL file, read through the UvlResourceFactory
 *   into an instance of the variability metamodel, so it lives in the same
 *   ResourceSet as the other models.
 *
 * @param config The configuration to use.
 */
export async function generateCode(
  rootFolder: string,
  config: ProjectConfig,
  logger: Logger = new ConsoleLogger(),
) {
  const resourceSet = createResourceSet();

  const apiModelPath = path.resolve(rootFolder, config["api-model"]);
  const apiModel = await loadAPIModel(logger, resourceSet, apiModelPath);

  const varModel = await loadVariabilityModel(
    logger,
    resourceSet,
    path.resolve(rootFolder, config["variability-model"]),
  );
  const mapModel = await loadMappingModel(
    logger,
    resourceSet,
    path.resolve(rootFolder, config["mapping-model"]),
  );

  logger.info("Resolving cross-model references.");
  const unresolved = await resolveAllProxies(resourceSet);
  if (unresolved.length > 0) {
    const details = unresolved
      .map((u) => `  ${u.owner}.${u.feature} -> ${u.uri}: ${u.message}`)
      .join("\n");
    throw new Error(
      `${String(unresolved.length)} unresolved reference(s):\n${details}`,
    );
  }

  const helpers = createTemplateHelpers(mapModel);
  const outputFolder = path.resolve(rootFolder, config["output-folder"]);
  for (const template of config.templates) {
    const templateFolder = path.resolve(rootFolder, template.folder);
    const templateOutput = path.join(outputFolder, template.template);
    logger.info(
      `Rendering template '${template.template}' from ${templateFolder} into ${templateOutput}.`,
    );

    const env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader(templateFolder),
      { autoescape: false },
    );
    env.addExtension("FileExtension", new FileExtension(templateOutput));
    addTemplateHelpers(env, helpers);

    env.render("main.njk", {
      api: apiModel,
      variability: varModel,
      mapping: mapModel,
      options: template.options,
    });
  }
}

/** A resource set that can read all model formats the generator uses. */
export function createResourceSet(): ResourceSet {
  const resourceSet = new ResourceSetImpl();
  // Each ResourceSet has its own package registry; without Ecore, loading
  // the .ecore API model fails ("No EPackage registered for namespace").
  resourceSet.getPackageRegistry().register(EcorePackageImpl.eINSTANCE);
  // Our metamodels: the API model may reference variability classes by
  // nsURI (e.g. API.features -> http://roar-net.com/variability#//Feature).
  resourceSet.getPackageRegistry().register(VariabilityPackageImpl.eINSTANCE);
  resourceSet.getPackageRegistry().register(MappingPackageImpl.eINSTANCE);
  resourceSet.getUriConverterRegistry().register(new NodeFileUriConverter());
  registerXmiFormat(resourceSet.getResourceFactoryRegistry());
  registerJsonFormat(resourceSet.getResourceFactoryRegistry());
  registerUvlFormat(resourceSet.getResourceFactoryRegistry());
  return resourceSet;
}

async function loadAPIModel(
  logger: Logger,
  resourceSet: ResourceSet,
  filename: string,
): Promise<EPackage> {
  logger.info(`Loading API model from ${filename}.`);

  const resource = await resourceSet.getResource(
    URI.createFileURI(filename),
    true,
  );
  const contents = resource?.getContents();
  if (!contents || contents.isEmpty()) {
    throw new Error(
      `API model '${filename}' does not contain a root EPackage.`,
    );
  }
  return contents.get(0) as EPackage;
}

async function loadVariabilityModel(
  logger: Logger,
  resourceSet: ResourceSet,
  filename: string,
): Promise<FeatureModel> {
  logger.info(`Loading variability model from ${filename}.`);

  const resource = await resourceSet.getResource(
    URI.createFileURI(filename),
    true,
  );
  const contents = resource?.getContents();
  const root = contents && !contents.isEmpty() ? contents.get(0) : undefined;
  if (!isFeatureModel(root)) {
    throw new Error(
      `Variability model '${filename}' does not have a FeatureModel root.`,
    );
  }
  return root;
}

async function loadMappingModel(
  logger: Logger,
  resourceSet: ResourceSet,
  filename: string,
): Promise<MappingModel> {
  logger.info(`Loading mapping model from ${filename}.`);

  const resource = await resourceSet.getResource(
    URI.createFileURI(filename),
    true,
  );
  const contents = resource?.getContents();
  if (!contents || contents.isEmpty()) {
    throw new Error(
      `Mapping model '${filename}' does not contain a root object.`,
    );
  }
  const root = contents.get(0);
  if (!isMappingModel(root)) {
    throw new Error(
      `Mapping model '${filename}' does not have a MappingModel root.`,
    );
  }
  return root;
}
