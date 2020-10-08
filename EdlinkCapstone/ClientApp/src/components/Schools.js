import React, { Component } from 'react';
import { CreateStudent } from './CreateStudent';

export class Schools extends Component {
    static displayName = Schools.name;

    render() {
        return (
            <div>
                <div className="title-background">
                    <h2 className="Title">SCHOOLS</h2>
                </div>
                <form>
                    <label className="searchBarTitle" htmlfor="firstName">SEARCH:</label>
                    <input className="searchBarInput" id="firstName" type="text" />
                </form>
                <div>
                    <h3>School</h3>
                    <h3>School</h3>
                    <h3>School</h3>
                    <h3>School</h3>
                    <h3>School</h3>
                </div>
            </div>
        );
    }
}
