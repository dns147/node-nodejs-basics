import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileSource  = path.join(__dirname, 'files/archive.gz');
const fileDest  = path.join(__dirname, 'files/fileToCompress.txt');

const decompress = async () => {
  const gunzip = createGunzip();
  const source = createReadStream(fileSource);
  const destination = createWriteStream(fileDest);

  source.pipe(gunzip);

  gunzip.on('data', (data) => {
    const dataFile = Buffer.from(data);

    destination.write(dataFile.toString());
  });
};

await decompress();