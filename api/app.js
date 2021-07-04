'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Imports
const sequelize = require('./models').sequelize
const apiRouter = require('./routes/api');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// Data reading middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// API Router
app.use('/api', apiRouter);

// redirect the root route to the API
app.get('/', (req, res) => {
  res.redirect('/api')
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    Status: "404",
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});

const test = async() => {
  await sequelize.authenticate()
  console.log("Database authenticated")
}

test();