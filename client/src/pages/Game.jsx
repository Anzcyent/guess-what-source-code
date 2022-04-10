import React, { Component } from 'react'
import { GuessCard, ResultCard, Navbar, CoinInputArea, HowToPlay } from "../components/index";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from "../redux/actions/auth";
import { generate_number, play_game } from "../redux/actions/game";

export class Game extends Component {
  constructor(props) {
    super(props);

    this.token = localStorage.getItem('auth');

    this.state = {
      guessCardNumber: "GC",
    }
  }

  setGuessCardNumber = (e) => {
    if (e.target.value !== "") {
      this.setState({ guessCardNumber: e.target.value });
    } else {
      this.setState({ guessCardNumber: "GC" });
    }
  }

  render() {
    return (
      <div className="game" style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Navbar user={this.props.user} logout={this.props.actions.logout} win={this.props.win} currentBet={this.props.currentBet} />
        <GuessCard guessCardNumber={this.state.guessCardNumber} />
        <ResultCard alert={this.props.alert} num={this.props.number} generate_number={this.props.actions.generate_number} token={this.token} />
        <CoinInputArea user={this.props.user}
          num={this.props.number}
          generate_number={this.props.actions.generate_number}
          play_game={this.props.actions.play_game}
          token={this.token}
          setGuessCardNumber={this.setGuessCardNumber}
          alert={this.props.alert}
        />
        {localStorage.getItem("isReadRules") === "not-readed" && <HowToPlay />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    number: state.game.number,
    alert: state.alert,
    win: state.game.win,
    currentBet: state.game.currentBet
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      logout: bindActionCreators(logout, dispatch),
      generate_number: bindActionCreators(generate_number, dispatch),
      play_game: bindActionCreators(play_game, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);