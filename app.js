const express = require('express');
const app = express();
const port = 3000;
const nunjucks = require('nunjucks');
const routes = require('./routes/');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const volleyball = require('volleyball');

var server = app.listen(port)
var io = socketio.listen(server);

app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', {noCache: true});

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes(io));
app.use(function(req, res, next){
  console.log(req.url);
  next();
});


app.use(express.static('public'))

app.use(volleyball)


