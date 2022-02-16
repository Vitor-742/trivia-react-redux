import React from 'react';
import GameScreen from '../Components/GameScreen';
import Header from '../Components/Header';

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
