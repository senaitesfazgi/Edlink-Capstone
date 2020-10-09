import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Schools from './Schools';
import Footer from './Footer';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="backGround">
                <div className="title-background">
                    <h2 className="Title">HOME</h2>
                </div>
                <div className="welcomeBackground">
                    <p className="welcome">Welcome</p>
                    <p className="tour">Take a Virtual Tour</p>
                    <Link className="viewSchools" to="/schools"><h2>View Schools</h2></Link>
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
