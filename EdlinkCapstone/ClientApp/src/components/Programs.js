import React, { Component } from 'react';

export class Programs extends Component {
    static displayName = Programs.name;

    render() {
        return (
            <div>
                <h1>EdLink</h1>
                <form>
                    <label htmlfor="firstName">Search:</label>
                    <input id="firstName" type="text" />
                </form>
                <div>
                    <img className="logo" alt="EdLink" src={require('../Images/EdLinkLogo.png')} />
                    <img className="logo" alt="EdLink" src={require('../Images/EdLinkLogo.png')} />
                    <h3>School</h3>
                    <h3>School</h3>
                    <h3>School</h3>
                    <h3>School</h3>
                    <h3>School</h3>
                    <h3>School</h3>
                    <h3>School</h3>
                    <h3>School</h3>
                    <h3>School</h3>
                </div>
                <h2>Welcome</h2>
                <p>Take virtual tours</p>
            </div>
        );
    }
}

