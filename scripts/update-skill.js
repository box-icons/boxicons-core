const fs = require('fs');
const path = require('path');

const SKILL_FILE = path.join(__dirname, '..', 'SKILL.md');
const PACKAGE_FILE = path.join(__dirname, '..', 'package.json');
const ICONS_FILE = path.join(__dirname, '..', 'icons.json');

function updateSkillFile() {
  if (!fs.existsSync(ICONS_FILE) || !fs.existsSync(PACKAGE_FILE)) {
    console.error('❌ Missing icons.json or package.json');
    process.exit(1);
  }

  const iconsData = JSON.parse(fs.readFileSync(ICONS_FILE, 'utf8'));
  const packageData = JSON.parse(fs.readFileSync(PACKAGE_FILE, 'utf8'));
  let skillContent = fs.readFileSync(SKILL_FILE, 'utf8');

  const replacements = {
    'version': packageData.version,
    'total': iconsData.total.toLocaleString(),
    'basic': iconsData.packs.basic.toLocaleString(),
    'filled': iconsData.packs.filled.toLocaleString(),
    'brands': iconsData.packs.brands.toLocaleString(),
    'date': new Date().toISOString().split('T')[0]
  };

  let updated = false;

  // Replace comment placeholders: <!-- stats:key -->value<!-- stats:key -->
  for (const [key, value] of Object.entries(replacements)) {
    const regex = new RegExp(`<!-- stats:${key} -->.*?<!-- stats:${key} -->`, 'g');
    const newContent = `<!-- stats:${key} -->${value}<!-- stats:${key} -->`;
    
    if (skillContent.match(regex)) {
      if (skillContent.replace(regex, newContent) !== skillContent) {
        skillContent = skillContent.replace(regex, newContent);
        updated = true;
      }
    }
  }

  if (updated) {
    fs.writeFileSync(SKILL_FILE, skillContent);
    console.log('✅ Updated SKILL.md with latest stats');
  } else {
    console.log('✨ SKILL.md is already up to date');
  }
}

updateSkillFile();
