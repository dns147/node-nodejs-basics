import * as fs from 'node:fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createReadStream, existsSync } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'files/fileToRead.txt');

const read = async () => {
  try {
    if (!existsSync(filePath)) {
      throw new Error('FS operation failed');
    } else {
      const stream = createReadStream(filePath);

      stream.on('data', (data) => {
        const dataFile = Buffer.from(data);
        process.stdout.write(dataFile); // 1-ый способ вывода
        //console.log(dataFile.toString()); // 2-ой способ вывода
      });
    }
  } catch (error) {
    console.log(error);
  }
};

await read();