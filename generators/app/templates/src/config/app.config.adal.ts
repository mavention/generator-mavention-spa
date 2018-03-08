import { AuthenticationContextOptions, UserInfo } from 'adal-angular'; // @types library
import { IAppConfig } from './app.config';

export interface IAdalAuthenticationServiceProvider {
    init(authenticationContextOptions: AuthenticationContextOptions, httpProvider: angular.IHttpProvider): void;
}

/** @ngInject */
export default function adalConfig($httpProvider: ng.IHttpProvider, adalAuthenticationServiceProvider: IAdalAuthenticationServiceProvider, appConfig: IAppConfig) {
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
    } as AuthenticationContextOptions;

    adalAuthenticationServiceProvider.init(adalConfig, $httpProvider);
}

