const dev = {
  port: 3000,
  'redis': {
    'host': 'localhost',
    'port': '5984',
    'db': 0,
    'key': 'testWork'
  }
};

const prod = {
  port: 3000,
  'redis': {
    'host': 'localhost',
    'port': '5984',
    'db': 0,
    'key': 'testWork'
  }
};

module.exports = () => {
  const mode = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase();
  if (mode === 'production') {
    return prod;
  }

  return dev;
};
