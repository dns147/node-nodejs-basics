
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'files/fileToCalculateHashFor.txt');

const calculateHash = async () => {
  const hash = createHash('sha256').setEncoding('hex');
  //const hash = createHash('sha256').update(content).digest('hex'); 

  createReadStream(filePath)
    .pipe(hash)
    .on('finish', function() {
      const fileHash = hash.read();
      const stream = new WritableStream({
        write(chunk) {
          console.log(chunk);
        },
      });

      stream.getWriter().write(fileHash);
    });
};

await calculateHash();