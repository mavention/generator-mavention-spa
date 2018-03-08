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
      this.templatePath('src/web.config.js'),
      this.destinationPath('src/web.config.js'),
      {
        tenantName: this.props.tenantName,
        appId: this.props.appId
      }
    );
  }

  install() {
    this.installDependencies();
  }
};
