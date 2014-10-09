document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

Ember.Test.adapter = Ember.Test.MochaAdapter.create();
mocha.setup('bdd');

$(document).ready(function(){
  mocha.checkLeaks();
  mocha.globals([
    'visit',
    'click',
    'keyEvent',
    'fillIn',
    'find',
    'findWithAssert',
    'wait',
    'andThen',
    'triggerEvent',
    'LiveReload',
    'currentRouteName',
    'currentPath',
    'currentURL',
    '__PROMISE_INSTRUMENTATION__'
  ]);
  mocha.run();
});
