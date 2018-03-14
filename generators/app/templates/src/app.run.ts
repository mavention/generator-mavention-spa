import { default as AdalAuthenticationService, UserInfo } from 'adal-angular';
import { StateService, StateParams } from '@uirouter/angularjs';
import GraphService from './services/graph.service';
import 'angular-translate';

export interface IAppRootScope extends ng.IRootScopeService {
    $state: StateService;
    $stateParams: StateParams;
    userInfo: UserInfo;
    pictureUrl: string;
    expandedMenu: boolean;
    appLanguage: string;

    login(): void;
    logout(): void;
    toggleMenu(): void;
    setLanguage(language: string): void;
}

/** @ngInject */
export default function appRun(
    $rootScope: IAppRootScope,
    $cookies: ng.cookies.ICookiesService,
    $translate: ng.translate.ITranslateService,
    $state: StateService,
    $stateParams: StateParams,
    $log: ng.ILogService,
    adalAuthenticationService: AdalAuthenticationService,
    graphService: GraphService
) {
    // it's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.For example,
    // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
    // to active whenever 'contacts.list' or one of its decendents is active.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    // adal login method
    $rootScope.login = () => {
        adalAuthenticationService.login();
    };

    // adal logout method
    $rootScope.logout = () => {
        adalAuthenticationService.logOut();
    };

    // catch Adal acquireTokenFailure event
    $rootScope.$on('adal:acquireTokenFailure', (event, errorDesc, error) => {
        if (error === 'login_required') {
            $log.warn('Aquire token failed, login required');
            adalAuthenticationService.clearCache();
        }
    });

    /*if (!$rootScope.userInfo.isAuthenticated) {
      adalAuthenticationService.login();
    }*/

    // get language settings and ply if not undefined
    $rootScope.appLanguage = $cookies.get('AppLanguage');

    if ($rootScope.appLanguage !== undefined) {
        $translate.use($rootScope.appLanguage);
    }

    $rootScope.setLanguage = (language) => {
        $translate.use(language).then((result) => {
            $rootScope.appLanguage = result;
            $cookies.put('AppLanguage', String($rootScope.appLanguage));
            $state.reload();
        }, (error) => {
            $log.warn(error);
        });
    };

    // get menu expand settings, default to true if undefined
    const menuExpand = $cookies.getObject('MenuExpanded');

    if (menuExpand === undefined) {
        $rootScope.expandedMenu = false;
    } else {
        $rootScope.expandedMenu = menuExpand as boolean;
    }

    // menu toggle method
    $rootScope.toggleMenu = () => {
        $rootScope.expandedMenu = !$rootScope.expandedMenu;
        $cookies.put('MenuExpanded', String($rootScope.expandedMenu));
    };

    // get user profile picture from Graph
    graphService.getPictureUrl().then((result) => {
        $rootScope.pictureUrl = result;
    }, (error) => {
        $rootScope.pictureUrl = require('./styles/images/person_placeholder.png');
        $log.warn(error);
    });
}
