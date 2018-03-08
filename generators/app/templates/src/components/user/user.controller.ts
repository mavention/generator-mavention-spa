import 'angular-translate';
import { UserInfo } from 'adal-angular';
import { IAppRootScope } from '../../app.run';

export class UserComponentController implements ng.IController {
    $rootScope: IAppRootScope;
    $log: ng.ILogService;
    $translate: ng.translate.ITranslateService;
    adalAuthenticationService: any;

    description: String;
    data: String;

    constructor(
        $rootScope: IAppRootScope,
        $log: ng.ILogService,
        $translate: ng.translate.ITranslateService,
        adalAuthenticationService: any
    ) {
        'ngInject';
        this.$rootScope = $rootScope;
        this.$log = $log;
        this.$translate = $translate;
        this.adalAuthenticationService = adalAuthenticationService;
    }

    $onInit() {
        this.description = this.$translate.instant('User.Description');
        this.data = JSON.stringify(this.$rootScope.userInfo.profile, null, 2);
    }
}
