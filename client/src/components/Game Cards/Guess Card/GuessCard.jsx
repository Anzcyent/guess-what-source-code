import React, { Component } from 'react'
import "../Cards.css"


export class GuessCard extends Component {
  render() {
    return (
      <div className="card guess-card">
          {this.props.guessCardNumber}
      </div>
    )
  }
}

export default GuessCard