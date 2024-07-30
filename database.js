const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "bo92wohdakc4hl8oaiwy-mysql.services.clever-cloud.com",
  user: "ugkclhwbijmbekbn",
  password: "MyCWVYAGF9m17ZMr8nKK",
  database: "bo92wohdakc4hl8oaiwy",
  port: "3306",
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database!');
});

module.exports={connection}