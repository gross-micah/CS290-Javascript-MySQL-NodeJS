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
    res.setHeader('content-type', 'text/javascript');
    res.send(context.results);
  });
});

app.post("/insert", function(req, res, next){
  var context = {};
  var incoming = req.body;
  var input = [];
  for (key in incoming){
    input.push(incoming[key]);
  }
  incoming.sentData = req.query.name;
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

app.post("/delete", function(req, res, next){
  var context = {};
  var incoming = req.body;
  var id = "" + incoming.id;
  id = id.substring(1);
  id = parseInt(id, 10);
  mysql.pool.query("DELETE FROM workouts WHERE id=?", [id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(result);
    console.log(context.results);
    res.send(context.results);
  });
});

app.post("/update", function(req, res, next){
  var context = {};
  var incoming = req.body;
  var id = "" + incoming.id;
  id = id.substring(1);
  id = parseInt(id, 10);
  console.log("it's working to here");
  console.log(id);
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [id], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(result);
    res.send(context.results);
    //res.render('update', context.results);
  });
});

app.post("/sendUpdate", function(req, res, next){
  var context = {};
  var incoming = req.body;
  var input = [];
  for (key in incoming){
    input.push(incoming[key]);
  }
  console.log(input);
  mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=?, WHERE id=?", [input], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(result);
    res.send(context.results);
    //res.render('update', context.results);
  });
});

/*app.get('/reset-table',function(req,res,next){
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
*/

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
