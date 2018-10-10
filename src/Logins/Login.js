import React from 'react';
import GoogleLogin from './GoogleLogin';
import FacebookLogin from './FacebookLogin';
import EmailSignIn from './EmailSignIn';
import EmailSignUp from './EmailSignUp';

export default () => {
  return (
    <div>
      <EmailSignIn />
      <GoogleLogin />
      <FacebookLogin />
      <h5>Or Sign Up</h5>
      <EmailSignUp />
    </div>
  );
};
