const moment = require('moment');
const random = require('random');
const models = require('./models/index');

models.Records.count().then((count) => {
  if (count === 0) {
    const NOW = moment().minute(0).second(0).millisecond(0);
    const TWELVE_HOURS_AGO = moment().subtract(12, 'hours').minute(0).second(0)
      .millisecond(0);

    let hoursToCreate = [];
    for (let m = moment(TWELVE_HOURS_AGO); m.isBefore(NOW); m.add(1, 'hour')) {
      hoursToCreate.push(moment(m));
    }

    let hoursToCreateQueue = hoursToCreate.map((hour) => {
      return createNewRecord(hour);
    });

    Promise.all(hoursToCreateQueue).then(() => process.exit());
  }

  createNewRecord(moment().minute(0).second(0).millisecond(0)).then(() => {
    return process.exit();
  });
});

let createNewRecord = (hour) => {
  return new Promise((resolve, reject) => {
    models.Records.create({
      pedestrians: random.int(min = 0, max = 50),
      bicycles: random.int(min = 0, max = 50),
      motorbikes: random.int(min = 0, max = 30),
      cars: random.int(min = 0, max = 100),
      lorries: random.int(min = 0, max = 20),
      timestamp: hour,
    })
    .then(() => resolve());
  });
};
