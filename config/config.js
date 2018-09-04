require('dotenv').config();
const checkEnvVars = require('../libs/checkEnvVars');

if (checkEnvVars(['DATABASE_URL'])) {
  process.exit();
}

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
    },
  },
  test: {
    url: `${process.env.DATABASE_URL}_test`,
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
    },
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: false,
    },
  },
};
