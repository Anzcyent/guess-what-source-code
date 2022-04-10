import React, { Component } from 'react'
import "../Cards.css"

export class ResultCard extends Component {
  componentDidMount() {
    const { generate_number, token } = this.props;
    
    generate_number(token)
  }
  render() {
    return (
      <div className={`card result-card ${this.props.alert.showing_result_card_process && "active"}`}>{this.props.num}</div>
    )
  }
}

export default ResultCard