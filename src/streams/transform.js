import { Transform } from 'stream';

const transform = async () => {
  const reverseStream = new Transform({
    transform (data, encoding, callback) {
      const reversedData = data.toString().split('').reverse().join('');
      this.push(reversedData);
      callback();
    }
  });

  process.stdin.pipe(reverseStream).on('data', (data) => {
    const dataFile = Buffer.from(data);
    process.stdout.write(dataFile);
  });

  process.stdin.resume();
};

await transform();
