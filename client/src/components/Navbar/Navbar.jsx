import React, { Component } from 'react'
import "./Navbar.css"
import userIMG from "../../icons/user.png"
import logoutIMG from "../../icons/logout.png"
import coin from "../../icons/coin.png"

export class Navbar extends Component {
    render() {
        const { user, logout } = this.props;
        return (
            <nav className="navbar">
                <div className="navbar-user-area">
                    <img src={userIMG} alt="user" style={{ width: "30px", margin: "0 7px" }} className="user-pp" />
                    <span style={{ fontWeight: 700 }}>{user?.userName}</span>
                </div>

                <div className="navbar-coin-area">
                    <img src={coin} alt="coin" style={{ width: "30px", margin: "0 7px" }} />
                    <span style={{ fontWeight: 700 }}>{user?.coins}</span>
                    <img src={logoutIMG} alt="logout" style={{ width: "20px", margin: "0 20px", cursor: "pointer" }} onClick={() => logout()} />
                    {this.props.win && <span className="coin-trade gain-coins">+{this.props.currentBet * 5}</span>}
                    {this.props.win === false && <span className="coin-trade lose-coins">-{this.props.currentBet}</span> }
                </div>
            </nav>
        )
    }
}

export default Navbar