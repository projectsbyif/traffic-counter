// NPM REQUIRES
const express = require('express');
const app = express();
const http = require('http').Server(app);
const helmet = require('helmet');

// SERVER CONFIGURATION
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('port', process.env.PORT || 3000);

// ROUTES

app.get('/', (req, res) => {
  res.json({message: 'Hello world'});
});

// START SERVER
http.listen(app.get('port'), () => {
  console.log(`Available at http://localhost:${app.get('port')}`);
  console.log('-------');
});

module.exports = http;
