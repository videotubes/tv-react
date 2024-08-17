// fix "Bo"
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, './node_modules/@walletconnect/utils/dist/index.es.js');
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace(/import\s+Bo/g, 'import');
content = content.replace(/t\s*=\s*Bo/g, 't=Ei');
fs.writeFileSync(filePath, content, 'utf8');
