import * as angular from 'angular';

import appConfig from './config/app.config';
import adalConfig from './config/app.config.adal';
import routeConfig from './config/app.config.routes';

import '@uirouter/core';
import '@uirouter/angularjs';

import 'adal-angular/lib/adal'; // adal library
import 'adal-angular/lib/adal-angular'; // adal-angular library
import * as adal from 'adal-angular'; // @types library

angular
  .module('app', [
    'AdalAngular',
    'ui.router'
  ])
  .constant('appConfig', appConfig)
  .config(adalConfig)
  .config(routeConfig);
