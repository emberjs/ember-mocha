export default class EmberTestContext {
  constructor(mochaContext) {
    this.element = null;
    this.mochaContext = mochaContext;
  }

  unknownProperty(key) {
    return this.mochaContext[key];
  }

  setUnknownProperty(key, value) {
    this.defineOnMochaContext(key);
    this.mochaContext[key] = value;
    return value;
  }

  syncProperties() {
    const ignoredProperties = [
      'mochaContext',
      'unknownProperty',
      'setUnknownProperty',
      'defineOnMochaContext',
      'syncProperties'
    ];
    for (const key in this) {
      if (!ignoredProperties.includes(key)) { this.defineOnMochaContext(key); }
    }
  }

  defineOnMochaContext(key) {
    const emberContext = this;
    if (typeof this[key] === 'function') {
      this.mochaContext[key] = function() { return emberContext[key].apply(emberContext, arguments); };
    } else {
      Object.defineProperty(this.mochaContext, key, {
        configurable: true,
        enumerable: true,
        get() { return emberContext[key]; },
        set(value) { emberContext[key] = value; }
      });
    }
  }
}
