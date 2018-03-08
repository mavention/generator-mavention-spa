export interface IAppConfig {
    tenant: string;
    appId: string;
    apiUrl: URL;
    clientId: string;
    scmConfigured: boolean;
    scmTriggerEnabled: boolean;
    autoFillConfigurationLocation: boolean;
    itemQueueListTitle: string;
    batchQueueListTitle: string;
    configurationListTitle: string;
    language: string;
}

function loadAppConfig() {
    const appConfig = {} as IAppConfig;

    // import variables if present (from Web.config.js)
    if (window) {
        Object.assign(appConfig, (window as any).__appConfig);
    }

    return appConfig;
}

export default loadAppConfig();
