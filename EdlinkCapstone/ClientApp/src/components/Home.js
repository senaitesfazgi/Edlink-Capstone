import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div className="backGround">
                <div className="title-background">
                    <h2 className="title">HOME</h2>
                </div>
                <form>
                    <input className="searchBarInput" placeholder="SEARCH:" id="firstName" type="text" />
                </form>
                <div>
                    <h4 className="missionStatement">Make the right choice in your kid's future!</h4>
                    <p className="welcome">Welcome</p>
                </div>
                <div>
                    <p className="tour">Take a Virtual Tour</p>
                    <Link className="viewSchools" to="/schools"><p>View Schools</p></Link>
                </div>
            </div>
        );
    }
}
