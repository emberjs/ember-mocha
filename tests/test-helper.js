import { setResolver, start } from 'ember-mocha2';
import resolver from './helpers/resolver';

setResolver(resolver);

start();
