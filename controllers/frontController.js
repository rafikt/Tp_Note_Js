var router = require('express').Router();
var fs = require('fs');
var data = require('../helpers/data');
var Film = require('../models/Film');
var Review = require('../models/Review');

router.get(['/', '/index'], function(req, res) {

    /*data.loadData('films.json', function(err, films) {
      var filmJson = JSON.parse(films);
      filmJson.forEach(function(f) {
        var fi = new Film(f);
        fi.save(function(err, fsave){
          console.error(err);
          console.log(fsave);
        });
      })
        //res.render('index.html', { films: JSON.parse(films) });
    })*/

    /*data.loadData('reviews.json', function(err, reviews) {
      var reviewJson = JSON.parse(reviews);
      reviewJson.forEach(function(f) {
        var rev = new Review(f);
        rev.save(function(err, rsave){
          console.error(err);
          console.log(rsave);
        });
      })
        //res.render('index.html', { films: JSON.parse(films) });
    })*/

  Film.find({}).exec(function(err, films) {
    res.render('index.html', { films: films });
  });
});

router.get('/film/:title', function(req, res) {
  var title = req.params.title;

  Film.find({title: title}).populate('reviews').exec(function(err, film) {
    film = film[0];
    console.log(film);

    res.render('film.html', { film : film });

  });
});

router.get('/first-insert', function(req, res) {

  data.loadData('reviews.json', function(err, reviews) {
      var reviewJson = JSON.parse(reviews);
      reviewJson.forEach(function(f) {
          rev = new Review(f);
          rev.save(function(err, rsave){
              console.error(err);
              console.log(rsave);
          });
      })
  });

  data.loadData('films.json', function(err, films) {
     var filmJson = JSON.parse(films);
     filmJson.forEach(function(f) {
       var fi = new Film(f);
       fi.reviews.push(rev);
       fi.save(function(err, fsave){
         console.error(err);
         console.log(fsave);
       });
     })
      res.writeHead(302, {
          'Location': '/'
      });
      res.end();
   });
});

module.exports = router;
