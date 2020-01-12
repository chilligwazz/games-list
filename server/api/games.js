var express = require('express');
var Games = require('../models/games');

var router = express.Router();

router.get('/', (req, res) => {
  Games.retrieveAll((err, games) => {
    if (err)
      return res.json(err);
    return res.json(games);
  });
});

router.post('/', (req, res) => {
  var game = req.body.game;

  Games.insert(game, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;