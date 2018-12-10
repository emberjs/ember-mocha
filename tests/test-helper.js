import { setResolver, start } from 'ember-mocha';
import resolver from './helpers/resolver';

setResolver(resolver);

start();
