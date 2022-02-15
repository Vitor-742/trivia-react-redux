import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { dataLogin, tokenLogin, loginAction } from '../store/actions';

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

  handleClick = () => {
    const { loginToken, loginData, getEmail } = this.props;
    const { emailLogin, usernameLogin } = this.state;
    const dados = { emailLogin, usernameLogin };
    getEmail({usernameLogin, emailLogin});
    fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
        loginToken(data.token);
        loginData(dados);
      });
  }

  render() {
    const { btnEnable } = this.state;
    return (
      <div>
        <label htmlFor='userName'>
          Nome:
        <input
          id="userName"
          type="text"
          data-testid="input-player-name"
          name="usernameLogin"
          onChange={ this.handleChange }
        />
        </label>
        <label htmlFor="emailLogin">
          Email:
        <input
          id="emailLogin"
          type="text"
          data-testid="input-gravatar-email"
          name="emailLogin"
          onChange={ this.handleChange }
        />
        </label>
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

const mapDispatchToProps = (dispatch) => ({
  loginToken: (token) => dispatch(tokenLogin(token)),
  loginData: (dados) => dispatch(dataLogin(dados)),
  getEmail: (payload)=> dispatch(loginAction(payload)),
});

Login.propTypes = {
  loginToken: PropTypes.func,
  loginData: PropTypes.func,
  getEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
