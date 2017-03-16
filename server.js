var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var request = require('request');
var async = require('async');
app.set('view engine', 'handlebars');
app.set('port', Number(process.env.PORT || 3000));

app.use(express.static('public'));
app.engine('handlebars', handlebars.engine);



app.get("/", function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT * FROM homework', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    //console.log(context.results);
    res.render('home', context);
  });
});

app.get("/log", function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT * FROM homework', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    //console.log(context.results);
    //console.log("I got a GET request");
    res.setHeader('content-type', 'text/javascript');
    res.send(context.results);
  });
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS homework", function(err){
    var createString = "CREATE TABLE homework(" +
    "id INT PRIMARY KEY AUTO_INCREMENT," +
    "name VARCHAR(255) NOT NULL," +
    "done BOOLEAN," +
    "due DATE)";
    mysql.pool.query(createString, function(err){
      context.results = "Table reset";
      res.render('home',context);
    })
  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
