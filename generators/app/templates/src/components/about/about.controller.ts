import 'angular-translate';

export class AboutComponentController implements ng.IController {
    $log: ng.ILogService;
    $translate: ng.translate.ITranslateService;

    description: String;

    constructor(
        $log: ng.ILogService,
        $translate: ng.translate.ITranslateService
    ) {
        'ngInject';
        this.$log = $log;
        this.$translate = $translate;
    }

    $onInit() {
        this.description = this.$translate.instant('About.Description');
    }
}

