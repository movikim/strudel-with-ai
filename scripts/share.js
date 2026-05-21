const fs = require('fs');
const path = require('path');

// Get track path from command line arguments
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node scripts/share.js <relative-path-to-track-md>');
  console.log('Example: node scripts/share.js tracks/ILLENIUM/01-ashes-of-time.md');
  process.exit(0);
}

const trackRelativePath = args[0];
const trackAbsolutePath = path.resolve(process.cwd(), trackRelativePath);

if (!fs.existsSync(trackAbsolutePath)) {
  console.error(`Error: File not found at ${trackAbsolutePath}`);
  process.exit(1);
}

try {
  const content = fs.readFileSync(trackAbsolutePath, 'utf8');
  const codeBlockRegex = /```javascript([\s\S]*?)```/;
  const match = content.match(codeBlockRegex);

  if (!match) {
    console.error('Error: Could not find javascript code block in the markdown file.');
    process.exit(1);
  }

  const jsCode = match[1].trim();
  
  const LZString = require('lz-string');
  
  // Compress the code using LZString (matching official strudel.cc REPL URL sharing format)
  const compressedCode = LZString.compressToEncodedURIComponent(jsCode);
  
  // Generate the official Strudel REPL URL
  const strudelUrl = `https://strudel.cc/?code=${compressedCode}`;

  console.log('\n==================================================');
  console.log(`🎵 Track: ${path.basename(trackRelativePath, '.md').toUpperCase()}`);
  console.log('==================================================');
  console.log('You can open the link below to play this track directly on strudel.cc:\n');
  console.log(strudelUrl);
  console.log('\n==================================================\n');

} catch (err) {
  console.error('Error processing file:', err);
  process.exit(1);
}
