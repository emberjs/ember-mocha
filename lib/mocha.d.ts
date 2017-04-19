/// <reference types="mocha" />

declare module "mocha" {
  export = Mocha;
}

interface Mocha {
  mocha: mocha.mocha;
  describe: mocha.describe;
  context: mocha.context;
  it: mocha.it;
  before: mocha.before;
  beforeEach: mocha.beforeEach;
  after: mocha.after;
  afterEach: mocha.afterEach;
}
