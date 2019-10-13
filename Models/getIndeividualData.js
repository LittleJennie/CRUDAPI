const db = require('../db');

// require: country, year, indicator
module.exports = (req, res) => {
  const { country, year, indicator } =  req.query;
  console.log(country, year, indicator)

  const queryStr = `SELECT y${year} FROM nation WHERE indicator = $1 AND country = $2`;
  const queryArr = [`${indicator}`, `${country}`];

  db.query(queryStr, queryArr, (err, data) => {
    if (err) {
      res.status(500).json(err.routine);
    } else {
      if (data.rows.length === 0) {
        res.status(500).send('Please provide a valid indicator or country');
      } else {
        res.status(200).json(data.rows[0][`y${year}`]);
      }
    }
  });
};
