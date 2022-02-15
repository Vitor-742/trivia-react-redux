import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { dataLogin, tokenLogin } from '../store/actions';
import { fetchTokenApi } from '../services/triviaApi';


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

  handleClick = async () => {
    const { loginToken, loginData } = this.props;
    const { emailLogin, usernameLogin } = this.state;
    const dados = { emailLogin, usernameLogin };
    const tokenApi = await fetchTokenApi();
    localStorage.setItem('token', tokenApi.token);
    loginToken(tokenApi.token);
    loginData(dados);
    // fetch('https://opentdb.com/api_token.php?command=request')
    // .then((response) => response.json())
    // .then((data) => {
    //   localStorage.setItem('token', data.token);
    //   loginToken(data.token);
    //   loginData(dados);
    // });
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

const mapDispatchToProps = (dispatch) => ({
  loginToken: (token) => dispatch(tokenLogin(token)),
  loginData: (dados) => dispatch(dataLogin(dados)),
});

Login.propTypes = {
  loginToken: PropTypes.func,
  loginData: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
