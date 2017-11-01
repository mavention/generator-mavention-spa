'use strict';

const fountain = require('fountain-generator');
const version = require('../../package.json').version;

module.exports = fountain.Base.extend({
  props: {
    framework: 'angular1',
    modules: 'webpack',
    js: 'typescript',
    ci: 'jenkins',
    css: 'scss',
    router: 'uirouter'
  },

  webconfig() {
    const prompts = [{
      when: !this.options.sample,
      type: 'input',
      name: 'tenantName',
      message: 'What is the tenant domainname of the app registration?'
    }, {
      when: !this.options.router,
      type: 'input',
      name: 'appId',
      message: 'What is the application id of the app registration?'
    }];

    return this.prompt(prompts).then(props => {
      Object.assign(this.props, props);
    });
  },

  configuring() {
    this.config.set('version', version);
    this.config.set('props', this.props);
    this.mergeJson('package.json', {
      dependencies: {
        '@uirouter/angularjs': '^1.0.10',
        'adal-angular': '^1.0.15',
        angular: '^1.6.6'
      },
      devDependencies: {
        '@types/adal': '^1.0.29',
        '@types/angular': '^1.6.36',
        '@types/angular-mocks': '^1.5.11',
        '@types/angular-ui-router': '^1.1.40',
        '@types/jquery': '^2.0.40',
        'angular-mocks': '^1.6.6',
        'gulp-angular-templatecache': '^2.0.0'
      }
    });
  },

  composing() {
    const options = {
      framework: this.props.framework,
      modules: this.props.modules,
      js: this.props.js,
      ci: this.props.ci,
      css: this.props.css,
      router: this.props.router,
      skipInstall: this.props.skipInstall,
      skipCache: this.props.skipCache
    };

    this.composeWith(require.resolve('generator-fountain-gulp/generators/app'), options);
  },

  writing() {
    const files = [
      'conf/browsersync-dist.conf.js',
      'conf/browsersync.conf.js',
      'conf/webpack-dist.conf.js',
      'conf/webpack.conf.js',
      'src/adalconfig.ts',
      'src/config.ts',
      'src/index.ts',
      'src/index.scss',
      'src/index.html',
      'src/frameRedirect.ts',
      'src/frameRedirect.html',
      'src/routes.ts',
      'src/app/about.ts',
      'src/app/about.spec.ts',
      'src/app/about.html',
      'src/app/hello.ts',
      'src/app/hello.spec.ts',
      'src/app/hello.html'
    ];

    files.forEach(file => {
      const templateUrl = file.replace(
        /^src\/(.*\/[^.]*).*$/,
        `$1.html`
      );
      this.copyTemplate(file, file, {templateUrl});
    });

    this.copyTemplate('src/web.config.js', 'src/web.config.js', {tenantName: this.props.tenantName, appId: this.props.appId});
  }
});
