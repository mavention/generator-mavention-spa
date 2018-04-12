import 'angular-translate';

export class AboutComponentController implements ng.IController {
    description: String;

    /** @ngInject */
    constructor(
        private $log: ng.ILogService,
        private $translate: ng.translate.ITranslateService
    ) { }

    $onInit() {
        this.description = this.$translate.instant('About.Description');
    }
}

