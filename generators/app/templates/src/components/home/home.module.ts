import * as angular from 'angular';
import * as translate from 'angular-translate';
import { HomeComponent } from './home.component';

export const HomeModule = angular
    .module('home', [
        'pascalprecht.translate',
    ])
    .component('home', HomeComponent)
    .name;
