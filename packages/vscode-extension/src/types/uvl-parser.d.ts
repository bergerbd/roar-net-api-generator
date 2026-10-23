declare module "uvl-parser" {
  export class FeatureModel {
    constructor(pathOrSource: string);
    getFeatureModel(): unknown;
    toString(): string;
  }
}
