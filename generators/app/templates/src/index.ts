import * as angular from 'angular'; // @types library

import 'angular-animate';
import 'angular-cookies';
import 'angular-resource';
import 'angular-sanitize';

import 'adal-angular/lib/adal'; // adal library
import 'adal-angular/lib/adal-angular'; // adal-angular library

import '@uirouter/core';
import '@uirouter/angularjs';

import 'angular-translate';
import 'angular-moment';

import 'bootstrap';
import 'angular-bootstrap';

// importing config functions
import appConfig from './config/app.config';
import adalConfig from './config/app.config.adal';
import routeConfig from './config/app.config.routes';
import translateConfig from './config/app.config.translate';

// importing modules
import { HomeModule } from './components/home/home.module';
import { UserModule } from './components/user/user.module';
import { AboutModule } from './components/about/about.module';

// importing services
import GraphService from './services/graph.service';

// import styles
import './styles/index.scss';

import appRun from './app.run';

angular.module('app', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'AdalAngular',
  'angularMoment',
  'pascalprecht.translate',
  'ui.router',
  // modules
  HomeModule,
  UserModule,
  AboutModule,
])
  .constant('appConfig', appConfig)
  .config(adalConfig)
  .config(routeConfig)
  .config(translateConfig)
  .service('graphService', GraphService)
  .run(appRun);
