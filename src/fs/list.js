import * as fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { existsSync, readdir } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dirPath = path.join(__dirname, 'files');

const list = async () => {
  try {
    if (!existsSync(dirPath)) {
      throw new Error('FS operation failed');
    } else {
      readdir(dirPath, (err, files) => {
        if (err) {
          throw err;
        }
                
        console.log(files);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

await list();