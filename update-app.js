// This script will help update the Plant ID application
const fs = require('fs');
const path = require('path');

// Define the file paths
const srcDir = path.resolve(__dirname, 'src');
const componentsDir = path.resolve(srcDir, 'components');
const servicesDir = path.resolve(srcDir, 'services');

// 1. Update the PlantIdentifier component to use updated services
try {
  // Read PlantIdentifier.tsx
  const plantIdentifierPath = path.resolve(componentsDir, 'PlantIdentifier.tsx');
  let content = fs.readFileSync(plantIdentifierPath, 'utf8');
  
  // Update import to use the updated plantService
  content = content.replace(
    `import { identifyPlant } from '../services/plantService';`,
    `import { identifyPlant } from '../services/plantServiceUpdated';`
  );
  
  // Write back the file
  fs.writeFileSync(plantIdentifierPath, content);
  console.log('✅ Updated PlantIdentifier.tsx successfully');
} catch (error) {
  console.error('❌ Error updating PlantIdentifier.tsx:', error);
}

// 2. Replace PlantResult with the updated version
try {
  // Copy PlantResultUpdated.tsx to PlantResult.tsx
  const sourcePath = path.resolve(componentsDir, 'PlantResultUpdated.tsx');
  const targetPath = path.resolve(componentsDir, 'PlantResult.tsx');
  
  // Check if the updated file exists
  if (fs.existsSync(sourcePath)) {
    // Read the updated content
    let content = fs.readFileSync(sourcePath, 'utf8');
    
    // Update the import to use the original PlantCard
    content = content.replace(
      `import { PlantInfo } from './PlantInfo';`,
      `import { PlantInfo } from './PlantCard';`
    );
    
    // Write to the target file
    fs.writeFileSync(targetPath, content);
    console.log('✅ Updated PlantResult.tsx successfully');
  } else {
    console.error('❌ PlantResultUpdated.tsx not found');
  }
} catch (error) {
  console.error('❌ Error updating PlantResult.tsx:', error);
}

// 3. Update plantService.ts to handle JSON responses correctly
try {
  // Read plantServiceUpdated.ts
  const sourcePath = path.resolve(servicesDir, 'plantServiceUpdated.ts');
  const targetPath = path.resolve(servicesDir, 'plantService.ts');
  
  if (fs.existsSync(sourcePath)) {
    // Read the updated content
    let content = fs.readFileSync(sourcePath, 'utf8');
    
    // Update the import
    content = content.replace(
      `import { PlantInfo } from '../components/PlantInfo';`,
      `import { PlantInfo } from '../components/PlantCard';`
    );
    
    // Write to the target file
    fs.writeFileSync(targetPath, content);
    console.log('✅ Updated plantService.ts successfully');
  } else {
    console.error('❌ plantServiceUpdated.ts not found');
  }
} catch (error) {
  console.error('❌ Error updating plantService.ts:', error);
}

console.log('🌱 Plant ID application update script completed');
