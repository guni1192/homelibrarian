/*

"use strict";


var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
  name: String,
  user: String,
  date: String,
  path: String,
  lang: String,
});


ArticleSchema.pre('save', function(next) {
  this.date = new Date();
  next();
});

mongoose.model('Article', ArticleSchema);
mongoose.connect('mongodb://localhost:27017/articledb');

var db = mongoose.connection;
var Article;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to 'articledb' database");
  Article = mongoose.model('Article');
  populateDB();
});
*/
