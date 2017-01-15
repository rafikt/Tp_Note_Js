var router = require('express').Router();

router.use('/', require('./frontController'));
//router.use('/', require('./adminController'));

module.exports = router;
