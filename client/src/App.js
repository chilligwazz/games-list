import React, { Component } from 'react';
import './App.css';

import Games from './Games';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: null,
      gameList: [],
      newGameTitle: ''
    };
  }

  getGameList = () => {
    fetch('/api/games')
    .then(res => res.json())
    .then(res => {
      var gameList = res.map(r => r.game_title);
      this.setState({ gameList });
    });
  };

  handleInputChange = (e) => {
    this.setState({ newGameTitle: e.target.value })
  }

  handleAddGame = () => {
    fetch('/api/games', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game: this.state.newGameTitle })
    })
    .then(res => res.json())
    .then(res => {
      this.getGameList();
      this.setState({ newGameTitle: '' });
    });
  };

  getGames = (game) => {
    fetch(`/api/games/${game}`)
    .then(res => res.json())
    .then(games => {
      this.setState({ games });
    });
  }

  handleChangeGame = (e) => {
    this.getGames(e.target.value);
  }

  componentDidMount () {
    this.getGameList();
  }

  render() {
    return (
      <div>
          <input
            placeholder="New game title..."
            value={this.state.newGameTitle}
            onChange={this.handleInputChange}
          />

          <button color="blue" onClick={this.handleAddGame}>Add game</button>

          <h1>Current game</h1>

          <select onChange={this.handleChangeGame}>
            { this.state.gameList.length === 0 && <option>No games added yet</option> }
            { this.state.gameList.length > 0 && <option>Select a game</option> }
            { this.state.gameList.map((game, i) => <option key={i}>{game}</option>) }
          </select>
        <Games data={this.state.games}/>
      </div>
    );
  }
}

export default App;