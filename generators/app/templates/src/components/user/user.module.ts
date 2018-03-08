import * as angular from 'angular';
import * as translate from 'angular-translate';
import { UserComponent } from './user.component';

export const UserModule = angular
    .module('user', [
        'pascalprecht.translate',
    ])
    .component('user', UserComponent)
    .name;
