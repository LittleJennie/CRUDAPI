const db = require('../db');

module.exports = (req, res) => {
  const { country, indicator } = req.params;
  console.log(indicator)

  if (!country || (indicator !== 'Homicide Total Count' && indicator !== 'Homicide Rate')) {
    res.status(500).send('Please provide a country or a validate indicator.');
    return;
  }

  // validate if country exists
  const validateQueryStr = 'SELECT country FROM nation WHERE country = $1 AND indicator = $2';
  const validateQueryArr = [country, indicator];

  db.query(validateQueryStr, validateQueryArr, (err, validateRes) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (validateRes.rows.length === 0) {
        res.status(500).send('Record is not created in database yet.');
      } else {
        const deleteQueryStr = 'DELETE FROM nation WHERE country = $1 AND indicator = $2 RETURNING *';
        const deleteQueryArr = [country, indicator];

        db.query(deleteQueryStr, deleteQueryArr, (err, deleteRes) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(200).send(deleteRes.rows[0].id);
          }
        });
      }
    }
  });
};
