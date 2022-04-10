import React, { Component } from 'react'
import "./ResetPassword.css"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { forgot_password } from '../../redux/actions/auth'
import { alertNotification } from '../../redux/actions/alert'
import { validateResetPassword } from "../../utils/validation"

export class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                input: ""
            }
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({ data: { [name]: value } });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { set_reset_password, set_forgot_password } = this.props;

        if (validateResetPassword(this.state.data)) {
            this.props.actions.forgot_password(this.state.data, set_reset_password, set_forgot_password);
        } else {
            this.props.actions.alertNotification({ error: "Please provide necessary credentials!" });
        }
    }

    render() {
        return (
            <div className="reset-password">
                <form autoComplete="off" onSubmit={this.handleSubmit} className="reset-password-content">
                    <input placeholder="Enter your username or email address." name="input" onChange={this.handleChange} />
                    <button type="submit" style={{ marginTop: 7 }}>Submit</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert
    }
}


function mapDispatchToProps(dispatch) {
    return {
        actions: {
            forgot_password: bindActionCreators(forgot_password, dispatch),
            alertNotification: bindActionCreators(alertNotification, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)