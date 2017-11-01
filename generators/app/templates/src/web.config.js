(function (window) {
  'use strict';

  window.__appConfig = window.__appConfig || {};

  // Tenant Url, example.onmicrosoft.com
  window.__appConfig.tenant = '<%- tenantName %>';

  // Application Id of the Azure AD App
  window.__appConfig.appId = '<%- appId %>';

  // Url of the API
  window.__appConfig.apiUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}(this));
