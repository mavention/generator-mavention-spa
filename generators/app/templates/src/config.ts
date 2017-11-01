export interface IAppConfig {
    tenant: string;
    appId: string;
    apiUrl: URL;
}

export class AppConfig {
    public static factory() {
        const appConfig = {} as IAppConfig;

        // import variables if present (from Web.config.js)
        if (window) {
            Object.assign(appConfig, (window as any).__appConfig);
        }

        return appConfig;
    }
}

export default AppConfig.factory();
