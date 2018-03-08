import * as angular from 'angular';
import * as translate from 'angular-translate';
import { AboutComponent } from './about.component';

export const AboutModule = angular
    .module('about', [
        'pascalprecht.translate',
    ])
    .component('about', AboutComponent)
    .name;
