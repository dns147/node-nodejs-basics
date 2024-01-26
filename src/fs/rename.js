import * as fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { existsSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const wrongFilename = path.join(__dirname, 'files/wrongFilename.txt');
const properFilename = path.join(__dirname, 'files/properFilename.md');

const rename = async () => {
  try {
    if (!existsSync(wrongFilename) || existsSync(properFilename)) {
      throw new Error('FS operation failed');
    } else {
      fs.rename(wrongFilename, properFilename, (err) => {
        if (err) {
          throw err;
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

await rename();