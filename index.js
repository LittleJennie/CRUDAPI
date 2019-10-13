const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const routes = require('./route.js');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.set('port', 3000);

app.use('/', routes);

app.listen(app.get('port'), () => {
  console.log('Now listen to port ', app.get('port'));
});
