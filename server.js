'use strict';

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3456));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('');
});

app.get('/profiles', (req, res) => {
  res.render('profiles');
});

var base64data;
app.get('/scrambled', (req, res) => {
  let fs = require('fs-extra');
  let data = fs.readFileSync('./public/9yin-en.html');
  let buffer = new Buffer(data);
  base64data = buffer.toString('base64');
  res.send(base64data);
});

app.get('/descrambled', (req, res) => {
  let buffer = new Buffer(base64data || '', 'base64')
  let decode = buffer.toString('utf-8')
  res.send(decode);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
