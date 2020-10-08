import React, { Component } from 'react';
import './Home.css';
import Footer from './Footer';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="backGround">
                <div className="title-background">
                    <h2 className="Title">HOME</h2>
                </div>
                <h4 className="missionStatement">Make the right choice in your kid's future!</h4>
                <form>
                    <label className="searchBarTitle" htmlfor="firstName">SEARCH</label>
                    <input className="searchBarInput" id="firstName" type="text" />
                </form>
            </div>
        );
    }
}
