export default routesConfig;

export interface IAdalState extends angular.ui.IState {
  requireADLogin: boolean;
}

/** @ngInject */
function routesConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $locationProvider: angular.ILocationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      requireADLogin: false,
      component: 'app'
    } as IAdalState)
    .state('about', {
      url: '/about',
      requireADLogin: true,
      component: 'about'
    } as IAdalState);
}