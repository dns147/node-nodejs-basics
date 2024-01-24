import * as fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { existsSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'files/fresh.txt');

const create = async () => {
  try {
    if (existsSync(filePath)) {
      throw new Error('FS operation failed');
    } else {
      fs.appendFile(filePath, 'I am fresh and young');
    }
  } catch (error) {
    console.log(error);
  }
}

await create();