/* globals requirejs, require */

var TestLoader = function() {
};

TestLoader.prototype = {
  shouldLoadModule: function(moduleName) {
    return (moduleName.match(/[-_]test$/));
  },

  loadModules: function() {
    var moduleName;

    for (moduleName in requirejs.entries) {
      if (this.shouldLoadModule(moduleName)) {
        require(moduleName);
      }
    }
  }
};

TestLoader.load = function() {
  new TestLoader().loadModules();
};

//export default TestLoader;
TestLoader.load();