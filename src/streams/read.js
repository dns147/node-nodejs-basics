import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createReadStream } from 'node:fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'files/fileToRead.txt');

const read = async () => {
  const stream = createReadStream(filePath);

  stream.on('data', (data) => {
    const dataFile = Buffer.from(data);
    process.stdout.write(dataFile);
  });
};

await read();