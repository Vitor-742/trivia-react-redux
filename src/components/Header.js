import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div>
      <img datatestid="header-profile-picture" src="#" alt="#"/>
      <p datatestid="header-player-name" > Nome:  </p>
      <p datatestid="header-score"> Pontuação:  </p>
      </div>
    )
  }
}

export default Header;
