import React from 'react'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Toast = ({error, success}) => {
    toast.error(error);
    toast.success(success);
    return (
        <div>
            <ToastContainer />
        </div>
    )
}

export default Toast