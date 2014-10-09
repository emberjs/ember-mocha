import describeModule    from 'ember-mocha/describe-module';
import describeComponent from 'ember-mocha/describe-component';
import describeModel     from 'ember-mocha/describe-model';
import it                from 'ember-mocha/it';
import { setResolver }   from 'ember-test-helpers';

function globalize() {
  window.describeModule = describeModule;
  window.describeComponent = describeComponent;
  window.describeModel = describeModel;
  window.it = it;
  window.setResolver = setResolver;
}

export {
  globalize,
    describeModule,
    describeComponent,
    describeModel,
    it,
    setResolver
};