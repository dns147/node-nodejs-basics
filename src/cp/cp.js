import { fork } from 'child_process';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, './files/script.js');

const spawnChildProcess = async (args) => {
  const childProcess = fork(filePath, args);

  childProcess.on('message', (msg) => {
    console.log('PARENT got message:', msg);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess([1, 3, 5]);
