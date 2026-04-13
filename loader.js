
import fs from 'fs';
import path from 'path';
export function loadSimulationServer(id) {
  const filePath = path.join(process.cwd(),'simulations',`${id}.json`);
  return JSON.parse(fs.readFileSync(filePath,'utf-8'));
}
