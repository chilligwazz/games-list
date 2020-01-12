const db = require('../database');

class Games {
  static retrieveAll (callback) {
    db.query('SELECT game_title from games', (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }

  static insert (game, callback) {
    db.query('INSERT INTO games (game_title) VALUES ($1)', [game], (err, res) => {
      if (err.error)
        return callback(err);
      callback(res);
    });
  }
}

module.exports = Games;