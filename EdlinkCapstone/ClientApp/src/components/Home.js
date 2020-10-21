import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ""
        }
    }

    //Handle the event to set search value for user.
    handleChange = (e) => {
        this.setState({
            searchTerm: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault() // disable regular form submission
        this.props.history.push('/schools?search=' + this.state.searchTerm)
    }

    render() {
        return (
            <div className="backGround">
                <div className="title-background">
                    <h2 className="title">HOME</h2>
                </div>
                <div className="column1">
                    <p className="missionStatement">Make the right choice in your kid's future!</p>
                    <form onSubmit={this.handleSubmit}   >
                        <input className="searchBarInput" placeholder="SEARCH:" id="firstName" type="text"
                            value={this.state.searchTerm} onChange={e => this.handleChange(e)} />
                    </form>
                </div>
                <div className="welcomeBackground">
                    <p className="welcome">Welcome</p>
                    <p className="tour">Take a Virtual Tour</p>
                    <Link className="viewSchoolsButton" to="/schools"><p>View Schools</p></Link>
                </div>
            </div>
        );
    }
}
