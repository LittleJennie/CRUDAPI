const db = require('../db');

module.exports = (req, res) => {
  const { country, region, subregion, indicator, year } = req.body;
  console.log(req.body)

  if (!country) {
    res.status(500).send('Please provide a country');
    return;
  }

  if (indicator !== 'Homicide Rate' && indicator !== 'Homicide Total Count') {
    res.status(500).send('Please provide a valid indicator');
    return;
  }

  // validate if country already existed in db
  const validateQueryStr = 'SELECT country FROM nation WHERE country = $1';
  const validateQueryArr = [country];

  db.query(validateQueryStr, validateQueryArr, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (data.rows.length === 0) {
        // insert new data into db
        const insertQueryStr = `
          INSERT INTO 
            nation (country, region, subregion, indicator, y2010, y2011, y2012)
          VALUES 
            ($1, $2, $3, $4, $5, $6, $7) 
          RETURNING *;
        `;
        const insertQueryArr = [country, region, subregion, indicator, year.y2010, year.y2011, year.y2012];

        db.query(insertQueryStr, insertQueryArr, (err, data) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).json(data.rows[0].id);
          }
        });
      } else {
        res.status(500).send('This country already exists in database');
      }
    }
  });
};
