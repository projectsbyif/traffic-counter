// NPM REQUIRES
require('dotenv').config();
const _ = require('lodash');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const helmet = require('helmet');
const moment = require('moment');

const models = require('./models');
const checkEnvVars = require('./libs/checkEnvVars');

if (checkEnvVars(['DATABASE_URL'])) {
  process.exit();
}

// SERVER CONFIGURATION
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3000);

// ROUTES
app.get('/', (req, res) => {
  models.Records.findAll({
    order: [['timestamp', 'DESC']],
    limit: 12,
  })
  .then((results) => {
    results = _.reverse(results);

    const DATA = parseResults(results);

    const RESULTS = {
      'TrafficData': {
        'Columns': {
          'Column': [
            {
              '@ColumnId': 'Data1',
              '@ColumnName': 'Eastbridge Road – Pedestrians',
            },
            {
              '@ColumnId': 'Data2',
              '@ColumnName': 'Eastbridge Road – Bicycles',
            },
            {
              '@ColumnId': 'Data3',
              '@ColumnName': 'Eastbridge Road – Motorbikes',
            },
            {
              '@ColumnId': 'Data4',
              '@ColumnName': 'Eastbridge Road – Cars',
            },
            {
              '@ColumnId': 'Data5',
              '@ColumnName': 'Eastbridge Road – Trucks',
            },
          ],
        },
        'RawData': {
          'Data': DATA,
        },
      },
    };

    res.json(RESULTS);
  });
});

let parseResults = (results) => {
  let parsedResults = results.map((result) => {
    return {
      '@MeasurementDateGMT': moment(result.timestamp)
        .format('YYYY-MM-DD HH:mm'),
      '@Data1': result.pedestrians.toString(),
      '@Data2': result.bicycles.toString(),
      '@Data3': result.motorbikes.toString(),
      '@Data4': result.cars.toString(),
      '@Data5': result.lorries.toString(),
    };
  });

  return parsedResults;
};

// START SERVER
http.listen(app.get('port'), () => {
  console.log(`Available at http://localhost:${app.get('port')}`);
  console.log('-------');
});

module.exports = http;
