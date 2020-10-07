import React, { Component } from 'react';
import Footer from './Footer';
import { SignUp } from './sign-up/SignUp';
import { SignIn } from './sign-in/SignIn';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <SignUp />
            <SignIn />
      </div> 
    );
  }
}
