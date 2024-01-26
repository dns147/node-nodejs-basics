const parseEnv = () => {
  const envsObject = process.env;

  for (let key in envsObject) {
    if (key.includes('RSS_')) {
      console.log(`${key}=${envsObject[key]}`);
    }
  }
};

parseEnv();