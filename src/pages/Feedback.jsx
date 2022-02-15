import React from 'react';
import { connect } from 'react-redux';

class Feedback extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        retornaAvatar()
    }

    retornaAvatar() {

    }

  render() {
    const { player: { name, assertions, score, gravatarEmail } } = this.props;
    return (
      <div>
        <header>
          <img src={}
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerData: state.player,
});

export default connect(mapStateToProps)(Feedback);
