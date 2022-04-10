import React, { Component } from 'react'
import "./HowToPlay.css"

export class HowToPlay extends Component {
  readRules = () => {
    localStorage.setItem("isReadRules", "readed");
    window.location.reload();
  }
  render() {
    return (
      <div className="how-to-play">
        <div className="how-to-play-content">
          <h1>How To Play</h1>

          <ul className="how-to-play-list">
            <li>There is a red card which has a number between 0 and 10 behind the yellow card.</li>
            <li>Guess what is the number and give your bet.</li>
            <li>If you guess it correctly, you will win 5x your bet.</li>
            <li>You will lose your bet firstly. For example, if you bet 10 and you have 100 coins, you will gain (100-10) + 10*5</li>
          </ul>

          <button onClick={() => this.readRules()} style={{ padding: "0.5rem 1rem" }}>Got It &#x2713;</button>
        </div>
      </div>
    )
  }
}

export default HowToPlay