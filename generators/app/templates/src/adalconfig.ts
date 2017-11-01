import {IAppConfig} from './config';

export interface IAdalAuthenticationServiceProvider {
    init(configOptions: adal.Config, httpProvider: angular.IHttpProvider): void;
}

export class AppAdalConfig {
    public static factory() {
        const configFn = ($httpProvider, adalAuthenticationServiceProvider, appConfig) => new AppAdalConfig($httpProvider, adalAuthenticationServiceProvider, appConfig);

        configFn.$inject = ['$httpProvider', 'adalAuthenticationServiceProvider', 'appConfig'];

        return configFn;
    }

    constructor($httpProvider: ng.IHttpProvider, adalProvider: IAdalAuthenticationServiceProvider, appConfig: IAppConfig) {
        const sharePointUrl = 'https://' + appConfig.tenant.split('.', 1)[0] + '.sharepoint.com';
        const graphUrl = 'https://graph.microsoft.com';

        const endpoints = {};
        endpoints[sharePointUrl] = sharePointUrl;
        endpoints[graphUrl] = graphUrl;
        endpoints[appConfig.apiUrl.toString()] = appConfig.appId;

        const adalConfig = {
            clientId: appConfig.appId,
            endpoints,
            extraQueryParameter: 'nux=1',
            redirectUri: window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/frameRedirect.html',
            tenant: appConfig.tenant,
        } as adal.Config;

        adalProvider.init(adalConfig, $httpProvider);
    }
}

export default AppAdalConfig.factory();
