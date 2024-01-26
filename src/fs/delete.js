import * as fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { existsSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const deleteFilename = path.join(__dirname, 'files/fileToRemove.txt');

const remove = async () => {
  try {
    if (!existsSync(deleteFilename)) {
      throw new Error('FS operation failed');
    } else {
      fs.unlink(deleteFilename, (err) => {
        if (err) {
          throw err;
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

await remove();