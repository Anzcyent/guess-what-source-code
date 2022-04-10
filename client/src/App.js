import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { refresh_token } from './redux/actions/auth';
import { Auth, Game } from "./pages/index";
import { Toast, Loading, ForgotPassword, ResetPassword } from "./components/index";


if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

const App = () => {
  const [forgot_password, set_forgot_password] = useState(false);
  // eslint-disable-next-line
  const [reset_password, set_reset_password] = useState(false);
  const alert = useSelector(state => state.alert);

  const token = localStorage.getItem('auth');
  const reset_password_input = localStorage.getItem('reset_password_input')

  const dispatch = useDispatch();

  useEffect(() => {
    token && dispatch(refresh_token(token));
  }, [dispatch, token])

  return (
    <>
      {/* Reset Password */}
      {forgot_password && <ForgotPassword set_forgot_password={set_forgot_password} set_reset_password={set_reset_password} />}
      {reset_password_input && <ResetPassword set_reset_password={set_reset_password} />}
      {/* Loading */}
      {alert.loading && <Loading />}
      {/* Toast */}
      {alert.error && <Toast error={alert.error} />}
      {alert.success && <Toast success={alert.success} />}
      {/* Main Render */}
      {token ? <Game /> : <Auth set_forgot_password={set_forgot_password} />}
    </>
  )
}

export default App