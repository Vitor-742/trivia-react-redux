import React from 'react';

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
        <button
          type="button"
          disabled={ !btnEnable }
          data-testid="btn-play"
        >
          Play
        </button>
      </div>
    );
  }
}

export default Login;
