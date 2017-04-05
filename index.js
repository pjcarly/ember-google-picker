/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-google-picker',
  isDevelopingAddon: function () {
    return true;
  },
  treeForTemplates: function () {
    return new Funnel(this.project.root + '/node_modules/'+this.name+'/app', {
      include: ['**/*.hbs'],

      getDestinationPath: function (relativePath) {
        if (relativePath.indexOf('/template.hbs') !== -1) {
          // Remove ".template" from the path, eg: pods/posts/template.hbs => templates/posts.hbs
          return relativePath.substr(0, relativePath.lastIndexOf('/')) + '.hbs';
        } else {
          return relativePath;
        }
      }
    });
  }
};
