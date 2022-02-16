import React from 'react';
import GameScreen from '../components/GameScreen';
import Header from '../components/Header';

class Game extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <GameScreen />
      </div>
    );
  }
}

export default Game;
