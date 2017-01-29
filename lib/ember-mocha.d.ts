/// <reference types="mocha" />

declare module "ember-mocha" {
  export = EmberMocha;
}

interface EmberMocha {
  setupTest(moduleName: string, options?: TestOptions),
  setupAcceptanceTest(unused: string, options: AcceptanceTestOptions),
  setupComponentTest(componentName: string, options?: ComponentTestOptions),
  setupModelTest(modelName: string, options?: TestOptions),

  setResolver(resolver: Resolver),

  /** @deprecated */
  describeModule: DescribeFn<TestOptions>,

  /** @deprecated */
  describeComponent: DescribeFn<ComponentTestOptions>,

  /** @deprecated */
  describeModel: DescribeFn<TestOptions>,

  /** @deprecated Import `it()` from `mocha` instead of `ember-mocha` */
  it: mocha.it,
}

interface TestOptions {
  needs?: string[];
}

interface ComponentTestOptions extends TestOptions {
  unit?: boolean;
  integration?: boolean;
}

interface AcceptanceTestOptions {
  Application: any;
}

interface Resolver {
  resolve(name: string): any;
}

interface DescribeFn<T> extends Function {
  (moduleName: string, callback: (this: DescribeFn<T>) => void): mocha.ISuite;
  (moduleName: string, options: T, callback: (this: DescribeFn<T>) => void): mocha.ISuite;
  (moduleName: string, description: string, options: T, callback: (this: DescribeFn<T>) => void): mocha.ISuite;

  only(moduleName: string, callback: (this: DescribeFn<T>) => void): mocha.ISuite;
  only(moduleName: string, options: T, callback: (this: DescribeFn<T>) => void): mocha.ISuite;
  only(moduleName: string, description: string, options: T, callback: (this: DescribeFn<T>) => void): mocha.ISuite;

  skip(moduleName: string, callback: (this: DescribeFn<T>) => void): void;
  skip(moduleName: string, options: T, callback: (this: DescribeFn<T>) => void): void;
  skip(moduleName: string, description: string, options: T, callback: (this: DescribeFn<T>) => void): void;

  timeout(ms: number): void;
}
