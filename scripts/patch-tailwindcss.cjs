const fs = require('fs');
const path = require('path');

function patchTailwindFile(filePath) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes("'(deep|slotted|global)'")) {
      content = content.replace(/'\(deep\|slotted\|global\)'/g, "'(deep|slotted|global|highlight)'");
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Patched Lightning CSS warning filter in', filePath);
    }
  }
}

function patchNextThemesFile(filePath) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('createElement("script",{') && !content.includes('createElement("script",{async:!0,')) {
      content = content.replace(/createElement\("script",\{/g, 'createElement("script",{async:!0,');
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Patched next-themes React 19 script tag in', filePath);
    }
  }
}

function findAndPatch(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node' && dir.endsWith('@tailwindcss')) {
        const dist = path.join(fullPath, 'dist');
        patchTailwindFile(path.join(dist, 'index.mjs'));
        patchTailwindFile(path.join(dist, 'index.js'));
      } else if (entry.name === 'next-themes') {
        const dist = path.join(fullPath, 'dist');
        patchNextThemesFile(path.join(dist, 'index.mjs'));
        patchNextThemesFile(path.join(dist, 'index.js'));
      } else {
        findAndPatch(fullPath);
      }
    }
  }
}

const nodeModules = path.join(__dirname, '..', 'node_modules');
findAndPatch(nodeModules);
