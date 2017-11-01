import * as angular from 'angular';

import appConfig from './config';

import 'adal-angular/lib/adal-angular'; // angular library
import * as adal from 'adal'; // @types library

import adalConfig from './adalconfig';

import '@uirouter/angularjs'; // angular library
import '@uirouter/angularjs/release/stateEvents';
import * as uiRouter from 'angular-ui-router'; // @types library
import routesConfig from './routes';

export const app: string = 'app';

angular
.module(app, ['AdalAngular', 'ui.router', 'ui.router.state.events'])
  .constant('appConfig', appConfig)
  .config(adalConfig)
  .config(routesConfig);
