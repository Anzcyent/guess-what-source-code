import React, { Component } from 'react'
import "./Loading.css"
import ReactLoading from "react-loading"

export class Loading extends Component {
    render() {
        return (
            <div className="loading">
                <ReactLoading type="bars" color="var(--secondary-bg-color)" width={100} height={100} />
            </div>
        )
    }
}

export default Loading