import React, { Component } from 'react'
import "./LoginRegister.css"
import PasswordStrengthBar from "react-password-strength-bar"
import view from "../../icons/view.png"
import hidden from "../../icons/hidden.png"
import { bindActionCreators } from "redux"
import { register, login } from "../../redux/actions/auth"
import { alertNotification } from "../../redux/actions/alert"
import { connect } from "react-redux"
import { validateLogin, validateRegister } from "../../utils/validation";

export class LoginRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: "",
        userName: "",
        password: "",
        confirmPassword: ""
      },
      currentProcess: "login",
      isPasswordFocused: false,
      showPassword: false
    }
  }

  handleChangeData = (e) => {
    const { name, value } = e.target;
    this.setState({ data: { ...this.state.data, [name]: value } });
  }

  changeCurrentProcess = () => {
    switch (this.state.currentProcess) {
      case "login":
        this.setState({ currentProcess: "register" });
        break;
      case "register":
        this.setState({ currentProcess: "login" });
        break;
      default:
        return;
    }
  }

  changeShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.currentProcess === "login") {
      if (!validateLogin({ userName: this.state.data.userName, password: this.state.data.password })) {
        this.props.actions.alertNotification({ error: "Please provide necessary credentials" });
      } else {
        this.props.actions.login(this.state.data);
      }
    }

    if (this.state.currentProcess === "register") {
      if (!validateRegister(this.state.data)) {
        this.props.actions.alertNotification({ error: "Please provide necessary credentials" });
      } else {
        this.props.actions.register(this.state.data);
      }
    }

    this.setState({ data: { email: "", userName: "", password: "", confirmPassword: "" } });
  }

  render() {
    const { currentProcess, isPasswordFocused, data, showPassword } = this.state;
    return (
      <form onSubmit={this.handleSubmit} autoComplete="off" className="login-register">
        <header>
          <h1 style={{ textAlign: 'center', color: "var(--primary-color)" }}>{currentProcess === "login" ? "Login" : "Register"}</h1>
        </header>

        <main className="login-register-main">
          {currentProcess === "register" && <input type="email" placeholder="Email" name="email" onChange={this.handleChangeData} value={this.state.data.email} />}
          <input type="text" placeholder="Username" name="userName" onChange={this.handleChangeData} value={this.state.data.userName} />
          <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" onChange={this.handleChangeData} onFocus={() => { this.setState({ isPasswordFocused: true }) }} onBlur={() => { this.setState({ isPasswordFocused: false }) }} value={this.state.data.password} />
          {currentProcess === "register" && isPasswordFocused && <PasswordStrengthBar password={data.password} scoreWords={["Weak", "Okay", "Good", "Strong", "Too Strong"]} shortScoreWord="Need 6 characters" minLength={6} style={{ position: "absolute", bottom: "18%", left: "-25%", width: "100%" }} />}
          {currentProcess === "register" && <img src={showPassword ? hidden : view} alt="view" className="login-register-show-password-img" onClick={() => this.changeShowPassword()} />}
          {currentProcess === "register" && <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" onChange={this.handleChangeData} value={this.state.data.confirmPassword} />}
        </main>

        <section className="login-register-section">
          <button className="login-register-submit-btn">Submit</button>
        </section>

        <footer className="login-register-footer" style={{ marginTop: 15 }}>
          {currentProcess === "login" && <small onClick={() => this.props.set_forgot_password(true)} style={{ display: "block", textDecoration: "underline", cursor: "pointer" }}>Forgot Password ?</small>}
          <small onClick={() => this.changeCurrentProcess()}>{currentProcess === "login" ? "Don't have an account? " : "Already have an account? "} <span style={{ color: "#8684F0", textDecoration: "underline", cursor: "pointer" }}>{currentProcess === "register" ? "Login" : "Register"}</span></small>
        </footer>
      </form>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return {
    actions: {
      register: bindActionCreators(register, dispatch),
      login: bindActionCreators(login, dispatch),
      alertNotification: bindActionCreators(alertNotification, dispatch)
    }
  }
}

export default connect(null, mapDispatchToProps)(LoginRegister)