const express = require('express');
const route = express.Router();
const getIndividualData = require('./Models/getIndeividualData.js');
const createCountry = require('./Models/createCountry.js');
const updateCountry = require('./Models/updateCountry.js');
const deleteCountry = require('./Models/deleteCountry.js');

// get data from country's year on a specific indicator
// require: country, year(object), indicator
// return the result for that year
route.get('/getindividualdata', getIndividualData);

// post a row of data for a new country
// require: country
// optional: region, subregion, indicator, y2010, y2011, y2012
// return the posted row id
route.post('/createcountry', createCountry);

// update an existing year's data
// require: country, indicator, year (int), data (float)
// return updated row id
route.put('/updatecountry', updateCountry);

// delete an existing record
// require: country, indicator
// return completed message
route.delete('/deletecountry/:country/:indicator', deleteCountry);

module.exports = route;
