'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the sublime ${chalk.red('generator-mavention-spa')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'appTitle',
        message: 'What is the title of the SPA?'
      },
      {
        type: 'input',
        name: 'tenantName',
        message: 'What is the tenant domainname of the app registration?'
      },
      {
        type: 'input',
        name: 'appId',
        message: 'What is the application id of the app registration?'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(this.templatePath('**/*'), this.destinationPath());
    this.fs.copy(this.templatePath('**/.*'), this.destinationPath());

    this.fs.copyTpl(
      this.templatePath('src/i18n/en_US.dictionary.ts'),
      this.destinationPath('src/i18n/en_US.dictionary.ts'),
      {
        appTitle: this.props.appTitle,
        appSubTitle: this.props.appSubTitle
      }
    );

    this.fs.copyTpl(
      this.templatePath('src/i18n/nl_NL.dictionary.ts'),
      this.destinationPath('src/i18n/nl_NL.dictionary.ts'),
      {
        appTitle: this.props.appTitle,
        appSubTitle: this.props.appSubTitle
      }
    );

    this.fs.copyTpl(
      this.templatePath('src/web.config.js'),
      this.destinationPath('src/web.config.js'),
      {
        tenantName: this.props.tenantName,
        appId: this.props.appId
      }
    );

    // Save the configuration
    this.config.set({
      appTitle: this.props.appTitle,
      tenantName: this.props.tenantName,
      appId: this.props.appId
    });

    this.config.save();
  }

  install() {
    this.installDependencies();
  }
};
