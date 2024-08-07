import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ToastNotifications = () => {
    return (
        <>
            <ToastContainer autoClose={5000} />
        </>
    )
}

export default ToastNotifications