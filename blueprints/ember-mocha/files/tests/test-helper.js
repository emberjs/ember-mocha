import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-mocha';
import chai from 'chai';
import chaiDom from 'chai-dom';
chai.use(chaiDom);

setApplication(Application.create(config.APP));

start();
