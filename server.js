var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var request = require('request');
var myParser = require("body-parser");
var async = require('async');
app.set('view engine', 'handlebars');
app.set('port', Number(process.env.PORT || 3000));
app.use(myParser.json());
app.use(express.static('public'));
app.engine('handlebars', handlebars.engine);



app.get("/", function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
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
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
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
//NEXT TO DO
app.post("/insert", function(req, res, next){
  var context = {};
  var incoming = req.body;
  var input = [];
  for (key in incoming){
    input.push(incoming[key]);
  }
  console.log("Input:");
  console.log(input);
  incoming.sentData = req.query.name;
  console.log("request body");
  console.log(req.body);
  console.log(req.body["name"]);
  console.log(req.body["reps"]);
  mysql.pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?)", [input], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(result);
    res.setHeader('content-type', 'text/javascript');
    console.log(context.results);
    res.send(context.results);
  });
});

app.get('/reset-table',function(req,res,next){
  var context = {};
  mysql.pool.query("DROP TABLE IF EXISTS workouts", function(err){
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
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
