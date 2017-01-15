var db = require('../config/db');

var Schema = db.Schema;

var filmSchema = new Schema({
  title: 'String',
  director: 'String',
  poster: 'String',
  releaseDate: 'String',
  addDate: 'String',
  synopsis: 'String',
  reviews: [{type: Schema.Types.ObjectId, ref:'Review'}]
});

var Film = db.model('Film', filmSchema);

module.exports = Film;
