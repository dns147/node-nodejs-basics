import * as fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { copyFile, existsSync, mkdir, readdir } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dirPath = path.join(__dirname, 'files');
const dirCopyPath = path.join(__dirname, 'files_copy');

const eventError = (err) => {
  if (err) {
    throw err;
  }
};

const copyFiles = (file) => {
  const fileSrcPath = path.join(dirPath, file);
  const fileDestPath = path.join(dirCopyPath, file);

  copyFile(fileSrcPath, fileDestPath, eventError);
};

const copy = async () => {
  try {
    if (!existsSync(dirPath) || existsSync(dirCopyPath)) {
      throw new Error('FS operation failed');
    } else {
      mkdir(dirCopyPath, eventError);
      readdir(dirPath, (err, files) => {
        if (err) {
          throw err;
        }
                
        files.forEach(copyFiles);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

await copy();
