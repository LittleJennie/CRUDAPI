const db = require('../db');

module.exports = (req, res) => {
  const { country, indicator, year, data } = req.body;
  console.log(country, indicator, year, data)

  if (!country || !indicator) {
    res.status(500).send('Please provide a country or indicator.');
    return;
  }

  if ( year !== 2010 && year !== 2011 && year !== 2012 ) {
    res.status(500).send('Please provide a valid year.');
    return;
  }

  if (isNaN(data)) {
    res.status(500).send('Please provide valid homocide data record.');
    return;   
  }

  // first check if the country and indicator existed
  const validateQueryStr = 'SELECT country FROM nation WHERE country = $1 AND indicator = $2;';
  const validateQueryArr = [country, indicator];

  db.query(validateQueryStr, validateQueryArr, (err, validateRes) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (validateRes.rows.length === 0) {
        res.status(500).send('Please create this country in database first.');
      } else {
        const updateQueryStr = `
          UPDATE 
            nation
          SET 
            y${year} = $1
          WHERE
            country = $2 AND indicator = $3
          RETURNING *;
        `;
        const updateQueryArr = [data, country, indicator];

        db.query(updateQueryStr, updateQueryArr, (err, updatedData) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).send(updatedData.rows[0].id);
          }
        });
      }
    }
  });
};
