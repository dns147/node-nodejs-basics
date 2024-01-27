import { createServer } from 'http';
import { release, version } from 'os';
import path, { dirname } from 'path';
import * as c from './files/c.js';
//import a from './files/a.json' with { type: 'json'};
//import b from './files/b.json' with { type: 'json'};
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const a = JSON.parse(
  await readFile(
    new URL('./files/a.json', import.meta.url)
  )
);

const b = JSON.parse(
  await readFile(
    new URL('./files/b.json', import.meta.url)
  )
);

const random = Math.random();

let unknownObject;

if (random > 0.5) {
  unknownObject = a;
} else {
  unknownObject = b;
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);
console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServer((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
