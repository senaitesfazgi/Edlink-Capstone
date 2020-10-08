import React, { Component } from 'react';

export class Programs extends Component {
    static displayName = Programs.name;

    render() {
        return (
            <div>
                <div className="title-background">
                    <h2 className="Title">PROGRAMS</h2>
                </div>
                <form>
                    <label className="searchBarTitle" htmlfor="firstName">SEARCH:</label>
                    <input className="searchBarInput" id="firstName" type="text" />
                </form>
            </div>
        );
    }
}
