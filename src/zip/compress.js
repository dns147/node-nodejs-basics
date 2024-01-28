import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileSource  = path.join(__dirname, 'files/fileToCompress.txt');
const fileDest  = path.join(__dirname, 'files/archive.gz');

const compress = async () => {
  const gzip = createGzip();
  const source = createReadStream(fileSource);
  const destination = createWriteStream(fileDest);

  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.error(err);
      process.exitCode = 1;
    }
  });
};

await compress();