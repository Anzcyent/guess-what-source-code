import React, { Component } from 'react'
import "./ResetPassword.css"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { reset_password } from '../../redux/actions/auth'
import { validateResetPassword } from "../../utils/validation"

export class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        token: "",
        password: "",
        confirmPassword: ""
      }
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ data: { ...this.state.data, [name]: value } });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { data } = this.state;
    const { set_reset_password } = this.props;

    if (validateResetPassword(data)) {
      this.props.actions.reset_password(data, set_reset_password);
    }
  }

  discardResetPasswordInput = () => {
    localStorage.removeItem("reset_password_input");
    window.location.reload();
  }

  render() {
    return (
      <div className="reset-password">
        <form autoComplete="off" onSubmit={this.handleSubmit} className="reset-password-content">
          <input placeholder="Enter your token" name="token" onChange={this.handleChange} />
          <input placeholder="Enter your new password" name="password" type="password" onChange={this.handleChange} />
          <input placeholder="Confirm password" name="confirmPassword" type="password" onChange={this.handleChange} />
          <button type="submit" style={{ marginTop: 7 }}>Submit</button>
          <button type="button" style={{ backgroundColor: "var(--danger)", marginTop: 7 }} onClick={this.discardResetPasswordInput}>Cancel</button>
        </form>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: {
      reset_password: bindActionCreators(reset_password, dispatch)
    }
  }
}

export default connect(null, mapDispatchToProps)(ResetPassword)