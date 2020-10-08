import React, { Component } from 'react';
import './Home.css';
import Footer from './Footer';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <div className="title-background">
                <h2>HOME</h2>
            </div>
            <h3 className="missionStatement">Make the right choice in your kid's future!</h3>
            <form>
                <label htmlfor="firstName">Search:</label>
                <input id="firstName" type="text" />
            </form>
      </div> 
    );
  }
}
