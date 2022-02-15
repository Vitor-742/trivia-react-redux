import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Config from './pages/Config';
import Game from './pages/Game';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/config" component={ Config } />
        <Route path="/Game" component={ Game } />
      </Switch>
    </div>
  );
}
