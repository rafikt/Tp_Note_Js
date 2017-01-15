var router = require('express').Router();
var fs = require('fs');
var data = require('../helpers/data');
var Admin = require('../models/Admin');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


router.get(['/', '/index'], function(req, res) {
  
    res.render('index.html', {});
  
});var express = require('express');



// Login
router.get('/login', function(req, res){
	res.render('login');
});



passport.use(new LocalStrategy(
  function(login, pswd, done) {
   Admin.getUserByUsername(username, function(err, login){
   	if(err) throw err;
   	if(!login){
   		return done(null, false, {message: 'Login Inconnu'});
   	}

   	Admin.comparePassword(pswd, login.pswd, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, login);
   		} else {
   			return done(null, false, {message: 'Mot de passe Erroné'});
   		}
   	});
   });
  }));

passport.serializeUser(function(login, done) {
  done(null, login.id);
});

passport.deserializeUser(function(id, done) {
  Admin.getUserById(id, function(err, login) {
    done(err, login);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'Deconnecté');

	res.redirect('');
});

module.exports = router;
