import os from 'os';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, './worker.js');

const performCalculations = async () => {
  const cpuCores = os.cpus();
  const numberOfCPUCores = cpuCores.length;
  const mainResult = [];

  const createWorker = (value) => {
    return new Promise(function (resolve, reject) {
      const workerResult = {
        'status': '',
        'data': 0,
      };

      const worker = new Worker(filePath, { workerData: { value } });

      worker.on("message", (data) => {
        workerResult.status = 'resolved';
        workerResult.data = data;
        resolve(workerResult);
      });

      worker.on("error", (msg) => {
        workerResult.status = 'error';
        workerResult.data = 0;
        reject(workerResult);
      });
    });
  };

  const workerPromises = [];
  let startValue = 10;

  for (let i = 0; i < numberOfCPUCores; i += 1) {
    workerPromises.push(createWorker(startValue + i));
  }

  const thread_results = await Promise.all(workerPromises);

  for (let i = 0; i < numberOfCPUCores; i += 1) {
    mainResult.push(thread_results[i]);
  }

  console.log(mainResult);
};

await performCalculations();
