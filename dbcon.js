var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit   : 10,
  host              : 'mysql.eecs.oregonstate.edu',
  user              : 'cs290_grossmmi',
  password          : '5550',
  database          : 'cs290_grossmmi'
});

module.exports.pool = pool;
