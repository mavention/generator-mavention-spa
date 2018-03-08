import { IAppConfig } from '../config/app.config';

export default class GraphService {
    /** @ngInject */
    constructor(
        private $http: ng.IHttpService,
        private $q: ng.IQService,
        private $log: ng.ILogService,
        private appConfig: IAppConfig,
    ) {}

    public getPictureUrl(): ng.IPromise<string> {
        const deffered = this.$q.defer<string>();

        const req = {
            method: 'GET',
            url: 'https://graph.microsoft.com/v1.0/me/Photo/$value',
            responseType: 'blob',
            cache: true,
            headers: { 'Content-Type': 'application/json' },
        };

        this.$http(req).then((result) => {
            const url = window.URL || (window as any).webkitURL;
            deffered.resolve(url.createObjectURL(result.data));
        }, (err) => {
            deffered.reject('An error occurred while retrieving the profile picture.');
        });

        return deffered.promise;
    }
}
