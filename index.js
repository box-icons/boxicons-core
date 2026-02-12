const icons = require('./icons.json');

module.exports = {
  icons: icons.icons,
  metadata: {
    total: icons.total,
    packs: icons.packs
  },
  getPath: (name, pack = 'basic') => {
    return `svg/${pack}/${name}.svg`;
  }
};
