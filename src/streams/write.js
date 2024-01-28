import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createWriteStream } from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'files/fileToWrite.txt');

const write = async () => {
  const stream = createWriteStream(filePath);

  process.stdin.pipe(stream);
  process.stdin.resume();
};

await write();