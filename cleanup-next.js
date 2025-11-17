#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

try {
  // Only remove lock file, don't kill any processes
  const lockFile = path.join(process.cwd(), '.next', 'dev', 'lock');
  if (fs.existsSync(lockFile)) {
    fs.unlinkSync(lockFile);
    console.log('Removed Next.js lock file');
  }
} catch (error) {
  // Silent fail - don't block dev server from starting
}
