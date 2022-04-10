import React, { Component } from 'react';
import { LoginRegister } from "../components/index";

export class Auth extends Component {
  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
        <LoginRegister set_forgot_password={this.props.set_forgot_password} />
      </div>
    )
  }
}

export default Auth