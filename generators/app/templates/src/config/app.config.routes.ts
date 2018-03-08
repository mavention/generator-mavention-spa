import { StateProvider, UrlRouterProvider, StateDeclaration } from '@uirouter/angularjs';

/*
* Extends the ng.ui>IState provider to add the requierADLogin property in the StateProvider
*/
export interface IAdalState extends StateDeclaration {
  requireADLogin: boolean;
}

/** @ngInject */
export default function routesConfig($stateProvider: StateProvider, $urlRouterProvider: UrlRouterProvider, $locationProvider: ng.ILocationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      requireADLogin: false,
      component: 'home'
    } as IAdalState)
    .state('user', {
      url: '/user',
      requireADLogin: true,
      component: 'user'
    } as IAdalState)
    .state('about', {
      url: '/about',
      requireADLogin: false,
      component: 'about'
    } as IAdalState);
}
