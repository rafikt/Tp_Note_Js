var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./config/db');

var parser = bodyParser.urlencoded({extended:false});

app.use('/', function(req, res, next) {
  console.log('Coucou middle');
  next();
});

app.get('/', parser, function(req, res) {

  var Schema = db.Schema;
  var personSchema = new Schema({
    firstname: 'String'
  });

  var Person = db.model('Person', personSchema);

  var p = new Person({
    firstname: 'John',
    lastname: 'DOE'
  });

  p.save();

});

app.listen(1337);
