DROP DATABASE IF EXISTS homocide;

CREATE DATABASE homocide;

\connect homocide;

CREATE TABLE nation (
  id bigserial PRIMARY KEY,
  country VARCHAR(100) NOT NULL,
  region VARCHAR(100),
  subregion VARCHAR(100),
  indicator VARCHAR(40) NOT NULL,
  Y2010 real,
  Y2011 real,
  Y2012 real
);

COPY 
  nation (country, region, subregion, indicator, Y2010, Y2011, Y2012)
FROM 
  '/Users/jenniezeng/HR Job Search/checkrPrep/homicide_country_data.csv' 
WITH (FORMAT CSV);
