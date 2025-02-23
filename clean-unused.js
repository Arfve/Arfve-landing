import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Step 1: Run ESLint to fix unused variables/imports
console.log('Running ESLint to fix unused variables and imports...');
try {
  execSync('npx next lint --fix', { stdio: 'inherit' });
} catch (error) {
  console.error('ESLint failed:', error.message);
  process.exit(1);
}

// Step 2: Find and remove unused exports
console.log('Checking for unused exports...');
let unusedOutput;
try {
  unusedOutput = execSync('npx ts-unused-exports tsconfig.json', { encoding: 'utf-8' });
} catch (error) {
  console.error('ts-unused-exports failed:', error.message);
  process.exit(1);
}

// Parse unused exports output
const unusedLines = unusedOutput.split('\n').filter(line => line.includes('.ts')); // Lines with file paths
const filesToDelete = new Set();

unusedLines.forEach(line => {
  const match = line.match(/^(.*?):/); // Extract file path before colon
  if (match) {
    const filePath = match[1];
    console.log(`Found unused export in: ${filePath}`);

    // Check if the file has no remaining exports after removal
    const content = fs.readFileSync(filePath, 'utf-8');
    const exportLines = content.match(/export\s+(const|function|class|type|interface)/g) || [];
    const importLines = content.match(/import\s+.*?\s+from\s+['"].*?['"]/g) || [];

    // If the file only has unused exports and no imports, mark for deletion
    if (exportLines.length === 0 || (exportLines.length === 1 && importLines.length === 0)) {
      filesToDelete.add(filePath);
    } else {
      console.log(`Skipping ${filePath} - still has active code.`);
    }
  }
});

// Step 3: Delete fully unused files
filesToDelete.forEach(filePath => {
  console.log(`Deleting fully unused file: ${filePath}`);
  fs.unlinkSync(filePath);
});

// Step 4: Clean up empty directories
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

console.log('Cleanup complete! Check your git diff and test the app.');