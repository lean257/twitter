const express = require('express');
const router = express.Router();

const tweetBank = require('../tweetBank');

module.exports = function(io) {
  router.get('/', function (req, res) {
    let tweets = tweetBank.list();
    res.render( 'index', { tweets: tweets, showForm: true } );
  });

  router.get('/users/:name', function(req, res) {
    let name = req.params.name;
    let tweetsForUser = tweetBank.find( {name: name} );
    res.render( 'index', { tweets: tweetsForUser } );
  });

  router.get('/tweets/:id', function(req, res) {
    let id = Number(req.params.id);
    let tweetByID = tweetBank.find( {id: id} );
    res.render( 'index', { tweets: tweetByID } );
  });

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);

    let newTwwet = {
    name: name,
    content: text,
    id : result.rows[0].id
    };
    io.sockets.emit('new_tweet', newTweet);

    res.redirect('/');
  });



  return router;
}
