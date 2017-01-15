var router = require('express').Router();
var fs = require('fs');
var data = require('../helpers/data');
var Film = require('../models/Film');

router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

router.get(['/', '/index'], function(req, res) {

    data.loadData('films.json', function(err, films) {
      var filmJson = JSON.parse(films);
      filmJson.forEach(function(f) {
        var fi = new Film(f);
        fi.save(function(err, fsave){
          console.error(err);
          console.log(fsave);
        });
      })
        res.render('index.html', { films: JSON.parse(films) });
    })

  Film.find({}).exec(function(err, films) {
    console.log(films);
    res.render('index.html', { films: films });
  });
});

router.get('/film/:title', function(req, res) {
  var title = req.params.title;

  Film.find({title: title}).exec(function(err, film) {
    res.render('film.html', { film : film[0] });
  });

});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
