import 'angular-translate';
import { UserInfo } from 'adal-angular';
import { IAppRootScope } from '../../app.run';

export class UserComponentController implements ng.IController {
    description: String;
    data: String;

    /** @ngInject */
    constructor(
        private $rootScope: IAppRootScope,
        private $log: ng.ILogService,
        private $translate: ng.translate.ITranslateService,
        private adalAuthenticationService: any
    ) { }

    $onInit() {
        this.description = this.$translate.instant('User.Description');
        this.data = JSON.stringify(this.$rootScope.userInfo.profile, null, 2);
    }
}
