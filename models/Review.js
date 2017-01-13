var db = require('../config/db');
var Film = require('./Film');

var Schema = db.Schema;

var reviewSchema = new Schema({
  username: 'String',
  message: 'String',
  note: 'String',
  Film: { type: Schema.Types.ObjectId, ref: 'Film'}
});

var Review = db.model('Review', reviewSchema);

module.exports = Review;
