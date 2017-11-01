import * as angular from 'angular';
import 'angular-mocks';
import {about} from './about';

describe('about component', () => {
  beforeEach(() => {
    angular
      .module('maventionAbout', ['<%- templateUrl %>'])
      .component('maventionAbout', about);
    angular.mock.module('maventionAbout');
  });
  it('should render about mavention', angular.mock.inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    const element = $compile('<mavention-about>Loading...</mavention-about>')($rootScope);
    $rootScope.$digest();
    const h1 = element.find('h1');
    expect(h1.html()).toEqual('About Mavention!');
  }));
});
