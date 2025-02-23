import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

// Prompt utility
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const ask = (question) => new Promise(resolve => rl.question(question, resolve));

// Protected paths
const PROTECTED_PATHS = [
  'src/types/',
  'src/lib/',
  'src/components/Header',
  'src/components/Footer',
  'src/components/FAQ',
  'src/components/ProductShowcase',
];

// Step 1: ESLint fix
console.log('Running ESLint to fix unused variables and imports...');
try {
  execSync('npx next lint --fix --quiet', { stdio: 'inherit' });
} catch (error) {
  console.log('ESLint fixed what it could; proceeding with export cleanup...');
}

// Step 2: Check unused exports
console.log('Checking for unused exports...');
let unusedOutput;
try {
  unusedOutput = execSync('npx ts-unused-exports tsconfig.json', { encoding: 'utf-8' });
  console.log('ts-unused-exports output:', unusedOutput || 'No unused exports found.');
} catch (error) {
  console.error('ts-unused-exports failed:', error.message);
  console.error('Command output:', error.stdout || 'No output');
  process.exit(1);
}

// Parse unused exports
const unusedLines = unusedOutput.split('\n').filter(line => line.includes('.ts'));
const filesToDelete = new Set();

for (const line of unusedLines) {
  const match = line.match(/^(.*?):/);
  if (!match) continue;
  const filePath = match[1];

  if (PROTECTED_PATHS.some(protectedPath => filePath.includes(protectedPath))) {
    console.log(`Skipping protected file: ${filePath}`);
    continue;
  }

  const fileName = path.basename(filePath, path.extname(filePath));
  const dynamicImportCheck = execSync(`grep -r "dynamic(() => import.*${fileName}" src/ || true`, { encoding: 'utf-8' });
  if (dynamicImportCheck) {
    console.log(`Skipping ${filePath} - potentially used in dynamic import: ${dynamicImportCheck.trim()}`);
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const exportLines = content.match(/export\s+(const|function|class|type|interface)/g) || [];
  const importLines = content.match(/import\s+.*?\s+from\s+['"].*?['"]/g) || [];

  if (exportLines.length === 0 || (exportLines.length === 1 && importLines.length === 0)) {
    const answer = await ask(`Delete fully unused file ${filePath}? (y/n): `);
    if (answer.toLowerCase() === 'y') {
      filesToDelete.add(filePath);
    }
  } else {
    console.log(`Skipping ${filePath} - still has active code.`);
  }
}

// Step 3: Delete files
filesToDelete.forEach(filePath => {
  console.log(`Deleting: ${filePath}`);
  fs.unlinkSync(filePath);
});

// Step 4: Clean empty dirs
const srcDir = path.resolve('src');
const cleanEmptyDirs = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      cleanEmptyDirs(fullPath);
      if (fs.readdirSync(fullPath).length === 0) {
        console.log(`Removing empty directory: ${fullPath}`);
        fs.rmdirSync(fullPath);
      }
    }
  });
};
cleanEmptyDirs(srcDir);

rl.close();
console.log('Cleanup complete! Check your git diff and test the app.');