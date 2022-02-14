import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      usernameLogin: '',
      emailLogin: '',
      btnEnable: false,
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      const { emailLogin, usernameLogin } = this.state;
      if (emailLogin && usernameLogin) {
        this.setState({ btnEnable: true });
      } else {
        this.setState({ btnEnable: false });
      }
    });
  }

  handleClick() {
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => localStorage.setItem('token', data.token));
  }

  render() {
    const { btnEnable } = this.state;
    return (
      <div>
        <input
          type="text"
          data-testid="input-player-name"
          name="usernameLogin"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="input-gravatar-email"
          name="emailLogin"
          onChange={ this.handleChange }
        />
        <Link to="/Game">
          <button
            type="button"
            disabled={ !btnEnable }
            data-testid="btn-play"
            onClick={ this.handleClick }
          >
            Play
          </button>
        </Link>
        <Link to="/config">
          <button type="button" data-testid="btn-settings">
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

export default Login;
