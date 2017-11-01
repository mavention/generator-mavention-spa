export const about: angular.IComponentOptions = {
  template: require('./about.html'),
  controller: function () { // eslint-disable-line babel/object-shorthand
    this.about = 'About Mavention!';
  }
};
