import React, { Component } from 'react';
import Footer from './Footer';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <div className="title-background">
                <h2>HOME</h2>
            </div>
            <h3>Make the right choice in your kid's future!</h3>
            <form>
                <label htmlfor="firstName">Search:</label>
                <input id="firstName" type="text" />
            </form>
      </div> 
    );
  }
}
