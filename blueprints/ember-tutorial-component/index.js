/* jshint node: true */
module.exports = {
  afterInstall() {
    return this.addBowerPackagesToProject([
      { name: 'tether', target: '1.4.0' }
    ]);
  }
};
