import translations from '../i18n/translations';
import { IAppConfig } from './app.config';

export interface ITranslateRootScope extends ng.IRootScopeService {
    appLanguage: string;
    setLanguage(language: string): void;
}

/** @ngInject */
export default function translateConfig($translateProvider: ng.translate.ITranslateProvider, appConfig: IAppConfig) {
    // add translation table
    $translateProvider
        .translations('en', translations.en)
        .translations('nl', translations.nl)
        .fallbackLanguage('en')
        // enable escaping of HTML
        .useSanitizeValueStrategy('sanitize')
        // try to find out preferred language by yourself
        .determinePreferredLanguage();
        // .preferredLanguage('en');

}

