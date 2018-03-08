(function (window) {
    'use strict';
  
    window.__appConfig = window.__appConfig || {};
  
    // Tenant Url, example.onmicrosoft.com
    window.__appConfig.tenant = 'TENANT';
  
    // Application Id of the Azure AD App
    window.__appConfig.appId = 'APP_ID';
  
    // Url of the API
    window.__appConfig.apiUrl = 'API_URL';
  }(this));
  