import React from "react";
import { connect } from "react-redux";
import md5 from 'crypto-js/md5';

class Header extends React.Component {

  render() {
    const { nome, email } = this.props;
    const hash = md5(email).toString();
    return (
      <div>
      <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="imagemDoJogdor"/>
      <p data-testid="header-player-name" > Nome: {nome} </p>
      <p data-testid="header-score"> Pontuação: 0 </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nome: state.login.nome,
    email: state.login.email,
  }
}

export default connect(mapStateToProps)(Header);
