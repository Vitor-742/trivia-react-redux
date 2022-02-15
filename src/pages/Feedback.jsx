import React from 'react';
import { connect } from 'react-redux';

class Feedback extends React.Component {
  render() {
    console.log(playerData);
    return (
      <div>
        <header />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerData: state.player,
});

export default connect(mapStateToProps)(Feedback);
