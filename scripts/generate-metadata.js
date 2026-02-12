const fs = require('fs');
const path = require('path');

const SVG_DIR = path.join(__dirname, '..', 'svg');
const OUTPUT_INDEX = path.join(__dirname, '..', 'index.js');
const OUTPUT_JSON = path.join(__dirname, '..', 'icons.json');

function getIcons(dir) {
  const fullPath = path.join(SVG_DIR, dir);
  if (!fs.existsSync(fullPath)) return [];
  return fs.readdirSync(fullPath)
    .filter(file => file.endsWith('.svg'))
    .map(file => file.replace(/\.svg$/, ''));
}

const basic = getIcons('basic');
const filled = getIcons('filled');
const brands = getIcons('brands');

const allIcons = [...new Set([...basic, ...filled, ...brands])].sort();

const metadata = {
  total: allIcons.length,
  packs: {
    basic: basic.length,
    filled: filled.length,
    brands: brands.length
  },
  icons: allIcons,
  details: {
    basic,
    filled,
    brands
  }
};

fs.writeFileSync(OUTPUT_JSON, JSON.stringify(metadata, null, 2));

const indexJs = `
const icons = require('./icons.json');

module.exports = {
  icons: icons.icons,
  metadata: {
    total: icons.total,
    packs: icons.packs
  },
  getPath: (name, pack = 'basic') => {
    return \`svg/\${pack}/\${name}.svg\`;
  }
};
`;

fs.writeFileSync(OUTPUT_INDEX, indexJs.trim() + '\n');

console.log('✅ Generated index.js and icons.json');
console.log(`📊 Total unique icons: ${allIcons.length}`);
